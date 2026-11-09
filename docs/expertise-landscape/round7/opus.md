# Round 7, Opus: exact-layer sharing, spans, layout, repository

Numbers use the current builder (width 4 + 5.2·log2(1+n), ZS = 12 px). Layers are indexed as in code: 0 queue, 1 cited, 2 read, 3 written, 4 published.

## 1. The sharing rule

Exact-layer sharing is right. It matches the ledger: an entry has one layer, and terraces are cumulative only because "published implies read" describes the owner's own work, not what two fields have in common. The owner's sentence is nearly right. I would tighten it to: **"Each field keeps its whole stack. Two fields join at a layer only as far as they share entries at that layer."** "Only as far as" carries the width rule. Plain "merge" suggests a full fusion every time.

Where it can mislead, and the fix for each:

- **A field whose summit is entirely joint work.** Robotics has 2 published items, both shared with Bandits, so s4/c4 = 1. The span is full width (half-width 12.2, so 24.5 px wide) and runs about 141 px from summit ring to summit ring. That is honest: all of Robotics' summit is joint. The reader must also be told the papers are not counted twice (see 4). Hyperspectral is the same case: 1 of 1 published shared with Optimization.
- **Gaps in the stack.** Bandits–Robotics share (8, 2, 0, 2) at layers 1 to 4: a wall with a window at written. Correct; do not fill it.
- **Spans between non-neighbours.** A corridor crossing a third field's land reads as shared with it. Make this a hard layout constraint and a build assertion, never a rendering fix.
- **Three-field entries.** Pairwise spans would draw a triangle that encloses a lake and count the entry three times. Route each multi-field entry along the minimum spanning tree of its fields' centres, which gives 2 edges for 3 fields.
- **Per-field layer disagreement.** The span goes at the lower layer, where both hold the entry.
- **Arch versus wall.** An arch means no drawable shared ledger entries beneath, not "no shared history" (see 4).

```
for entry e in ledger:
    F = fields(e); if |F| < 2: continue
    k = min(layer(e, f) for f in F)                 # exact layer both hold it at
    for (A,B) in mst_edges(F, metric = centre distance after layout):
        s[A,B][k] += 1                              # multi-field entries: MST edges only
for pair (A,B), layer k with s[A,B][k] > 0:
    small = argmin_{F in A,B} n_F[k]                # exact counts, not cumulative
    share = min(1, s[A,B][k] / n_small[k])
    hw = r_small[k] * share                         # r is the cumulative ring radius at k
    if hw < HW_MIN: record_undrawn(A,B,k); continue # HW_MIN = 3 px
    spans.append(Span(A,B,k,hw))
```

Resulting spans with today's data: Opt–Bandits, cited hw 24.8 and read 19.1 (a saddle with the summits apart). Bandits–Robotics, cited 21.1, read 18.8, published 12.2 (full). Opt–Hyper, cited 20.1, read 15.3, published 9.2 (full; an arch with a window at written).

## 2. The span drawing recipe

**Shape.** A capsule from centre to centre. Do not try to clip it ring to ring. Clipping comes free from paint order: the span's top colour at layer k equals the layer-k terrace top, so the part inside A's or B's ring at k is invisible, and the higher terraces paint over the rest.

**Paint order (a correction to the proposal).** Do not render spans after the terrain: a read-layer span north of a summit must be hidden by it (the summit is lifted 60 px). Interleave spans in the per-level loop:

```
for k in 1..4:                                  # builder's z loop
    risers  = terrain_risers(k) ∪ span_risers(k)
    tops    = terrain_tops(k)   ∪ union(span_capsules(k))   # same-layer spans merged first
    draw(risers); draw(tops); draw(bedding/rim lines at k)
```

Lower objects never cover higher ones in this projection, so level order suffices; within a level, risers before tops.

**Tones by palette role.**
- Deck top: the layer-k top tone (t{k+1}), exactly. No stroke where it meets a terrace top, so the deck lands on the summit with no seam.
- Long edges: the same rim and tangent strokes as terraces. Lit if n·LIGHT > 0.25, shaded if < −0.25, using the builder's existing rule.
- Riser: only on south-facing edges (n_y > 0), in the layer-k riser tone, west or east variant as now.

**Thickness.**
- Same pair also spanned at k−1: full-step riser (12 px) with one bedding line, so stacks read as a wall.
- Otherwise a slab: 0.6-step riser (7 px), no bedding line. It says "carried, not founded".

**Underside.** Do not draw one. In plan-oblique with light from lower left the underside faces away from the viewer. The ground under and behind the deck shows unchanged through the opening between the slab's lower edge and the terrain. Do not dim it: that is a cast shadow by another name, and it hides the owner's own benches, his exact objection.

**Crossings.**
- Two spans at the same k: union the polygons, one fill, no seam.
- Spans at different k: level order handles it, and the lower span shows beneath.
- The layout should still penalise crossings (see 3), because a crossing looks like a four-way junction.

**Minimum width.** Draw a span only if hw ≥ 3 px (6 px wide, half a step). One shared cited entry out of 25 for Robotics gives hw = 65.95/25 = 2.6, so it is not drawn. The fields' index lists every shared entry that is not drawn ("1 shared cited entry with Bandits"). Do not set a floor that inflates a single entry into visible land.

**Queue layer (0).** Omit queue spans; shelves already overlap in the water.

## 3. Layout

Delete the shelf-radius repulsion. That is the whole cause of the Optimization–Bandits distance: AI's queue shelf (r0 = 118.6) holds everything off by its water.

**Use directional shore radii.** The current wobble factor (1 + 0.16 sin 3θ + 0.09 sin 5θ + 0.05 sin 7θ) runs from 0.70 to 1.30, so the actual shore reaches r/0.70 = 1.43 r in some directions. A rule written with scalar r_1 cannot guarantee no overlap. Use ρ_A(θ) = r_A,1 / wob_A(θ), evaluated toward the partner.

```
shore(A,θ) = r_A[1] / wob_A(θ)                  # land = cited ring (= read ring if no cited)
dmin(A,B)  = shore(A,θ_AB) + shore(B,θ_BA) + (10 if shares(A,B) else 36)
strength(A,B) = Σ_k λ_k · min(1, s_k / n_small,k),  λ = (0, 1, 1.5, 2, 3)
target(A,B) = dmin(A,B)                          # every sharing pair aims base-to-base
for restart in 1..8 (fixed seeds):
    init on circle in order of a max-strength spanning tree walk
    repeat 3000:
        for (A,B) sharing, sorted by strength desc:   # strongest relaxed first and last
            move toward target with stiffness 0.02 + 0.03·strength/max_strength
        project all pairs to d ≥ dmin                 # hard, after every sweep
        for each span (A,B,k), each third field C:
            push C off segment AB until clearance ≥ shore(C) + 6
    score = Σ strength·(d − target)² + 1e3·(crossings) + 1e4·(violations)
keep best; lock positions (written to the layout JSON, recomputed only on ledger change)
```

**Lowest layer or highest?** Use neither: use the land base, always. A distance computed from upper-layer radii is what pulled the summits together and swallowed Robotics' benches. With base-to-base targets, sharing pairs always sit 10 px apart at the shore, whatever layer they share at. Which layer they share at is then shown only by the spans, which is the point.

**Feasible:** around Bandits (r1 = 93.8), Optimization takes ≈ 53°, Robotics ≈ 46°, AI ≈ 50°: 149° of 360°.

**Keeping Optimization and Bandits adjacent.** Their strength is low (0.86) because nothing above read is shared, but 15 entries are. Two guarantees:
1. Repulsion from shelves is gone.
2. The acceptance test requires every sharing pair's achieved shore gap ≤ 10 + 6 px.

If a ledger change makes that infeasible, the build fails loudly rather than quietly moving a pair apart.

## 4. Method-page sentence and honesty caveats

Replace "the map cannot show a connection at the top without a foundation" with:

> "Each field is drawn with its whole stack. Where two fields share entries at a layer, a span joins them at that layer and nowhere else, as wide as the shared fraction of the smaller field's entries there. A joint paper with no shared reading is therefore an arch: connected at the summit, open beneath. A shared item is counted once in each field it belongs to; the span marks it as one item, not two."

Cases where the rule could still claim something false, with mitigations:

1. **Hidden thin sharing.** An arch can hide sharing under the 3 px threshold; the index lists undrawn shares and the method page states the threshold.
2. **Double counting.** Robotics' summit and Bandits' summit both include the same 2 papers. Without the last sentence above, the map overstates output.
3. **Untagged history.** If a joint paper grew from reading not tagged in both fields, fix the ledger, not the geometry.
4. **Span length means nothing.** With every sharing pair at the 10 px gap, length reflects only the two fields' radii; say so in one clause.

## 5. Repository recommendation

**Do the cheaper version now. Defer a separate repository until a second site consumes the builder.**

A separate repo for one consumer costs packaging, versioning, CI and a release-and-bump loop per tweak: roughly 4 to 5 days plus permanent friction. Isolated, verifiable rules come from the boundary and the tests, not from the repo.

**Boundary (in `portfolio/landscape/`):**

```
landscape/
  pyproject.toml            # uv project; numpy only; entry point `landscape build in.json out.json`
  landscape/schema.py       # dataclasses + JSON Schema for input and output
  landscape/rules.py        # pure: widths, radii, shares, spans, strength (no numpy grid)
  landscape/layout.py       # pure given seed
  landscape/terrain.py      # heightfield, contours, ring paths
  landscape/render.py       # paths, z-ordered, spans interleaved
  tests/fixtures/toy3.json  # + expected outputs
  tests/...
```

- **Input:** `fields[{id, title, years}]`, `layers[{id, name}]` (ordered), `materials` (tones, ZS, step, HW_MIN, gaps, λ), `entries[{id, kind, year, title, public, fields[], layer | layer_by_field{}}]`.
- **Output:** `{positions, radii, spans[{a, b, k, hw, drawn}], undrawn_shares[], paths[{cls, d, k}], markers[], labels[], camera}`.
- The React component reads only the output JSON and holds no rules. The hard-coded `n` tuples and `shared` dict become derived from entries.

**Effort:** 1.5 to 2 days (schema and extraction 0.5, spans and layout 0.5, tests and fixtures 1).

**Tests (pytest, red first):**
1. `widths`/`radii` on known counts, for example n = (0, 40, 8, 3, 4) gives r = (82.8, 82.8, 51.0, 30.5, 16.1) to ±0.1.
2. A toy ledger of 3 fields: A and B share 1 published entry only; B and C share 3 of 10 cited entries in C. Expected: one span at k = 4 with hw = r_small,4; one span at k = 1 with hw = 0.3·r_C,1; no other spans.
3. Exact-layer: a shared cited entry produces no span at k = 2..4.
4. A three-field entry produces 2 MST spans, not 3.
5. An entry with different layers per field produces a span at the minimum layer.
6. Minimum width: 1 of 25 gives an undrawn share, listed in `undrawn_shares`.
7. Layout: no grid cell is land in two fields; every sharing pair has a shore gap in [10, 16]; every non-sharing pair has a gap ≥ 36.
8. No span corridor intersects a third field's land.
9. Paint order: every span path's index lies after all paths of level < k and before the tops of level k+1.
10. Determinism: same input and seed, byte-identical output.
11. Golden snapshot of the real ledger's spans and positions, updated only deliberately; schema validation of the output.

## 6. One thing the owner should not do

Do not tune spans or positions by eye after seeing the picture: no thickening a frail-looking arch, no floor for single shared entries, no hand-nudged coordinates. Once the picture can change outside the ledger and rules, the method page stops being true and the golden tests record taste, not rules.
