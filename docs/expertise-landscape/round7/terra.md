I would replace round 4 with exact-layer sharing, but I would avoid the word “merge.” It suggests that one field’s terrain is being absorbed by another. The rule should be: shared material creates a connection at its recorded layer; each field’s own cumulative terrain remains intact.

That solves the owner’s main complaint. Robotics remains a complete Robotics mesa even if both of its published papers are also Bandits papers. The top can be jointly occupied without making Robotics’ cited and read benches disappear.

## 1. Sharing rule

Treat the per-field terrain and inter-field connections as two distinct computations.

```text
INPUT:
  entries:
    id
    fields[]                  # one or more fields
    exact_layer[field]        # the ledger stratum for that field
                              # queue, cited, read, writing, published

  layers ordered low_to_high:
    queue, cited, read, writing, published

FOR EACH field F:
  FOR EACH layer K:
    own_exact[F, K] =
      count(entries E where exact_layer[E, F] == K)

    own_cumulative[F, K] =
      sum(own_exact[F, J] for every J >= K)

    radius[F, K] =
      radius_from_log(own_cumulative[F, K])

  draw the full cumulative terrain stack for F
  # This never depends on sharing.

FOR EACH entry E:
  group entries by:
    (exact layer K, exact set of participating fields G)

FOR EACH group (K, G):
  IF size(G) == 2:
    let G = {A, B}
    shared_exact[A, B, K] = count(group)

    half_width =
      radius_of_smaller_field_at(A, B, K)
      * min(
          1,
          shared_exact[A, B, K]
          / min(own_exact[A, K], own_exact[B, K])
        )

    create one layer-K pair span between A and B

  IF size(G) >= 3:
    create one layer-K multi-field junction:
      one central shared node plus arms to each field in G
    # Do not duplicate one three-field entry into every pairwise span.

DO NOT:
  create a span at lower layers merely because an item appears at K
  reduce, clip, or merge either field’s own cumulative terrain
```

I would make one important modeling requirement explicit: “exact layer” must mean a field-specific, primary ledger classification, not an inferred lifecycle state. A published paper can still count cumulatively toward that field’s “read” bench, but its shared connection belongs only to `published` unless there is separately recorded shared reading material.

That distinction is precisely what allows a high arch. It says, “these fields share a published output,” not “their entire reading history is shared.”

The misleading sentence is therefore: “merge at a layer only when entries are shared at that layer.” Use this instead:

> A shared entry connects the participating fields at the ledger layer where it is recorded; it does not transfer, erase, or imply shared material at any other layer.

A 100-percent shared layer may visually read as fused, but it is still better understood as a complete common surface at that elevation, resting on separate terrain unless lower exact-layer connections exist.

For a three-field item, pairwise capsules are dishonest because they represent one common item three times. It should become a small three-way junction or triangular shared deck with three arms. That makes “this work belongs to all three” legible without claiming three separate bilateral relationships.

## 2. Span drawing recipe

Use ring-to-ring spans, not centre-to-centre shapes clipped afterward. Ring-to-ring makes the connector start at the actual terrace boundary, preserves each mesa’s interior, and avoids a long polygon being painted over the tops of both mesas.

```text
For a pair span at layer K:
  1. Find the facing boundary point on each layer-K terrace ring.
  2. Route a capsule between those boundary points.
  3. Give it a deck thickness of 0.35–0.45 terrace steps,
     not a full step.
  4. Draw terrain first, then the span deck, then visible faces.
```

I would not use a full one-step vertical wall. It makes a single shared publication look like a large geological buttress and visually competes with the mesas. A thinner slab reads as a bridge: still structural, still unmistakably elevated, but not falsely a continuous landform.

Use the layer’s existing top-stratum palette role for the deck, very slightly desaturated or lighter than the corresponding field terrace. Use a darker version of that same role for the visible riser and underside. No texture is needed; the perimeter edge and one bedding line are enough.

The underside should be shown only where it is actually visible in the plan-oblique projection. It should be a restrained dark face, not a cast shadow. Keep lower terrain unchanged beneath it: no dimming, no fog, no special “bridge shadow.” Dimming makes the span appear to overwrite or damage the terrain below, which is contrary to the conceptual rule.

At a landing:

- If the shared fraction is below 100 percent, keep a one-pixel contact seam. It says “bridge meets this terrace” rather than “this field has been absorbed.”
- If the layer is fully shared and the two deck materials match, omit the seam across the shared contact; let it read as a common surface at that layer.
- Never remove the lower terrace outlines simply because a higher span arrives.

A direct span may pass over its endpoint field’s lower benches; that is desirable for an arch. It should not pass over an unrelated third field’s land. The layout/routing system should prevent that. If necessary, give a span one gentle bend through open water rather than drawing a bridge across another field and inviting a false inference.

At the same elevation, spans should never cross. Re-layout or route one around the other. At different elevations, an overpass is acceptable only if the projected crossing is unavoidable and the elevation difference is visibly legible through the deck edge and underside. In practice, I would treat same-level crossings as a failed layout constraint, not an artistic opportunity.

Do not silently discard tiny relationships. Use display thresholds:

- projected width ≥ 3 px: full slab/capsule;
- 1–3 px: hairline connector with round caps;
- < 1 px: omit from the overview but expose it in hover, detail view, and the method legend.

That is better than a semantic cutoff such as “one shared item out of forty does not count.” It still counts; it just cannot safely occupy physical screen area at that zoom.

## 3. Layout rule

Use the cited terrace as the non-overlapping “land shore,” not the reading shelf. The shelf is water-adjacent context; it must not determine the continent-scale layout.

```text
land_radius[F] = radius[F, cited]

hard_min_distance[A, B] =
  land_radius[A] + land_radius[B] +
  (10 if A and B share any exact-layer group else 36)

affinity[A, B] =
  weighted_sum_over_layers(
    normalized_exact_shared_count[A, B, K] * layer_weight[K]
  )

where:
  cited and read receive the strongest weights;
  writing receives a medium weight;
  published alone receives a lower weight;
  queue receives zero layout weight.

Layout optimization:
  enforce every hard_min_distance
  strongly attract high-affinity pairs toward their hard minimum
  weakly attract low-affinity shared pairs
  maintain label, routing, and third-party-span clearance
  use a deterministic seed and stable tie breakers
```

The two gap values should remain 10 and 36. They are good categorical constraints: sharing fields can approach; unrelated fields retain water and visual breathing room. The affinity value should control how hard each shared pair is pulled toward the 10-unit floor, rather than changing the floor itself.

Optimization and Bandits should therefore be high-affinity neighbors because their cited and read intersections are large. Their lack of a joint publication should not push them apart. Conversely, a pair sharing only a publication may satisfy the same 10-unit minimum but receive weak attraction, leaving a longer, clearly arch-like connection.

Do not use the highest shared layer to set distance. That is what caused the summit to dictate the whole map. Nor should the reading shelf radius participate in collision or repulsion. The cited land shore is the geometry constraint; the lowest meaningful shared land layer—especially cited, then read—should dominate affinity.

## 4. Method-page replacement

Replace the old sentence with:

> The map draws shared material only at the ledger layer where that material is recorded: a low connection represents shared sources or reading, while a high bridge represents shared writing or publication without claiming a shared foundation below.

The crucial caveat:

> Absence of a connection is absence of a recorded shared entry in this ledger, not proof of intellectual independence, lack of collaboration, or lack of common influence.

Exact-layer rendering is honest if the ledger’s layer tags are accurate and field-specific. It becomes misleading if a single item is tagged “published” simply because it was published, while the presentation implies that no shared reading ever existed. The map can truthfully describe its data model; it cannot make historical claims the data does not establish.

## 5. Repository recommendation

Do not move this into a separate generic repository now. For a one-person site, that adds versioning, publishing, package compatibility, issue tracking, and cross-repository coordination before there is a second consumer.

Do the cheaper version now: a self-contained `map-terrain` module inside the site repository, with a clean pure-data boundary between the Python compiler and the React renderer. Estimate: 2–4 focused days, depending on the current coupling.

Its contract should be:

```text
Input:
  fields
  ordered layers
  materials/palette roles
  entries:
    id, participating fields, field-specific exact layers, metadata
  layout options and deterministic seed

Output scene graph:
  terrain terrace paths and faces
  span and multi-field-junction paths/faces
  field centres and marker positions
  label anchor positions
  computed radii, counts, distances, warnings
```

React should render the scene graph; it should not decide sharing, radius, or placement semantics. The Python builder should be deterministic and serializable, so the method is inspectable without a browser.

Tests worth adding now:

- golden three-field fixture with known exact counts, cumulative radii, pair spans, and a three-field junction;
- joint-publication-only fixture proving a top bridge produces no lower spans;
- shared-cited/read fixture proving high affinity pulls two fields together without using shelf radii;
- Robotics-style fixture proving its full personal stack survives shared summit work;
- zero-count and single-field entries;
- exact-layer versus cumulative-count invariants;
- cited-shore non-overlap and the 10/36 gap rules;
- no same-level span crossings or third-party-land overflight;
- deterministic-layout snapshot with tolerance;
- SVG/scene-graph visual snapshots for bridges, walls, and thin-link fallbacks.

A standalone reusable repository becomes worthwhile only when a second site, a public package requirement, or a different renderer genuinely needs it. That would likely be another 4–7 days beyond the internal refactor.

## 6. One thing not to do

Do not let a shared published paper change another field’s footprint, radius, or lower terraces. A connection should add a visible claim between intact fields, never solve overlap by consuming one field’s individuality.

Confidence: high. I would revise this if the ledger cannot reliably assign field-specific exact layers, or if the visual goal is explicitly to depict conceptual influence rather than recorded shared artifacts; either fact would require a different, probabilistic connection model.
