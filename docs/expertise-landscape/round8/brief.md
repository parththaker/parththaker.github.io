# Council round 8: the connector form, and a stack panel instead of marks on the map

You are one voice in a design council for a personal research site. Answer in plain prose, specific and falsifiable, no bullet-point filler, no praise. Give geometry as rules with numbers. Where you disagree with the brief, say so and why. About 900–1400 words.

## The page

`/expertise` on parththaker.github.io is a "map of work": one terraced mesa per field (Bandits & learning, Robotics, Optimization, Hyperspectral unmixing, Cloud infra, AI systems), drawn as plan-oblique relief in SVG (plan view, vertical shear 12 units per layer, light from the lower left, Tanaka lit/shade edge strokes, west risers lit and east risers in shade). Palette "Strata" uses Grand Canyon tones: cited #AB7B6F, read #C2947B, written #D0AC93, published #DCCDB9; the to-read shelf is a pale underwater bench #D7E6E0 on the page background. Contours are built by marching squares over a blurred heightfield (cell 2 px on a 900×520 canvas), so terrace outlines are organic and slightly wobbly (a seeded sinusoidal warp of radius, up to ±30%).

Rules fixed by earlier councils and by the owner (do not reopen): each field's five terraces (to-read shelf, cited, read, written, published; bench width 4 + 5.2·log2(1+count)) are built from that field's own counts and are never altered by sharing. Two fields join at a layer only as far as they share entries at that layer: the join at layer k has half-width 0.5 × (smaller field's layer-k radius) × (shared fraction of the smaller field's entries at k), minimum 3 px else it is listed as text. The lower layers of two fields that share only a paper stay separate: a joint paper with no shared reading is an arch, connected at the summit and open beneath. Sharing at several layers stacks. Layout puts sharing pairs shore to shore (10 units between cited terraces), others 36 apart; no join passes over a third field.

## Problem A: the connector looks like a plank

Today each join is a straight rectangular slab from A's layer-k ring to B's layer-k ring: deck in the layer's top tone, a riser 0.35 of a step tall on the viewer-facing long edge (a full step when the layer below is also joined), thin edge strokes along the long sides, no underside, nothing dimmed beneath. The owner's verdict on the result: "it looks like a plank connecting the two rather than something elegant… rough at the connectors." He preferred the look of the previous iteration (round 4), where joins were capsules added into the same heightfield as the mesas, so marching squares produced smooth saddles whose contours flowed into both mesas with filleted junctions. That look was rejected only because it filled everything beneath the shared layer (a summit-only share became a solid ridge from the sea up), which destroyed the individuality of the lower layers.

So the task is: keep the exact-layer semantics, recover the organic look. Options on the table, add your own:

1. Per-layer masks. For each layer k build a mask M_k = (terraces at level ≥ k) ∪ (joins at exactly level k), blur it like the heightfield, and contour it. The join then has the same wobble and rounded, filleted abutments as the terraces, and can be given a slight waist (narrower in the middle, like a natural arch or an isthmus). When every layer of a pair is shared the stack of joins becomes a continuous terraced ridge, which is exactly the round-4 saddle; when only the summit is shared it is a smooth slab at summit height.
2. Arch riser. On the viewer-facing side of a summit-only join, the riser's bottom edge is an arc (elliptical or catenary), thick at the abutments and thin in the middle, so the near side literally shows an opening: a natural bridge seen from the front in plan-oblique.
3. Cast shadow. A soft offset shadow on the benches under the join, Imhof/Patterson style, to say "this is above the ground". Round 7 rejected dimming the benches beneath; is a narrow cast shadow different enough, or the same mistake?
4. Deck tone. The join deck is the same tone as the summit, so a long summit join is the brightest shape on the map. Should the deck be one step darker, or textured (bedding lines), so the mesa summit stays the brightest thing?
5. Length. A summit-to-summit join is long because summits sit at the mesa centres. Earlier attempts to lean terraces toward the neighbour gained little. Any rule that shortens the visible join honestly (for example a join that enters the mesa at the ring and stops at the bench's inner edge rather than running to the summit centre) is welcome; say what it would claim.

Give: your ranked choice, the exact geometry (waist ratio, fillet behaviour, arc depth as a fraction of the step, riser heights, strokes, tones), how the wall case (all layers shared) should look versus the arch case (summit only), and one thing not to do.

## Problem B: no marks on the map; a stack panel beside it

Today each paper, post and project is a small flat glyph with a two-digit numeral on its bench (shared ones sit on the join). The owner has decided: no indicators on the diagram itself. Instead, every level of a mesa is clickable, and after a field is focused a panel on the right shows "the entire stack of whatever is there": the papers published, the posts and projects written, and the read and cited layers with some way to expand them. The map today is a two-state camera (click a field to focus, click again to return), 900×520 SVG, page width 1024 px max, mobile below 768 px. Components available: shadcn (Sheet, Tabs, Accordion, Collapsible, Table, ScrollArea, Badge, HoverCard, Command).

Decide and specify:

1. Layout. Inline right column that the map yields to when a field is focused (map narrows to about 60% width) versus a Sheet overlay versus a panel below the map. Mobile behaviour.
2. The stack as UI. Five sections in terrace order, top first: published, written, read, cited, to-read. Each section header is a terrace band in that layer's tone with the count. Clicking a terrace on the map opens that section; clicking a section highlights the terrace. Say how the terrace highlight should look (deck lighter, Tanaka edge in the site's red, outline only) and how the selected section is marked.
3. Content per layer. Published and written list titles with venue/year and a link (these pages exist). Read, cited and to-read: the owner first chose counts only (private reading list), and now asks for "links to potentially expand all the read and cited links (or any alternative)". Propose the default and the alternative, with the privacy consequence stated plainly. Items shared with another field carry that field's name.
4. Joins. Clicking a join (the connector between two mesas) should show what is shared there: "3 read entries shared with Robotics", then the titles if listed. Specify.
5. Identity without numerals. The index table under the map currently numbers items 01–22 to match the marks. With no marks, what links the table rows, the panel entries and the map? Propose the deep-link scheme (`#bandits/published`?) and whether the table stays.
6. Copy. House rules from round 5: write about the work, not the page; one name per thing (the layer words are fixed: to read, cited, read, written, published); mono lines are ledger rows (`2022 · PAPER · NEURIPS`) with no verbs; nothing that sounds generated. Give the exact strings for section headers, empty states ("nothing read yet in this field"?), the shared-with line, and the expand control.
7. One thing not to add.

Keep both answers in one document with the two headings "A. Connector" and "B. Stack panel".
