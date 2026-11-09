# Round 8 research: arches, bridges and saddles between mesas

Evidence warning. Web search returned little on the exact questions. The Jenny and Patterson paper PDF was not machine-readable here, and no source found documents how Imhof, Patterson or Monument Valley draw the space under a bridge. Where a rule below rests on general cartographic or illustration practice rather than a fetched page, I say "inference". Treat those numbers as starting values to tune by eye.

## 1. Cartography

Plan oblique relief (Jenny and Patterson 2007, https://cartographicperspectives.org/index.php/journal/article/view/cp57-jenny-patterson) draws terrain in side view on an otherwise flat map: a plan view with a vertical shear proportional to elevation. Its main limitation is that a shear of a heightfield cannot show an overhang. The surface is a single-valued function, so there is no "under". Plan oblique relief, and relief shearing generally (Willett, Jenny et al., https://ilab.ucalgary.ca/publications/chi-2015-willett/), therefore sidestep bridges and arches entirely. I found no case of them being handled. Any arch you draw is an illustrator's addition, not a cartographic convention.

Imhof's conventions (summaries at https://ui.adsabs.harvard.edu/abs/2010LNES..115....1H/abstract and https://mail.colororacle.org/berniejenny/pdf/2006_JennyHurni_SwissStyleShading.pdf) are the useful part. Cast shadow is a separate, cool, low-saturation layer, kept transparent, and it is used to make a ridge "pop". Rock is drawn as ribbed lines along ridges and crevices, not as uniform hatching. Light comes from the upper left in map space. Imhof shifts the light locally when needed for emphasis, so the owner's lower-left light is a deliberate departure from the NW convention that readers will tolerate in a stylised piece but that risks relief inversion. Keeping the shear and the light consistent matters more than the direction.

The space under a bridge: nothing I found says. The standard cartographic answer to "hidden ground" is to show the ground and let shadow fall on it. Inference: leave the ground tone visible through the opening, darken it with the cast shadow, and never hatch it.

## 2. Isometric and axonometric illustration

Games and pixel-art guides are illustration, not cartography. Monument Valley's look comes from three flat tones per solid (top, left face, right face) and a fixed camera (https://gamedeveloper.com/production/video-crafting-the-striking-art-style-of-i-monument-valley-i-, https://en.wikipedia.org/wiki/Monument_Valley_(video_game))). I found no published proportions. Pixel-art isometric guidance fixes only the 2:1 line (about 26.565 degrees) (https://pixelparmesan.com/fundamentals-of-isometric-pixel-art/). One asset description gives a stone arch bridge silhouette about 2.5 times as wide as tall (https://www.summerengine.com/asset-store/stone-arch-bridge-1900-540e7ff0): weak evidence, an AI-asset prompt. Proportions below come from engineering convention (inference): a masonry segmental arch has rise about 1/4 to 1/6 of span; deck plus crown thickness about 1/10 to 1/15 of span for stone; abutments flare to about 1.5 to 2 times deck width.

## 3. Colorado Plateau geomorphology

- Arches in Arches NP all form in the Entrada Sandstone from fins, thin walls eroded by cement dissolution and frost wedging; once a wall breaks through, the ceiling collapses into an arch (USGS Bulletin 1393, https://npshistory.com/publications/geology/bul/1393/sec8.htm). Jointing makes slabs mostly 10 to 20 ft thick, some 1 to 2 ft.
- Span openings in that bulletin: Tunnel Arch 26.5 wide by 22 high with a 14 ft thick span; Baby Arch 25.5 by 14; Broken Arch 59 by 43 with a crest 6 ft thick; Double Arch 160 by 105. Heights are 0.5 to 1.0 times width: openings are tall and rounded, not flat-topped.
- Landscape Arch: span about 290 ft, height 77.5 ft, width 18 ft, thickness 6 to 11 ft after the 1991 rockfall (https://naturalarches.org/archinfo/landscape.htm). Thickness is about 1/25 to 1/50 of span. This is the extreme, a thread of rock; most arches are far chunkier, with thickness around 1/5 to 1/10 of span (from the Tunnel, Broken and Double figures).
- Rainbow Bridge: span 275 ft, height 290 ft, top 42 ft thick and 33 ft wide (https://home.nps.gov/rabr/faqs.htm). Thickness about 1/6.5 of span; the top is a narrow ridge, and its plan is a narrow band, not a slab. It is a natural bridge because a creek runs beneath it.
- Arch versus bridge: NPS and Cleland say a bridge spans an erosion valley and an arch does not; the Natural Arch and Bridge Society says a bridge is just a water-formed arch (https://naturalarches.org/archinfo/faq.htm). For rendering, the useful distinction is the sill: a bridge has a channel or floor below, an arch hangs in a fin with rock on both sides below the opening.
- Abutments flare: the span merges into broad rock masses, and the opening is bounded by curved sides. Plan-view waisting is real: the span is narrow, the ends widen into the fin or mesa. I found no measured plan-view waist ratio; the Rainbow figures (33 ft wide top against a 42 ft thick crown) are the only number.

## 4. Showing a slab is above the ground

I found no empirical study of which cues survive at 10 to 20 px. Established illustration cues, ranked by my reading (inference):

1. Cast shadow detached from the deck, offset along the light direction by the height above ground, with the gap visible as lit ground.
2. A visible underside or soffit, a different, darker tone than the deck, with an arched or curved lower edge.
3. A see-through opening where ground and background show.
4. Contact darkening only at the abutments, where deck meets rock.
5. Deck lighter than the ground it crosses, since the top face receives full light and ground in shadow does not.

At small sizes, fine cues drop out: soft shadow edges, hatching and 1 px outlines blur. What survives is a hard shadow shape with a clear lit gap, one dark soffit shape and a value step. In Tanaka's method (lit edges light and shade edges dark, line weight varying with aspect) the shade-side edge should carry the heavier stroke. The lit edge can be thin or absent.

## 5. Saddles and isthmuses in contour relief

On topographic maps a col is the point where two closed-contour families meet; the contours at the col form an hourglass. Contours on each side of the saddle are concave toward the col, and nearby contours bend smoothly around it. They do not join by straight lines (https://gistbok-ltb.ucgis.org/27/concept/8056 for terrain representation basics; the shape rule is standard topographic practice, inference). For a contour-based renderer the elegant approach is to modify the heightfield, not to paste a shape: add a ridge of height h (the shared layer) between the two peaks, shaped as a Gaussian or smoothstep across the width, then re-run marching squares. The contours then fillet naturally with concave bends at the throat. A smoothed union of the two thresholded regions (a metaball-style blend, or an SDF smooth-min with radius about one third of the gap) gives the same hourglass at lower cost.

## Rules a renderer could adopt

1. Summit-only share (two mesas share only the top layer): draw an arch, not a slab. Sets the split between arch (rule 2 to 6) and saddle (rule 8). Source: Arches NP fin-and-arch formation, USGS Bulletin 1393.
2. Deck thickness is 1/6 to 1/8 of the span, clamped to at least one layer step and at most 1.5 layer steps; for spans under 20 px, never thinner than 3 px. Source: Rainbow Bridge (1/6.5), Tunnel, Broken and Double Arch figures; the clamp is inference for legibility.
3. Opening: height 0.45 to 0.6 of span, with a rounded (elliptical or segmental) top; flat bottom at the lower layer's ground. Source: Arches NP opening dimensions (height/width 0.5 to 1).
4. Plan shape of the deck: waisted. Mid-span width 0.25 to 0.35 of span (min 4 px), flaring to 1.5 to 2 times that at each abutment, with a fillet radius about 0.5 of the layer step where it meets the mesa edge. Source: Rainbow Bridge, plan-view reasoning; flare ratio is inference.
5. Deck is a top face lit like the mesa summit, a tone half a step lighter than the ground at its own height; the front face (soffit side toward the viewer) is one tone darker than the mesa's shade face. Source: Tanaka, Imhof; flat tone logic from Monument Valley (illustration).
6. Cast shadow on the lower ground: the deck outline shifted along the light direction (toward the upper right, for light from the lower left) by the height above ground times the shear factor, filled with a cool transparent multiply at 25 to 35 per cent. Leave 1 to 2 px of lit ground between the underside edge and the shadow's near edge where the opening is. Source: Imhof's transparent cast shadow; offset rule is inference.
7. Under the arch, show the ground and soffit: the soffit is a darker curved band about 0.5 of deck thickness, following the opening's upper curve; never hatch the void. Source: inference from cartographic practice; no source found.
8. Lower-layer shares (isthmus or saddle): no arch. Raise a smooth ridge in the heightfield between the mesas at the shared layer, cross-section smoothstep, throat width 0.3 to 0.5 of the gap, so marching-squares contours bend concavely around the throat. Source: topographic col shape (inference) and SDF smooth-min.
9. Contour flow at joins: smooth each contour polyline after union with a Chaikin or rounding pass of radius about 0.5 of the layer step, so no corner sharper than about 120 degrees remains. Source: inference.
10. Edge weight: shade-side edges of the deck 1.5 times the weight of the lit edges; abutment contact gets a short darker line 1 to 2 px long where deck meets rock. Source: Tanaka convention.
11. Small spans (under 20 px): drop the soffit band and keep three things only: a deck top, one dark opening shape, and the detached shadow. Source: inference, no empirical evidence found.
12. Vary by pair: derive span thickness and curvature from a hash of the pair id (plus or minus 15 per cent) so bridges do not look stamped. Source: Landscape Arch versus Tunnel Arch variation in Bulletin 1393.

## What not to do

- Do not draw a constant-width rectangle with parallel edges; every natural span in the sources is waisted and thickest at the abutments.
- Do not make the deck as thin as Landscape Arch (1/25 to 1/50 of span); that is an outlier and disappears at 10 to 20 px.
- Do not fill the opening with hatching or a flat dark shape the same value as the shadow; the opening must read as ground visible through the arch.
- Do not use a soft blurred shadow on small spans; it merges with the ground tone. Do not give the shadow zero offset, which pastes the slab onto the ground.
- Do not claim cartographic precedent: plan oblique relief and Imhof's work do not show arches, so keep this as a stylised illustration layered on the relief.
