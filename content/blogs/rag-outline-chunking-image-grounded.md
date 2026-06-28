---
title: >-
  RAG That Renders the Diagram: Outline-Aware Chunking and Image-Grounded
  Answers
date: '2026-06-27'
description: >-
  How I built a hallucination-resistant RAG over a large technical-document
  corpus: chunk along the author's heading outline, embed with that outline as
  context, and treat images as first-class chunks with a deterministic verifier.
tags:
  - Engineering
  - RAG
  - Retrieval
  - LLM
  - Search
  - Document AI
readTime: 11
---

*A generalized writeup of a production system I built in 2024 — the patterns, not the proprietary details.*

The corpus was roughly a thousand structured technical documents: equipment manuals, work instructions, and corrective-action records. All PDFs, all with the same anatomy — H1/H2/H3 headings, numbered subsections, tables of part numbers, and a lot of mechanical diagrams. The people querying it weren't asking trivia. They asked things like "how do I transfer the heat sink on the X-200 assembly?" or "what are the safety alerts for the clutch verification step?" — and the honest answer to most of those questions was a *figure*, not a paragraph. The diagram with the callouts was the answer.

That is the constraint that shaped everything. A correct sentence that says "see Figure 4" is a failed answer if the reader can't see Figure 4.

## Why naive RAG failed here

The default 2024 recipe — split the PDF into fixed character windows, embed each window, retrieve top-K, hand the text to an LLM — broke in three specific ways on this corpus.

It cut subsections in half. A window would begin mid-procedure: *"This step must be performed before…"* with the antecedent stranded in the previous window. The embedding of that fragment is close to nothing useful, because half its meaning lives one chunk away.

It threw images away entirely. The converter either dropped them or, at best, the LLM got the surrounding prose and produced a confident description of a diagram nobody could see.

And it cited at the wrong granularity. "Source: doc-A.pdf" tells you nothing when doc-A is 200 pages and the answer is on one of them, in one figure.

So the system had to do three things the naive pipeline couldn't: chunk along the document's own structure, carry images through to the rendered answer, and attribute every claim down to the page. Here is the shape of what I built.

```
┌──────────────────────────────────────────────────────────────┐
│                          INGESTION                            │
│                                                               │
│  PDF ──► pdf_to_markdown(write_images=True)                   │
│            │                                                  │
│            ▼   markdown text + extracted PNGs on disk         │
│  parse_markdown(filename, md)                                 │
│            │                                                  │
│            ▼   nested JSON tree: { H1: { H2: {content,        │
│            │                               images, ...} } }   │
│  enumerate_paths(tree) → ["H1>H2>H3", ...]                    │
│            │                                                  │
│            ▼   per path → ContextualChunk:                    │
│            │     • content (own section)                      │
│            │     • parent_content (siblings under parent)     │
│            │     • embedding_content (templated w/ outline)   │
│            │     • image paths from the JSON node             │
│            │     • dense embedding (MPNet, 768d)              │
│            ▼                                                  │
│  Vector DB collection (contextual partition)                 │
├──────────────────────────────────────────────────────────────┤
│                            QUERY                              │
│                                                               │
│  query ──► dense embed + hybrid (dense+sparse) ──► search     │
│            (per-user partition filter)                        │
│            │                                                  │
│            ▼   retrieved chunks (+ image paths + parent ctx)  │
│  build JSON-mode prompt {sentences[], sources[],             │
│                          page_nums[][], chunk_ids[]}          │
│            │                                                  │
│            ▼   LLM — keep ![](...) tags only where relevant   │
│  verify_image_tags(answer, context) — reject hallucinations  │
│            │                                                  │
│            ▼   render markdown — images inline, sources       │
│                collapse into clickable references             │
└──────────────────────────────────────────────────────────────┘
```

## The key idea: embed the paragraph with its address

The move that did the most work is also the simplest to state. **Chunk along the author's heading outline, and embed each chunk prefixed with where it lives in that outline.**

Ingestion converts each PDF to Markdown, then parses the Markdown into a nested JSON tree that mirrors the heading hierarchy. Every leaf in that tree is a chunk. A document with 50 subsections produces ~50 chunks aligned to the author's outline rather than to an arbitrary character count. Walking the tree yields paths like `Part II > General information > 4.1 Special notices and safety alert symbol`, and each path becomes one chunk.

The chunk that gets embedded is never an orphan paragraph. It's templated with its address:

```
Topic:   General information
Subject: 4.1 Special notices and safety alert symbol

Content:
The safety alert symbol is used to indicate that...
```

The embedding model attends to the `Topic`/`Subject` prefix as semantic context. The same paragraph appearing under "General information" versus "Troubleshooting" now produces *different* embeddings, because the prefix is part of the text. Retrieval starts responding to "what section is this in?" and not only "what words does it contain?"

Separately, I store `parent_content` — the sibling sections under the same parent — and feed it to the LLM alongside the matched chunk. Even when the chunk that matched is tiny, the model sees the neighborhood it came from.

I later saw Anthropic formalize the same idea as **Contextual Retrieval**, where an LLM call per chunk generates a one-paragraph context summary and retrieval improves 35–49%. That validated the bet. The version here is the cheaper sibling: it uses the document's own outline as the context instead of a generated summary, which makes it deterministic, free at ingestion time, and arguably more faithful — the author's chosen heading is exactly the disambiguator they intended.

## The parser, and the bug that mattered

PDF parsing in 2024 was a minefield. The converter I settled on preserved heading levels and table structure better than the alternatives, and — the part that mattered most — it could write extracted images to disk *and* emit `![](...)` tags inline in the Markdown pointing at them. That single capability is what made images survivable downstream.

The tree builder is a regex walker over the Markdown lines, maintaining a stack of `(node, level)`. Two decisions are worth calling out, and one of them was a real bug.

Many source PDFs used `**Subsection**` rather than `#### Subsection` below H3. So I treat a bold-followed-by-newline as a heading one level below the last `#`. A small normalization pass inserts that newline after mid-line bold runs, which makes heading detection deterministic. It's a hack, and I'd remove it now (more on that later), but it made the tree match how a human would outline the document.

The bug: the original code reset the node every time a heading was re-encountered.

```python
# WRONG — wipes earlier content when a heading repeats
parent[section_title] = {"content": [], "images": [], "tables": []}

# RIGHT — merge, don't overwrite
if section_title in parent:
    current = parent[section_title]
else:
    current = {"content": [], "images": [], "tables": []}
    parent[section_title] = current
```

Section numbering frequently appears twice in these documents — once in a table of contents, once at the real section. The overwrite path silently erased the first occurrence's accumulated content. "Merge, don't overwrite" is a one-line change that's invisible until you diff retrieval quality against the source and notice whole sections had gone missing.

When a content line carries an image tag, I store the path in *two* places: inline in the content (so it survives into the LLM context with its surrounding text) and in the node's `images` array (so it's queryable as structured metadata). That dual storage is what makes the round-trip back into the answer work.

## Images as first-class chunks

RAG bots in 2024 said "see Figure 3." This one rendered Figure 3, inline, in the right place in the answer. The whole trick is refusing to drop the image at every stage of the pipeline.

Trace one diagram through. The converter writes `doc-A.pdf-12-1.png` and inserts `![](.../doc-A.pdf-12-1.png)` at the position the image appeared. The parser keeps the tag inline and records the path. A normalization step strips the directory prefix so the embedded text carries only the basename — short enough not to eat the token budget, and resolvable by the frontend against a static image server. The chunk's embedding text literally contains `"...verify the assembly orientation ![](doc-A.pdf-12-1.png) before tightening..."`. The filename is an opaque token that barely moves the embedding; the surrounding text does the work, which is exactly right.

At query time the vector DB returns the chunk's `content` (tag already in position) and its `images` array. The prompt builder lays each chunk into context with the inline tags intact, and the model is told to keep `![](...)` tags **only when** the answer actually uses the meaning of the chunk that contains them.

Then the part that makes it safe to ship.

### The deterministic verifier

Left to itself, every few queries the model would invent a filename — a plausible `![](clutch_diagram.png)` that never existed — and the UI would render a broken-image icon. One broken image erodes trust faster than three good answers build it. So nothing the model says about images is taken on faith:

```python
def verify_image_tags(answer: str, context: str) -> bool:
    in_answer  = extract_image_tags(answer)
    in_context = extract_image_tags(context)
    return all(tag in in_context for tag in in_answer)
```

Every image filename in the answer must exist in the context we sent. If it doesn't, the check fails and generation retries (up to five times). A later revision moved to structured output to enforce the response shape, but this check stayed downstream of it regardless. It's a cheap, deterministic gate at the boundary, and it pushed image hallucinations to effectively zero in production. There is no LLM-side cleverness that makes me want to remove a hard check like this.

### Filenames that attribute themselves

The image naming pattern `<doc>.pdf-<page>-<idx>.png` turned out to be a hidden affordance. Every image carries its source document and page *in its own filename*, so attribution falls out of post-processing without the model having to cite anything explicitly:

```python
pattern = re.compile(r"([^/]*\.pdf)-(\d+)-\d+\.png$")
for image in images_in_answer:
    m = pattern.search(image)
    if m:
        file_page_dict[m.group(1)].add(int(m.group(2)))
```

That's why the source line read `doc-A.pdf — pages 7, 12` instead of "sources considered: doc-A, doc-B." The page numbers are grounded in the visual citations the model actually made, not in the top-K retrieval list.

## Tables get their own pipeline

Tables are a different retrieval problem, so they got a different path: one chunk per row, formatted as `Column : Value` lines, embedded with a model that emits both dense and sparse vectors, in a separate collection searched with hybrid retrieval and RRF fusion. The reason is modality. "Find the row where the part number is 549-XX" is a keyword query — sparse retrieval crushes dense embeddings on it. "Find tables describing heat-sink specifications" is semantic. Hybrid plus reciprocal-rank fusion serves both, with a cross-encoder re-rank on the top-20 candidates (too expensive corpus-wide, fine on a short list).

## Retrieval, ranking, and the operational details

Three layers ran before results reached the LLM: dense ANN for the first cut; a re-ranking pass that pulls 10× the requested K, extracts named entities from the query, and boosts chunks containing them; and for tables the hybrid + cross-encoder path above. The entity boost rescued queries like "tell me about the X-200 actuator," where the entity *is* the intent — dense search alone kept returning semantically adjacent chunks that never mentioned the X-200.

Three operational details made ingestion practical at corpus scale. Idempotency: an MD5 checksum per file means re-ingesting a directory skips what's unchanged. Batched inserts: chunks accumulate before a single insert call, which mattered a lot when bootstrapping a thousand documents — bulk inserts dominate per-row calls by a wide margin. And access control as data, not migrations: each document lands in a named partition, and a CSV maps each user to the partitions they may see. The vector DB filters at search time to only authorized partitions; the CSV is mtime-checked and hot-reloaded. Permission changes ship without touching the schema.

## Per-sentence citations as parallel arrays

The output format is the other pattern I'd keep verbatim. The model returns parallel arrays rather than prose with inline `[1]` markers:

```json
{
  "markdown_sentence": ["First sentence", "Second with ![](img.png)"],
  "source":            ["doc-A.pdf",      "doc-A.pdf"],
  "page_num":          [[7],              [7]],
  "chunk_id":          [2,                2]
}
```

Index *i* across all four arrays describes the same claim. Each sentence is independently attributable to a document, a page list, and the retrieval chunk it came from — so the UI can tag provenance per sentence and flag any sentence that maps to no chunk. Two things make this work in practice. Models maintain index alignment across parallel arrays more reliably than they interleave inline citation tags. And a short self-check appended to the conversation — verify the lists are length-matched, verify each index lines up, verify image tags fit their surrounding text — measurably cut mismatched-length outputs with the models of the day.

## Honest limitations

The system worked, but a fair amount of it was 2024 scaffolding I'd tear out today.

The regex Markdown parser is the weakest part. The bold-as-heading hack and the merge-don't-overwrite fix both exist because it's pattern-matching, not parsing. A proper Markdown AST walker is roughly thirty lines and handles the edge cases the regex can't — I'd switch to one without hesitation.

Splitting text and table collections was a workaround for the embedding models available when I started. A single hybrid collection handles both now and would cut a meaningful slice of the code.

Richer image-region features — highlighting the exact bounding box on the source page that answered the question — existed in an earlier version and were deprecated in favor of simpler whole-image extraction. That regression is real; the simpler path shipped, the smarter one didn't.

## What I'd change with current eyes

A vision LLM would replace the text-only image step. Today, for any chunk that scores above a retrieval threshold, I'd send the page image directly to the model so it *sees* the figure rather than inferring from caption text. The text pipeline stays for fast retrieval; the model gets eyes for the final hop. That also reopens the deprecated region-highlighting feature: a vision model could annotate the precise part of the diagram that answered the question.

I'd also explore late-chunking and late-interaction retrieval over the templated `Topic`/`Subject` embedding for ambiguous queries. The hierarchy would still earn its place — but as a filtering signal rather than the only retrieval signal.

Two things I would not touch. The deterministic image-tag verifier stays: cheap, boundary-level, and there's no version of model quality that makes a hard correctness check a liability. And the per-sentence parallel-array citation format stays — it has aged well, and more than one RAG framework has since converged on the same shape independently.

If I had to carry exactly two ideas out of this build, they'd be those that survived contact with production: chunk along the author's outline and embed with that outline as context, and treat images as first-class chunks you round-trip all the way into the rendered answer — then refuse, deterministically, to show one the model made up. Everything else was substitutable. Those two I'd build the same way again.
