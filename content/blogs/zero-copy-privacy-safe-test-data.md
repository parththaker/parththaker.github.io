---
title: >-
  The Branch Is the Variant: Zero-Copy, Privacy-Safe Test Data on a Versioned
  Lake
date: '2026-06-15'
description: >-
  How a versioned data lake made the branch itself the test-data variant —
  zero-copy generation, blobstore-native metadata, and in-database hooks as the
  output channel.
tags:
  - Engineering
  - Data Infrastructure
  - lakeFS
  - System Design
  - Kubernetes
  - Privacy
readTime: 12
---

*A generalized writeup of a production system I built — the patterns, not the proprietary details.*

A fleet of devices in the field each produces a "session": a folder of files containing manifests, control records, metadata JSON, and a stack of large binary recording chunks. A typical session runs about 20 GB, and roughly 17 GB of that is binary recording data. Those recordings are deterministic — they're byte-identical across every test variant of a session. Everything else — a few hundred megabytes of metadata — is what carries the sensitive identifiers a test pipeline needs scrubbed.

QA needed privacy-safe variants of these sessions at volume. The existing flow was a manual ritual: download a session from object storage to a local runner, hand-edit identifiers in JSON files to produce a "test variant," re-upload the modified session, run the test. They did this for a hundred-odd sessions, several times a day, on runners with a fixed local disk budget.

Three things were structurally broken.

- **The runners couldn't hold the data.** A hundred-plus sessions at ~20 GB each blew past local disk constantly.
- **Egress was bleeding.** Each day's runs re-downloaded terabytes — almost all of it binary recording bytes the test would never touch.
- **Scrubbing was manual and unprovable.** A human opened JSON in an editor and replaced identifiers by hand. No audit trail, no validation, no way to prove a generated dataset was actually clean.

## Why the obvious approach fails

The obvious fix is "make the copy pipeline faster" — parallelize the download, compress in transit, cache hot sessions. But every version of that still moves the 86% of bytes that are identical between the source and its variant. You can make copying cheaper; you can't make it free, and copying is the whole cost.

So the real question is not "how do we copy faster" but "why are we copying at all?" If the overwhelming majority of every variant is bit-for-bit the same as its source, the right move is to *not copy those bytes* — to point at the originals and materialize only the difference. That requires a substrate where a "version" of a dataset is a pointer, not a duplicate. A versioned data lake — lakeFS, in this case, backed by GCS object storage with a zero-copy staging primitive and an in-process hook engine — is exactly that substrate.

## High-level architecture

The control plane is always on and cheap; the data plane scales from zero. KEDA bridges them by scaling workers off queue depth.

<figure class="diagram">
  <img class="diagram-light" src="/diagrams/zero-copy-architecture-light.svg" alt="Zero-copy test-data flow: a variant is a branch, validated then merged; on merge an in-lake hook fans out per-file messages to a consumer that server-side-copies to the destination bucket." />
  <img class="diagram-dark" src="/diagrams/zero-copy-architecture-dark.svg" alt="Zero-copy test-data flow: a variant is a branch, validated then merged; on merge an in-lake hook fans out per-file messages to a consumer that server-side-copies to the destination bucket." />
  <figcaption>A variant is a zero-copy branch; on merge, an in-lake hook fans out per-file messages and the consumer server-side-copies bytes to the destination.</figcaption>
</figure>

Two logical stores do the work: a **catalog repo** (every uploaded session, imported zero-copy when it's tagged) and a short-lived **run repo** per test run (deleted when the run finishes). Only two human actions exist in the whole flow: a session lands in the bucket and the tagger picks it up automatically; a user clicks "Generate" and everything from run-repo creation through delivery happens with no further input.

## Pattern 1: the branch is the variant

A test variant is a branch, not a copy, not an export, not a "rendered" session. There is no materialization step. Generation is: create a branch, walk the source files, replace identifiers in the ~2% of files that contain them, rename the files whose names embed identifiers, commit.

The primitive that makes this work is zero-copy staging. The orchestrator registers a metadata pointer that references the physical object already managed by the catalog repo — no bytes move:

```python
client.stage_object(
    repository=run_repo,
    branch=source_branch,
    path=dst_path,
    mode="zero-copy",
    physical_address=src_physical_address,
)
```

A multi-gigabyte session stages into the run repo in seconds.

One structural bug here is worth dwelling on. An early orchestrator branched every variant from `main`. Runs that combined two sessions started leaking identifiers across them — a variant of session A would occasionally pick up a token that originated in session B's metadata. The fix wasn't a code patch; it was a topology change: give each source session its own branch so a variant only ever sees one session's universe. The symptom only appeared under concurrency, which is the tell of a structural problem rather than a logic one. (I'd hit the same shape of bug before — a merge that should have been scoped was overwriting shared state — and the lesson is the same: isolate the namespace, don't try to out-clever the leak.)

What this earns, on a representative ~6.65 GB / ~4,800-file session:

| Per variant | Value |
|---|---|
| Files actually modified | ~890 (~2 MB) |
| Files zero-copy renamed | ~3,970 (~6.65 GB) — new logical path, zero bytes touched |
| New storage | ~2 MB (~0.03%) |
| A 300-variant run | ~651 MB total, vs. ~2 TB for full copies |

The load-bearing row is "files zero-copy renamed": nearly four thousand files per variant get a new logical path and never touch object storage. That's roughly two orders of magnitude less storage per run, measured rather than estimated.

## Pattern 2: blobstore-native metadata as a queryable sidecar

Sessions needed a few dozen queryable properties for faceted search in the UI. The default 2026 answer is "stand up a Postgres table." I didn't.

For each uploaded session, the tagger writes a single 0-byte marker object and attaches the tags to it as **native object metadata** (GCS Object Contexts — S3 has analogues). The faceted-search API reads markers directly from the bucket:

```python
# 0-byte marker, idempotent
blob.upload_from_string(b"", content_type="application/octet-stream")

# attach tags as the object's native metadata
patch_body = {"contexts": {"custom": tags_payload}}
requests.patch(metadata_api_url, headers=auth, json=patch_body)
```

Tags are extracted from a handful of source files in the session (control records, device manifests, session-info JSON, end-of-session markers) plus a directory listing, then a derived-tags pass adds the values the UI actually filters on — duration buckets, chunk-count buckets, an estimated size, a simulated-vs-real flag, and a scrubbed flag set once catalog ingestion has run.

Why blobstore metadata instead of a table:

- **Colocated with the data.** Tag and object live in the same namespace. A session that moves or gets copied keeps its tags. There is no "table out of sync with the bucket" failure mode, because there is no table.
- **Server-side queryable.** The object-storage API filters on this metadata; you don't fetch every row and filter in Python.
- **No schema migrations.** Adding a tag is editing the extractor and re-running the tagger over the corpus. No `ALTER TABLE`, no rollback plan. We added six tags over the system's life and not one needed an API deploy.
- **Permissions piggyback on bucket IAM.** Whoever can see the session can see its tags.

The cost is real: no JOINs, no transactional multi-object updates, and aggregations are slower than a Postgres index. We bought back the read latency with a background cache (below). The endpoint joins two sources of truth in memory — object metadata answers *what we have*, the lake answers *what's imported*. If I ever needed cross-session aggregates, I'd add a read-only Postgres mirror populated from the tagger, not move the tags off the blobstore.

## Pattern 3: cheap rewrite, deterministic adversarial validator

The replacement itself is deliberately dumb — four sequential string replacements over the four identifiers (a session UUID, a site name, a job GUID, a device name), no regex, no JSON-aware traversal:

```python
def replace_all(self, content: str) -> str:
    out = content.replace(self.old_session_id, self.new_session_id)
    out = out.replace(self.old_site,       self.new_site)
    out = out.replace(self.old_job_guid,   self.new_job_guid)
    out = out.replace(self.old_device,     self.new_device)
    return out
```

What makes a dumb rewriter safe is a deterministic verifier behind it. Before any variant is allowed to merge, a scanner walks every object on the branch and fails the merge if any original identifier survives — in a path or in metadata-file content:

```python
for obj in all_objects:
    if any(ident in obj.path for ident in originals):
        violations.append((obj.path, "path", ident))

metadata_files = [o for o in all_objects if o.path.endswith(METADATA_EXTS)]
with ThreadPoolExecutor(max_workers=scan_workers) as pool:
    for f in as_completed(pool.submit(_check_content, o, originals)
                          for o in metadata_files):
        violations.extend(f.result())
```

Both passes are linear; binary recording chunks are skipped because they're identifier-free by construction. The generator is allowed to be dumb precisely because the gate is not — the same shape as pairing a hallucination-prone generator with a deterministic check at the boundary. A real leak (we tested by deliberately breaking the replacement) shows up as a violation tuple naming the file, the field, and the offending identifier.

**The merge-serialization gotcha.** With the gen and validate tiers both scaled out, validate-workers were calling `merge` concurrently against the same run repo, and the merges hit object-storage **429 rate-limit** errors from concurrent SSTable writes in the lake's metadata layer. The fix wasn't more retries; it was a Redis lock that serializes merges per repo, with exponential backoff for transient conflicts:

```python
def _acquire_merge_lock(redis, repo_id):
    deadline = time.time() + LOCK_ACQUIRE_TIMEOUT
    key = f"merge-lock-{repo_id}"
    while time.time() < deadline:
        if redis.set(key, worker_id, nx=True, ex=MERGE_LOCK_TTL_SECS):
            return True
        time.sleep(LOCK_POLL_INTERVAL)
    return False
```

The lock holds for the merge itself — typically under a few seconds — with a TTL as the safety net for a worker that dies mid-merge. After this, a multi-worker run reports zero retries at the merge step; before, the same workload surfaced a 429 within the first handful of merges. The honest caveat: serializing per repo caps merge throughput at one at a time. It's fine because per-merge wall-clock is small and the workload is bursty and gen-bound. At an order of magnitude more variants it would need lake-side merge batching or repo sharding instead.

## Pattern 4: database-internal hooks as the output channel

When a variant passes validation and merges to `main`, the thing that announces it isn't a worker, a watcher, or a polling export service — it's a script running *inside* the lake, fired on merge, that lists every object on the commit and publishes one message per file:

```lua
-- enumerate every object on this commit (paginated)
repeat
  local page = lakefs.list_objects(repo, ref, prefix, marker, page_size)
  for _, obj in ipairs(page.results) do
    batch[#batch+1] = build_payload({
      logical_path  = obj.path,             -- where it should land
      physical_addr = obj.physical_address, -- where the bytes live now
      commit_id = ref, run_id = run_id,
    })
    if #batch >= 100 then flush(batch); batch = {} end
  end
  marker = page.next_marker
until marker == nil
flush(batch)
```

The consumer reads the physical address and does a **server-side copy** from the lake's blockstore straight to the destination bucket:

```python
gcs.copy(src=physical_address, dst=f"gs://{logical_bucket}/{object_path}")
```

Server-side copy charges storage, not egress — so a multi-gigabyte variant lands in the destination bucket for the cost of metadata I/O. No bytes traverse the network; no worker pod ever has to hold them.

Why doing this inside the database earns its keep:

- **Atomicity.** The hook runs after the merge, in the same transaction. A variant cannot be "merged but unannounced" or "announced but unmerged" — either the hook runs and the commit sticks, or it fails and the merge rolls back. That's a stronger guarantee than any commit-polling architecture I've built.
- **One message per file.** An earlier version published a single "variant ready" message with a manifest URL; the consumer then re-listed the variant to find files. That was racy under multi-session runs and gave no per-file backpressure. Per-file messages push fan-out into well-understood queue machinery and let the consumer parallelize naturally.
- **The consumer depends on the queue and the bucket, nothing else.** The physical address is already in the message, so the CI side can run even if the lake is down.

The cost: the Lua sandbox is restricted — no arbitrary network libraries, no schema validation, hand-rolled JSON and base64 marshalling, and debugging means reading pod logs because there's no REPL against a live repo. The trade was acceptable: a couple hundred lines of Lua replaced a Go service with its own deployment, identity, and retry semantics. The one warning for anyone replicating it: post-merge hooks fire per-merge, not per-commit. Publishing *all* files (rather than the commit delta) was deliberate — the downstream CI is stateless about prior runs, so each variant should arrive as a self-contained event.

## Pattern 5: workers that cost nothing at rest

Every worker is a single-shot Job triggered by Redis-stream lag, with KEDA deciding how many pods should exist:

```yaml
triggers:
  - type: redis-streams
    metadata:
      stream: testgen-queue
      consumerGroup: gen
      lagCount: "5"
```

Pods come up, claim entries with `XREADGROUP`, process, `XACK`, and exit. Because they're Jobs rather than long-lived consumers, a crash is recoverable — an un-ACKed entry rolls back to the stream and the next pod picks it up. `minReplicas=0` is the whole point: idle cost is zero, the price is a cold start before the first variant, which for batch test-data generation is fine.

Two scars from making this real. First, the platform's queue scaler needed an IAM grant that was blocked, so a tiny always-on relay pod subscribes to the upstream topic and `XADD`s into Redis — an extra hop and an extra place to lose a message, but it shipped and reused the stream-trigger config the other workers already had. Second, the Redis instance was shared with another team's job runner using the default DB and `allkeys-lru` eviction; our streams got evicted under memory pressure and poison messages from old runs re-entered our consumer groups after restarts. The fix was a one-line move to an isolated, unused Redis DB index — found only by attaching an ephemeral pod and watching `MONITOR`, because a managed Redis isn't a pod you can port-forward into.

## Pattern 6: a background cache that unblocks the UI

The catalog page lists every session with tags and import status. The first version did it synchronously — list object-metadata markers, list lake prefixes, join in memory — at roughly 45 seconds per page load. Unusable. A small module prewarms both sides on an interval; the endpoint reads from an in-memory snapshot and returns in about 0.65 seconds, exposing the snapshot age so the UI can show a staleness badge. The point isn't only the speedup: it unblocked a whole class of UI work (filter-driven refetches, a polling audit dashboard) that simply can't run against a multi-second backend. The refresh schedule lives in the cache module, not the endpoint — which is what makes per-request latency deterministic instead of paying the slow work on every call.

## What I'd change

- **Drop the relay.** With the right IAM, the platform's native queue scaler replaces it. It's one pod that shouldn't have to exist.
- **Merge serialization is a stopgap.** A single per-repo lock caps throughput at one merge at a time. Past a few hundred variants, I'd batch merges lake-side or shard runs across repos.
- **The four-string replace is too dumb.** If one identifier is a substring of another, the sequential `.replace()` chain corrupts the wrong thing. The validator catches it, but it surfaces as "generation always fails for this input" rather than a clean error. A single-pass regex with word boundaries, or JSON-aware traversal, fixes it — the validator stays regardless.
- **The hook would be better as WASM.** Lua is right for the deployment story (no extra service) and wrong for the developer story (no REPL, hand-rolled JSON). A WASM module from Go or Rust would keep the shape and unlock the tooling, if the lake ever supports it.
- **Make the cache survive restarts.** Today a pod restart cold-starts the cache and the first request eats the full latency. A Redis-backed cache trades one sub-millisecond hop for restart resilience.
- **Repo-per-run leaks.** Deleting a run repo leaves orphaned blobstore artifacts. Fine at the scale we tested; a slow leak at production scale. Either a cleanup job that scrubs the namespace after deletion, or one repo with branches-per-run instead of repos-per-run.

## What holds up

Two ideas I'd build the same way tomorrow.

**The branch is the variant.** When most of your bytes don't change between derivatives of a dataset, don't copy them. Use a versioned store whose branch primitive is zero-copy, let the branch *be* the deliverable, and delete the rendering pipeline that materializes what you already have a pointer to. The savings compound at every layer — storage, egress, time-to-first-test, audit footprint.

**Put metadata where the data is.** If your metadata describes objects in a bucket, a separate store creates a permanent synchronization problem and a second permissions axis. Native object metadata is queryable enough for faceted search and colocated with what it describes. Reach for a relational store when you have relational data — not when you have annotations on a corpus.

Everything else — the specific lake, KEDA, the Redis lock, the cache, even the four-identifier rewrite — was the right call for the constraints I had and is cheerfully substitutable. Those two patterns are the part I'd defend.
