# Fable, round 7 (written after building two prototypes, before reading the others)

## 1. Sharing rule
Keep each field's stack cumulative and untouched by sharing. Sharing becomes exact-layer: an entry connects the fields it is tagged with at the layer where it sits, and nowhere else.

```
for field F, layer k:
    own_exact[F,k], own_cum[F,k] -> radius[F,k] = bench rule on own_cum     # unchanged, never altered by sharing
for entry e with |fields(e)| >= 2 at layer k:
    pair (A,B): shared[A,B,k] += 1          # 3+ fields: one junction, not pairwise copies
for pair (A,B), layer k with shared > 0:
    small = field with fewer own_exact at k
    half_width = radius[small,k] * min(1, shared[A,B,k] / own_exact[small,k])
    span(A,B,k): slab from A's layer-k edge to B's layer-k edge, height k, thickness 0.35 step
```
Prototype result (scratch builder `proto7/build7.py`): Robotics, Hyperspectral and Catan keep their whole skirts; the Bandits–Robotics publication becomes a thin slab from summit to summit over both fields' own benches; the Optimization–Hyperspectral cited sharing becomes a short low saddle between the cited shores with the summits apart and a thin high span above it. That is the picture the owner described: connected where connected, separate where separate.

Where it misleads: a field whose every publication is joint (Robotics today) gets a span as wide as its summit, which reads as "Robotics' top is Bandits'". That is true of the publications and false of nothing, but the caption must still say "2 published, both with Bandits" so no one reads it as absorption. A span passing over a field's own lower benches is honest occlusion, not merging.

## 2. Drawing
Slab from ring edge to ring edge, overshooting 3 units into each terrace so there is no crack; top in the layer's top tone; a riser of 0.35 of a step on the viewer-facing edge in the layer's riser tones; lower spans drawn before higher; shelf-level sharing (queue) drawn under the land as a shoal, no riser. Nothing beneath a span is dimmed. Same-level spans must not cross; a span must not pass over a third field; both are layout constraints. Minimum visible full width 3 px, with the true fraction in the tooltip.

A second prototype (`build7b.py`) let each terrace lean toward the neighbour it shares with, hoping to shorten the summit spans. It shortens them by about fifteen units out of ninety, because the lean is bounded by bench widths. Not worth its complexity; dropped.

## 3. Layout
Collision on the cited terrace (land shore), never the shelf: distance >= r_A,cited + r_B,cited + 10 if the pair shares anything, + 36 if not. Attraction from an affinity that weights cited and read sharing above written and published, so that Optimization and Bandits sit shore to shore while a lone joint paper does not drag fields together. The prototype's plain stress solver left Catan overlapping Bandits' skirt; the production solver needs a hard projection step after each pass.

## 4. Method page
"A shared entry connects two fields at the layer where it is recorded, and only there. Each field's terraces show its own full record. A high span over separate benches means shared publication without shared reading; stacked spans mean sharing recorded at several layers. No connection means no shared entry in the ledger, not independence."

## 5. Repository
Not a separate repo now. Do the cheap version: a self-contained `landscape/` folder in the site repo holding the pure builder, the materials and rules files, a `tests/` directory with a toy three-field ledger and its expected radii, spans and distances, and a thin React renderer that only paints the scene JSON. One to two days. A separate package costs a week and pays back only when a second site uses it; the folder boundary gives the verifiability the owner wants today and makes extraction later a move, not a rewrite.

## 6. Do not
Do not let sharing change any field's own radii or footprint. The individuality the owner asked for is exactly that invariant, and every future rule must be checked against it.
