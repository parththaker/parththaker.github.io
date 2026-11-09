# Round 8, Opus

## A. Connector

Ranked choice: per-layer masks (adopt), then the arch riser, then a clipped deck tone, then the ring-to-ring length rule. I reject the cast shadow.

What the renders show. plank-arch and plank-wall are what the owner described: a box beam with parallel edges and mitred ends. mask-wall fixes this. The cited and read joins between Hyperspectral and Optimization flow into both mesas with filleted elbows, and the stack reads as a rock ridge: the round-4 saddle, kept honest. mask-arch does not. Bandits–Robotics reads as a bone, and the overview has three bones in it. The waist is not the cause. At 0.72 with a cos² profile the shaft looks almost uniform. The bone comes from the ends. Each summit is a knob about 2.5 times as wide as the shaft, the fillet between knob and shaft is short (roughly 6 px), and the shaft edges are smooth and parallel while every terrace around them wobbles.

So the waist is not too strong; a stronger one would only look pinched. Keep the waist at 0.75 to 0.80 of the semantic half-width and change three other things:

1. Long flare. Let the half-width grow from the waist value at mid-span to 1.0 of the semantic half-width at the clear span's ends, then to 1.35 of it inside the abutment fillet zone. That zone is the first and last 18% of the ring-to-ring span, or 12 px if that is longer. Use a smoothstep, not cos², so the taper starts early and the shaft never has a straight run longer than a third of the span.
2. Edge wobble. Apply the terrace warp to the join's half-width: a seeded sinusoid of ±10% (±15% at most, as in research rule 12), 1.5 to 2.5 cycles over the span, with a different phase on each side.
3. Fillet. After the union and blur, run one Chaikin pass on the contour polylines near the abutments so that no corner sharper than 120° survives. The blur should give a concave radius of at least 0.8 of the local join half-width.

Arch riser: yes, but only on summit-only joins and only over the clear span. The clear span is the stretch of the join with nothing of either mesa's layer k−1 beneath it. Over the clear span, the riser's bottom edge is a half-ellipse. It is 1.0 step deep at the two ends of the clear span and 0.2 step at the crown, with a floor of 3 px. At focused scale (step 12 px) that is 3 px against 12 px, clearly legible. In the overview (step about 6 px) 0.2 step is 1.2 px and vanishes into the stroke, so the 3 px floor matters more than the ratio. Below the arc draw nothing, so the lower benches or the to-read water show through. Do not draw a soffit band on spans under 40 px. Ignore the research's 1/6 to 1/8 span rule: on 150 to 400 px spans it gives a 25 to 60 px wall. The wall case has no opening, because the layer below is joined and the riser is a full step everywhere.

Deck tone: darken it, but not the way arch-dark does. In that render the 6% overlay is a rectangle, so a ghost plank shows inside the bone: straight edges at both summits and visible seams on the Bandits lower-left joins. Instead, clip the darkening to (join mask at k) minus (terraces at level ≥ k), feather it over 10 px at each abutment with an SVG mask blur of σ 4, and use 4% (a multiply of about #F5F5F5 on #DCCDB9, which gives about #D3C4B1). No bedding lines; at 3 to 8 px they become hatching.

Length: the mask union already gives the honest rule. The visible join runs from A's layer-k ring to B's, and everything inside a ring is the summit itself. The claim is "these fields meet at this layer", not "these centres are connected".

Cast shadow: no. The opening already says "above the ground"; a shadow on the benches is round 7's rejected dimming, narrower.

One defect in arch-overview: a detached ellipse near the Optimization label (about x 475, y 283). Drop any mask component under 40 px² after contouring.

One thing not to do: do not draw any part of a join (overlay, riser, stroke or shadow) from geometry other than the contoured mask. Every seam in arch-dark comes from a second, rectangular geometry sitting on the organic one.

## B. Stack panel

Layout. Use an inline right column. When a field is focused, the map animates to 60% width (about 600 of 1024 px), with a 24 px gutter and the panel taking the remaining ~400 px, at the same height as the map (520 px scaled). The panel scrolls inside a ScrollArea. Not a Sheet: it covers the map, and the terrace-to-section link is the point. Below 768 px the panel stacks under the map at full width, and the map keeps its height. Tapping a terrace opens the section but does not scroll the page. A one-line mono ribbon under the map, `BANDITS & LEARNING · PUBLISHED ↓`, is the scroll affordance.

Header. The field name in the page's heading face, "Bandits & learning", with a close control on the right whose aria-label is "Back to all fields" and whose glyph is ×.

Sections. Use Accordion type="single" collapsible. The order is published, written, read, cited, to read. Each trigger is a 32 px band filled with that layer's tone (#DCCDB9, #D0AC93, #C2947B, #AB7B6F), and the to-read band is #D7E6E0 with a 1 px dashed border to match the shelf. The layer word is lowercase on the left and the count on the right in tabular mono. Ink is #241c18 on every band (about 4.8:1 even on #AB7B6F). A band with a count of 0 is rendered disabled at 60% opacity and has no body, so no empty-state sentence is needed. The open section gets a 3 px inset left bar in the site red. Its terrace on the map gets the red treatment as an outline only: the Tanaka edge of that ring redrawn at 1.5 px in red, and the deck unchanged. Hovering a terrace draws the same outline at 40% opacity.

Content. Published rows show the title as a link, then a mono line `2022 · PAPER · NEURIPS`. Written rows show `2024 · POST` or `2023 · PROJECT`. Read, cited and to read show counts by default: the body is the mono line `41 ENTRIES`, plus one line per neighbour, `6 SHARED · ROBOTICS`. The alternative is a build-time flag per field, `listReading: true`. When it is set, the body adds a Collapsible whose trigger reads "Show 41 titles" and then "Hide titles", and the list shows `title`, `AUTHOR · 2019`, and a DOI or arXiv link. State the privacy consequence plainly: with the flag on, the reading list, including what is not yet read, is public and crawlable for good. With the flag off, the titles must not be in the bundle at all. A client-side "hidden" list counts as published. Items shared with another field carry an outline Badge with the other field's name, which links to that field's same layer.

Joins. Clicking a join opens the panel in join mode with the header "Bandits & learning / Robotics", showing only the shared layers, as the same bands with the shared counts. A counted layer's body is `3 SHARED`, and the titles appear only when both fields have the flag on. The map outlines the join deck in red.

Identity. Use hashes `#<field>`, `#<field>/<layer>` and `#<field>/<layer>/<item-slug>`, with joins as `#<a>--<b>/<layer>` and the slugs in alphabetical order. The field slugs are `bandits`, `robotics`, `optimization`, `hyperspectral`, `cloud`, `ai-systems`. The layer slugs are `published`, `written`, `read`, `cited`, `to-read`. Keep the table under the map, unnumbered, grouped by field, listing only published and written work. Hovering a row outlines its terrace, and clicking the field cell sets `#<field>/<layer>`.

Copy. The band labels are exactly `published`, `written`, `read`, `cited`, `to read`. The shared line is `6 SHARED · ROBOTICS`. The expand control is "Show 41 titles" / "Hide titles". There is no empty-state text.

One thing not to add: a Command search or filter box. With 22 public items and five bands, it would be a second way to navigate that nobody needs.
