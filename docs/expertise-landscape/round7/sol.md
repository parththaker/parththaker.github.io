## Recommendation

Use exact-layer sharing, with one important wording change: connections belong to an entry’s **assigned ledger layer**, not every terrace on which cumulative counting makes that entry appear.

Field stacks remain cumulative and complete. Connections are non-cumulative annotations of shared provenance. This preserves Robotics’ independent lower terraces while allowing its all-joint publication summit to fuse with Bandits’ summit.

### 1. Sharing rule

“Merge only when entries are shared at that layer” is slightly misleading. A publication is also counted on lower cumulative terraces, so in that sense it is present there. The precise rule is:

> A shared entry creates connective land only at its assigned ledger layer; cumulative counting within each field does not propagate that connection to lower layers.

Each entry therefore needs one canonical `connection_layer`, even if it contributes cumulatively to several field terraces.

```text
for each field F:
    for each layer k:
        exact_count[F,k] =
            number of entries tagged F whose connection_layer is k

        cumulative_count[F,k] =
            number of entries tagged F included by layer k's
            cumulative inclusion rule

        radius[F,k] =
            radius_scale(log1p(cumulative_count[F,k]))

# Sharing never changes field counts or field polygons.
# In particular, do not subtract shared entries from either field.

for each entry e:
    participants = unique(fields tagged on e)
    k = e.connection_layer

    if size(participants) < 2:
        continue

    if size(participants) == 2:
        A, B = participants
        pair_shared[A,B,k] += 1
        record e under connection_identity[A,B,k]

    else:
        # Preserve that this is one multi-field entry, rather than
        # depicting it as several independent pairwise entries.
        hyper_shared[participants,k] += 1
        record e under hyperedge_identity[participants,k]

for each pair connection (A,B,k):
    s = pair_shared[A,B,k]
    denominator = min(exact_count[A,k], exact_count[B,k])

    semantic_half_width =
        min(radius[A,k], radius[B,k]) * min(1, s / denominator)

    emit pair span with:
        layer = k
        semantic_half_width
        entry_ids
        exact numerator and denominators

for each hyperedge (fields S, layer k):
    choose a junction in free space near the geometric median of S

    for each field F in S:
        arm_fraction = hyper_shared[S,k] / exact_count[F,k]
        arm_half_width = radius[F,k] * min(1, arm_fraction)
        emit one arm from F to the common junction

# Layout strength may count a multi-field entry toward every participating
# pair, but the drawing retains one entry identity and one common junction.
```

If Robotics’ only publications are joint Bandits papers, a full-width summit connection is truthful: all Robotics publication output is joint. It must not erase Robotics’ label, outer summit silhouette, or lower terraces. It says nothing about ownership of Robotics-specific reading, cited work, or writing.

Three-field entries should use a single three-way junction or connected platform. Three ordinary pairwise bridges would be logically defensible—every pair does share the item—but visually resembles three separate shared items.

An arch convention is also legible: an isolated high bridge means “shared output without shared foundations.” A wall means repeated sharing across several independently assigned layers. State this in the legend; otherwise some readers will interpret bridge height as chronology or organizational authority.

### 2. Span drawing recipe

Use a centre-to-centre axis for stability, then clip it against the actual silhouettes of the two layer polygons. This is effectively ring-to-ring geometry but behaves better when terraces are not circular.

The free span should be a constant-width strip with rounded outer corners, not a centre-to-centre capsule laid across both mesas. Extend its top face one or two screen pixels inside each terrace so antialiasing cannot create a crack.

I would not make the bridge one full vertical step thick. A full-step riser visually occupies the layer below and partially restores the cumulative wall the new rule is meant to remove. Use a slab about `0.25–0.35` of one terrace step thick.

Drawing order and tones:

1. Draw every complete field stack unchanged.
2. Draw lower spans before higher spans.
3. Draw the slab underside where projection exposes it, using the palette’s darkest muted stratum role.
4. Draw vertical slab faces:
   - face oriented toward the lower-left light: middle side tone;
   - face oriented away from it: dark side tone.
5. Draw the top in the same top-surface palette role as layer `k`.
6. Draw only exposed perimeter strokes. At a landing, use the same top colour, overlap slightly, and omit the transverse seam.
7. Redraw labels and markers last.

Do not dim the lower benches or water underneath. Dimming acts like a cast shadow and makes the substrate look altered. The bridge should obscure only the pixels its slab actually covers; everywhere else the original terrain remains unchanged.

Choose the departure direction that minimizes projected overlap with the field’s own lower benches. Some overlap is inevitable in oblique projection and is honest occlusion, not geometric merging.

Different-height crossings are ordinary overpasses: the higher span and its side face cover the lower one. Two unrelated spans at the same layer must not cross, because two pieces of land at the same elevation would appear to join. Route one through a free-water corridor, adjust the layout, or omit the weaker connection from the overview and reveal it on interaction. Only spans belonging to the same multi-field entry may meet at a same-height junction.

A span must never pass over a third mesa: that looks like an unrecorded landing. Strong connections should be made neighbours during layout; residual non-neighbour connections should be gently routed through water rather than drawn straight through intervening land.

Do not silently discard a small share such as one of forty. Keep the semantic width in the scene data, but apply a minimum visible full width of four CSS pixels at the canonical viewBox scale. Mark `width_floored = true`, and expose “1 of 40” in the tooltip or accessible description. The method page must disclose this visibility floor. Zero shared entries produce no span.

### 3. Layout

Use the cited terrace as the non-overlapping land shore. Ignore the submerged reading-queue shelf in collision forces.

```text
shore_radius[F] = radius[F, cited_layer]

for each pair A,B:
    if shares_any_exact_entry(A,B):
        required_gap[A,B] = 10
    else:
        required_gap[A,B] = 36

    minimum_distance[A,B] =
        shore_radius[A] + shore_radius[B] + required_gap[A,B]
```

The values `10` and `36` are reasonable if the present coordinate scale is retained: ten leaves a visible channel between related fields, while thirty-six makes unrelated fields clearly separate. Also check label clearance independently; a valid terrain layout can still have colliding names.

Do not choose layout proximity from the highest shared layer. That gives a single publication disproportionate power and recreates the Bandits–Robotics failure. Nor should the lowest layer alone determine everything. Use all exact shared counts for attraction, with the lowest shared layer as the adjacency priority and tie-breaker because broad, low connections need short spans most.

A practical relaxation is:

```text
for each related pair A,B:
    sharing_strength[A,B] =
        sum over layers k of:
            layer_weight[k]
            * log1p(shared_count[A,B,k])
            * shared_count[A,B,k]
              / union_exact_count[A,B,k]

# Give cited and read layers modestly greater layout weight than
# writing/publication, so one summit item cannot dominate a broad corpus link.

normalize positive sharing_strength to W in [0,1]

desired_gap[A,B] =
    10 + 26 * (1 - W[A,B])^2

desired_distance[A,B] =
    shore_radius[A] + shore_radius[B] + desired_gap[A,B]

1. Build a maximum-weight planar adjacency backbone from sharing_strength,
   preferring the lower shared layer when strengths are close.
2. Initialize connected fields along that backbone.
3. Minimize weighted stress on related pairs, strongest edges first.
4. After each pass, project all pairs back outside minimum_distance.
5. Keep backbone edge corridors free of third-field shores.
6. Resolve label collisions without using shelf radii.
7. Commit the resulting coordinates; do not rerun layout automatically
   on every ledger edit.
```

Optimization and Bandits should become a protected backbone edge because their cited/read overlap is strong. Removing all shelf radii from collision and stress calculations fixes the specific AI shelf problem. If that edge still loses adjacency, protect its corridor as one of the highest-weight corpus-sharing edges; do not add an unexplained hand-tuned coordinate exception.

### 4. Method-page language and honesty

Replace the old sentence with:

> Connections are not inherited downward: a shared entry builds a bridge only at its assigned ledger layer, while each field’s terraces continue to show its full cumulative record.

A useful follow-up is:

> A high bridge may therefore stand above independent lower terraces; stacked bridges indicate sharing recorded separately at several layers.

The rule can mislead if “assigned layer” is not defined, if an entry is assigned inconsistently, or if the four-pixel visibility floor is undisclosed. It can also make full-width attachment look mutually complete when it may mean only that every item in the smaller field is shared. Tooltips should report the actual numerator and both denominators.

### 5. Repository recommendation

Do the cheaper extraction now: a self-contained folder inside the site repository, with a pure builder, fixtures, tests, and a thin React renderer. Estimate **2–4 working days**. A separate versioned repository/package is more likely **6–10 days**, including packaging, releases, integration, documentation, and cross-repository debugging. For one site, that administrative boundary adds more cost than assurance.

The internal boundary should already look like a future package:

```text
input:
  fields
  ordered layer definitions and cumulative inclusion rules
  material/palette roles
  entries {id, fields, connection_layer, metadata}
  layout options and optional locked positions

pure output scene:
  terrain paths and elevations
  spans/hyperedges with semantic and visible widths
  marker positions
  labels
  locked centres
  diagnostics and provenance
```

React should only paint that scene and handle interaction. It should not calculate counts, sharing, radii, or placement.

Tests should cover:

- cumulative field radii from known exact counts;
- a publication producing no lower-layer span;
- non-shared entries changing field shape but not connection geometry;
- 100% sharing fusing the smaller terrace only at that layer;
- one-of-forty semantic width plus visible-width-floor metadata;
- one three-field entry producing one hyperedge identity;
- cited-shore non-overlap with 10/36 gaps;
- reading shelves having no collision force;
- strong cited/read sharing outranking a lone joint publication;
- the Optimization–Bandits analogue remaining adjacent;
- no span crossing a third mesa;
- deterministic output from the same ledger and locked positions;
- a three-field golden fixture with exact expected radii, spans, distances, markers, and labels;
- one structural scene snapshot and one rendered SVG/image regression.

Move it to a separate repository only when a second site consumes it or it needs an independent release cadence.

### 6. One thing not to do

Do not let a single joint publication force two fields to become layout neighbours. That would preserve the new arch visually while reintroducing the exact loss of field individuality that prompted this redesign.

Confidence: **high (0.88)**. I would reconsider the slab thickness if the projection cannot display a sub-step vertical face cleanly, and reconsider the layout weights if the real ledger shows publication counts comparable to, rather than much smaller than, cited/read counts.
