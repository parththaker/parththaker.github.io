## A. Connector

My first choice is a hybrid of per-layer masks and the arch riser. Per-layer masks recover the round-4 contour language; the arch supplies the missing evidence that an isolated upper-layer connection is suspended. Cast shadows rank third and should remain subordinate. I would not darken or texture the deck, and I would shorten it only by changing where it meets the terrace—not by moving the mesas or falsifying their radii.

For a join at layer \(k\), connect the nearest mutually visible points on the two layer-\(k\) contours, subject to the existing no-crossing rule. The connector should penetrate each terrace by `max(6 px, 1.25 × join half-width)` and stop there. It must not continue toward either mesa centre. This claims that the two fields share material at that layer, not that their conceptual centres coincide.

At each abutment, retain the prescribed half-width from the sharing formula. Narrow the join smoothly to 0.78 of that width at its midpoint, using a symmetric smoothstep over the outer 35% of each half. Cap the underlying mask with semicircles and union it with the terrace mask before blurring. Use the same seeded warp field as the mesas, not a separately seeded wobble. Blur with a 3 px Gaussian radius and extract the 0.5 contour. The union and blur should create the fillet; do not draw Bézier corner patches afterward. The resulting fillet should extend approximately one join half-width into both the connector and terrace.

The deck keeps the exact tone of its layer. Making a published join one full palette step darker would falsely read as written; bedding lines on the deck would introduce a second encoding that the mesas do not use. If the long light shape still dominates, apply at most a 4% neutral-lightness reduction at the waist, fading to zero at the abutments. Do not add a repeating texture.

An unsupported join—one for which the same pair is not joined at the immediately lower layer—gets an arch on its viewer-facing side. Its visible thickness is 0.78 of a 12-unit step at each abutment and 0.18 of a step at the midpoint. The bottom edge rises through a half-ellipse over the central 70% of the clear span, giving an arc depth of 0.60 step; the outer 15% at each end forms the shoulders. This is deliberately shallow enough to remain legible in plan-oblique view rather than becoming a bridge illustration. An isolated summit share therefore reads as a smooth, slightly waisted stone bridge with open space beneath it.

Where consecutive layers are joined, their masks stack. The lowest unsupported layer carries the arch opening; layers immediately above it have full 12-unit risers between their decks. When every layer is shared, there is no arch opening: the result is the round-4 terraced saddle, with continuous contours and one full-step wall between successive tones. That is the wall case. It should look grown from the same terrain, not assembled from slabs.

Use 1.1 px exterior Tanaka strokes and 0.7 px internal terrace strokes. Relative to the deck colour, west-facing risers are 8% lighter and east-facing or viewer-facing risers 14% darker. The arch silhouette gets a 1.25 px shaded stroke; no separate black underside is drawn.

A cast shadow is acceptable because it describes elevation rather than suppressing content, but it must be narrow: offset 4 px away from the lower-left light, Gaussian blur 3 px, maximum opacity 0.11, and clipped to a 10 px band around the connector. It must not wash across an entire bench. If the bridge remains readable without it, omit it.

The one thing not to do is draw independent ornamental fillets or rounded end caps over the existing rectangle. That preserves the plank’s underlying geometry and merely decorates the joints.

## B. Stack panel

Use an inline right column on wide screens, not a Sheet. At widths of 900 px and above, focused mode is a grid with `minmax(0, 3fr) minmax(352px, 2fr)` and a 24 px gap. At the 1024 px maximum, this yields roughly 600 px of map and 400 px of panel. The focused camera can enlarge the selected mesa within the narrower map viewport. The panel has a maximum visible height of 520 px and its own vertical scroll.

Below 900 px, place the panel below the map at full width. Below 768 px, tapping a terrace should also scroll its section header into view, unless reduced motion is enabled. A Sheet would obscure the map precisely when the user needs to compare panel and terrain; it is the wrong default for this two-way interaction.

The panel is one stack, not Tabs. Its sections appear in vertical terrace order: published, written, read, cited, to read. Each header is a full-width band in the exact terrace tone and includes its count: `published · 4`, `written · 7`, `read · 18`, `cited · 6`, `to read · 12`. Published and written start expanded. The other sections start as totals unless their bibliographies are made public.

Clicking a terrace selects and opens its section. Clicking a section selects the terrace. Preserve the deck fill and Tanaka lighting; draw a 2 px inset outline in the site’s red around the selected terrace contour. Do not recolour the Tanaka edges, because that would destroy the lighting cue. Mark the corresponding panel header with a 3 px red inset rule on its left and `aria-current="true"`.

Published and written entries show the title as the primary link, followed by an unbadged mono ledger row such as `2022 · PAPER · NEURIPS`, `2024 · POST`, or `2025 · PROJECT`. A shared item adds a plain line beneath it: `shared with Robotics`.

The default for read, cited, and to read should remain counts only. The safer alternative is to publish an explicitly opted-in bibliography for read and cited, listing title, author or venue, year, and an outbound DOI or publisher link. In that version the control reads `show 18 entries`, changing to `hide 18 entries`; use `entry` for a count of one. To read should remain count-only unless separately opted in. Collapsing titles in the browser is not privacy: if the titles are shipped in HTML or JSON, they are public, indexable reading history.

Clicking a join opens the shared layer in the same panel. With one endpoint already focused, the heading reads `3 read entries shared with Robotics`. Without a focused endpoint, use `3 read entries shared by Bandits & learning and Robotics`. List titles only under the same publication rule as their layer. A stacked join may show several shared-layer bands, but the clicked visible deck is selected first.

Replace numerical identity with semantic deep links. Use `#bandits-learning/published` for a layer, `#bandits-learning/published/item-slug` for an item, and `#shared/bandits-learning/robotics/read` for a join. An item link focuses the field, outlines the correct terrace, opens the section, and scrolls the panel entry into view. The map remains layer-level; it should not pretend to identify an individual item after its marks are removed.

Keep the index table because it remains the only compact, cross-field ledger. Remove its numeral column. Its rows and panel entries should share the same stable item slug and canonical title link; activating a row updates the fragment and panel state.

Use these empty strings exactly: `Nothing published in this field.`, `Nothing written in this field.`, `Nothing read in this field.`, `Nothing cited in this field.`, and `Nothing to read in this field.`

Do not add search, filters, or a second set of tabs to the panel. Five terrace bands already provide the complete navigation model.

Confidence: high. I would change the connector recommendation if the final projection makes a 0.18-step arch centre illegible at actual display size, and I would replace the desktop inline panel if the focused map cannot keep field labels readable in a 600 px viewport.
