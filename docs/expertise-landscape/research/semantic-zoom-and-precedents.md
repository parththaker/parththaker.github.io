# Zoom mechanism, label rules, precedents, strata colours

Verification legend: [V] = URL fetched, HTTP 200 and content read. [S] = URL surfaced by search, HTTP status 200 but content not read in depth. [X] = could not be fetched (state why). Nothing below is cited from memory without a flag.

## (a) How Map of GitHub does label levels

Sources [V]: README https://github.com/anvaka/map-of-github ; code `src/lib/createMap.js`, `src/lib/gl/createLabelManager.js`, `src/lib/createMaplibreSubgraphViewer.js` at https://github.com/anvaka/map-of-github/tree/main/src/lib . README: 690K projects, clustered with Leiden (1.5K clusters), laid out with ngraph.forcelayout, rendered with MapLibre; data -> GeoJSON -> tippecanoe vector tiles. Country names were LLM-generated (1-3 words, distinct) and are editable by the user.

The label hierarchy is NOT three separate zoom bands with hard minzoom/maxzoom. It is built from three layers in `getDefaultStyle()` in `createMap.js`:

1. **Country labels** (layer `place-country-1`, ~line 455-495, source `place`, a GeoJSON of cluster names). Visibility is a per-feature rank gate, not a layer minzoom:
   `filter: ["<=", ["get","symbolzoom"], ["+",["zoom"],4]]`. Each country carries a `symbolzoom` integer (its importance rank: smaller = bigger cluster). A country appears once `zoom + 4 >= symbolzoom`. Layer has `maxzoom: 10`, so country names disappear entirely when the project labels take over.
   Size: `text-size` is an `interpolate` with a **cubic-bezier** easing over zoom 1 -> 9, and a `step` on `symbolzoom` picks the endpoints: rank <4: 15 -> 22px, rank 4: 13 -> 19, rank 5+: 12 -> 17. So bigger countries are bigger type AND appear earlier AND grow faster.
   `symbol-sort-key: symbolzoom` makes MapLibre's collision pass place important names first; losers are silently dropped (default collision, no allow-overlap). `text-max-width: 6` wraps names into 2-3 lines; `text-line-height: 1.1`; Roboto Condensed Bold with a halo.
2. **Project (city) labels** (layer `label-layer`, source-layer `points`): `filter: [">=",["zoom"],8]`, i.e. nothing before zoom 8. Text is each repo's name with the owner stripped (`slice` after "/"). `text-size` interpolates zoom 8 -> 10 from `size/4` to `size+8`, where `size` is a per-point value (star-derived). `symbol-sort-key: -size` so the biggest repos win collisions. Anchored top with a 0.5em offset under a circle.
3. **Dots** (layer `circle-layer`): radius interpolates zoom 5 -> 23, `size*0.1` -> `size*1.5`; opacity 0.1 -> 0.9 over zoom 5 -> 15; stroke fades in only from zoom 8. Dots get denser and crisper as you zoom; this is the "texture" that makes labels feel earned.
4. Vector tile source is only defined for zoom 4-7 (`minzoom:4, maxzoom:7`); beyond that MapLibre over-zooms the z7 tiles. Tippecanoe's feature dropping at low zoom is what thins the points.
5. A separate WebGL path (`createLabelManager.js`, MSDF text, `padding = 1` for overlap checks, `visibleRect` culling) is used for the subgraph (repo-neighbourhood) view; the same idea hand-rolled: per-label info, visible rect, importance-ordered greedy overlap test.

Mechanism in one sentence: every label has an importance rank; zoom (via an interpolated size, plus a rank-vs-zoom filter) decides how big it is and whether it is eligible; the engine's collision detector places labels in rank order and drops the ones that would overlap. Nothing is a fixed list per zoom level.

MapLibre style-spec pointers [V] https://maplibre.org/maplibre-style-spec/layers/ : symbol layer properties `symbol-sort-key`, `symbol-spacing`, `text-size`, `text-allow-overlap`/`text-overlap`, `text-padding`, `text-optional`, `text-max-width`, plus layer-level `minzoom`/`maxzoom`/`filter`. Expressions (`interpolate`, `step`, `["zoom"]`) are at https://maplibre.org/maplibre-style-spec/expressions/ [V]. Note the spec says zoom-dependent expressions are only allowed as the outermost `step`/`interpolate`; Anvaka nests `step` inside `interpolate` stops, which is the allowed form.

**Static-SVG equivalent.** There is no collision engine, so precompute it: give each label (1) a `rank`/tier (field=0, bench=1, item=2), (2) a hand-set or build-time-computed `minScale` at which it is allowed, and (3) its own size in screen px. Implement the filter as CSS class toggles on a root `data-level`, and keep type at constant screen size by counter-scaling (`font-size: calc(Npx * var(--inv))` with `--inv = viewBoxWidth/homeWidth`), which is exactly what "semantic zoom" means (geometry scales, text does not; see Bostock's wording in the freeCodeCamp piece below). Collision is handled at design time: the 3 levels are chosen so that within a level no two labels overlap at that level's viewBox. Optionally run a build-time greedy placer in rank order (same as symbol-sort-key) to verify.

## (b) Three-level label rule set for the map

Background rules, with sources.
- Imhof, "Positioning Names on Maps", The American Cartographer 2(2):128-144, 1975 (English translation of his 1962 essay "Die Anordnung der Namen in der Karte"). Sources found via search: names must be legible, clearly associated with the feature named, and not overlap other content; names should neither be evenly dispersed nor densely clustered; place by priority class, most important first. Original text paywalled [X] (https://www.tandfonline.com/doi/abs/10.1559/152304075784313296 returns 403 to fetch); secondary: https://en.wikipedia.org/wiki/Automatic_label_placement [S], https://cartogis.org/docs/proceedings/archive/auto-carto-9/pdf/rule-based-cartographic-name-placement-with-prolog.pdf [S]. I did not read Imhof directly; treat his rule numbers as unverified.
- Nomic's docs state the same principle as the cartographers' scale ladder: "zooming in brings more granularity, like states and provinces ... names of cities ... labeled buildings" and topics in hierarchies of 2-3 levels appear and disappear as you zoom. [V] https://docs.nomic.ai/atlas/capabilities/topics
- Google Maps design-talk citations: I found no verifiable source; not cited.
- Heuristics below (counts, px, timings) are my design judgement, calibrated against Map of GitHub's numbers above (12-22px country type, 4-5 rank tiers, cross-fade by size interpolation). They are not from a standard.

Type hierarchy (screen px, constant regardless of zoom; Archivo for names, JetBrains Mono for counts/meta, Source Serif 4 for item titles). Tier ratio about 1.4-1.6 between levels, as in Anvaka's 22 -> 17 -> 12.

| Level | Zoom factor k (home width / viewBox width) | Shows | Type | Max labels |
|---|---|---|---|---|
| 0 Overview | 1 to <1.8 | 7 field names only, one per mesa, set on or beside the mesa top; a mono total ("214 items") under each | Field name: Archivo 600, 17-20px, tracking +0.01em; count: JetBrains Mono 11px | 7 names + 7 counts. Hard cap 8. |
| 1 Mesa | 1.8 to <4 | The focused mesa's name stays but shrinks to 13-14px caps; bench (terrace) names with counts: Cited / Read / Written / Published, as leader-labelled strata; sub-topic tags on the bench face. Other mesas dim to 35% and drop to name-only at 12px | Bench: Archivo 500 12-13px; count: Mono 11px | about 4 benches x 1 label + 3-5 sub-topic labels = 9 per mesa; neighbours 6 names. Total <= 16. |
| 2 Close | >= 4 | Item names on the small blocks (papers, posts); year in mono; bench labels drop to 11px | Item title: Source Serif 4 12-13px, 1 line, ellipsis at ~26 chars, full title on hover/focus; year Mono 10.5px | <= 14 item labels in the viewport; if a bench has more, label the top N by rank (citations or recency) and leave the rest as unlabelled blocks (Imhof: don't densely cluster). |

Rules.
1. Importance order is fixed: field > bench > item. Within an item tier, rank by user-chosen "featured" then recency. Higher rank never loses space to lower rank.
2. Label budget (ink): at most about 1 label per 12,000 CSS px^2 of viewport at any level (a 1200x800 viewport => <= 80 theoretical; stay at 16 or fewer because a stylised map wants quiet). Keep text under about 6% of viewport area.
3. Size is constant on screen; the geometry scales. A label may not grow with zoom (unlike Map of GitHub, which interpolates size 15 -> 22): in SVG, interpolated size costs layout and invites collisions; instead cross-fade.
4. Appear/disappear by cross-fade, not pop: 200-250 ms opacity on class change, the incoming tier delayed 80 ms so the outgoing tier clears first (avoids two layers overlapping). Hysteresis: enter level at k=1.8, leave at k=1.6 (and 4.0 / 3.6) so a wobbling wheel does not flicker.
5. Camera tween 500-700 ms ease-in-out on click, 0 ms on wheel (the wheel itself is the animation). Reduced motion: no tween, no fade (opacity switch only).
6. Summarisation going out: items collapse to the bench count ("38 read"); benches collapse to the field's single count. The count at level N must equal the sum of what is revealed at N+1 (verify in build).
7. Name the thing being zoomed to: on level change, update an `aria-live="polite"` caption ("Field: X, 4 benches") so the zoom is not visual-only.

## (c) Minimal vanilla-JS semantic zoom (inline SVG, 38 lines)

Markup assumption: `<svg id="map" viewBox="0 0 1200 800">` containing `<g class="mesa" data-field="x">` groups, label tiers as `<g class="lbl lbl-0">`, `lbl-1`, `lbl-2` with CSS below. `getScreenCTM` handles `preserveAspectRatio` letterboxing correctly.

```js
const svg = document.getElementById('map');
const home = svg.getAttribute('viewBox').split(' ').map(Number);
const calm = matchMedia('(prefers-reduced-motion: reduce)');
let vb = [...home], raf, lv = 0;
const LV = [[0, 1.8, 1.6], [1, 4, 3.6]];                // [level, enter at k, leave below k]
function apply() {
  svg.setAttribute('viewBox', vb.map(n => n.toFixed(2)).join(' '));
  const k = home[2] / vb[2];
  svg.style.setProperty('--inv', 1 / k);                // labels use font-size: calc(13px * var(--inv))
  let n = 0; for (const [l, up, down] of LV) if (k >= (lv > l ? down : up)) n = l + 1;
  if (n !== lv) { lv = n; svg.dataset.level = n; }      // CSS reacts: [data-level="1"] .lbl-1 {opacity:1}
}
function clampBox(b) {
  const w = Math.min(home[2], Math.max(home[2] / 8, b[2])), h = w * home[3] / home[2];
  return [Math.min(home[0] + home[2] - w, Math.max(home[0], b[0])),
          Math.min(home[1] + home[3] - h, Math.max(home[1], b[1])), w, h];
}
function go(to, ms = 600) {
  cancelAnimationFrame(raf); to = clampBox(to);
  if (calm.matches || !ms) { vb = to; return apply(); }
  const from = [...vb], t0 = performance.now();
  raf = requestAnimationFrame(function step(t) {
    const p = Math.min(1, (t - t0) / ms), e = p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
    vb = from.map((v, i) => v + (to[i] - v) * e); apply();
    if (p < 1) raf = requestAnimationFrame(step);
  });
}
svg.addEventListener('wheel', e => {                     // pass ctrl/meta only if you dislike scroll-hijack
  e.preventDefault();
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  const f = Math.exp(-e.deltaY * 0.0015), w = vb[2] / f;
  go([pt.x - (pt.x - vb[0]) * w / vb[2], pt.y - (pt.y - vb[1]) * w / vb[2], w], 0);
}, { passive: false });
svg.addEventListener('click', e => {
  const g = e.target.closest('[data-zoom]'); if (!g) return;   // mesas and benches carry data-zoom
  const b = g.getBBox(), pad = 0.12, w = b.width * (1 + pad * 2);
  const asp = home[3] / home[2], hh = Math.max(w * asp, b.height * (1 + pad * 2)), ww = hh / asp;
  go([b.x + b.width / 2 - ww / 2, b.y + b.height / 2 - hh / 2, ww]);
});
addEventListener('keydown', e => { if (e.key === 'Escape') go(home); });
apply();
```
CSS: `.lbl{opacity:0;transition:opacity .22s} .lbl-0{opacity:1} [data-level="1"] .lbl-0{...smaller} [data-level="1"] .lbl-1,[data-level="2"] .lbl-2{opacity:1;transition-delay:.08s} @media (prefers-reduced-motion:reduce){.lbl{transition:none}}`. Add `.lbl{pointer-events:none;font-size:calc(var(--px)*var(--inv)*1px)}`. Notes: `getBBox` on a `<g>` gives local user-space box; if the mesa group has a transform, apply it. `data-zoom` elements should be focusable (`tabindex=0`, Enter = click) for keyboard users. Not run-tested; the line count (fenced block) is 42 lines.

## (d) Interaction precedents (not slippy-maps)

| Precedent | URL | LOD trick | Transferable to inline SVG + small JS? |
|---|---|---|---|
| d3-zoom (the primitive) [V 200] | https://d3js.org/d3-zoom and https://github.com/d3/d3-zoom | `zoom` event gives `transform {k,x,y}`; apply to a `<g>` or rescale axes | Yes, but a 20-line wheel handler (above) removes the dependency. Use d3-zoom if you also want pinch/inertia. |
| Bostock, "SVG Semantic Zooming" (block, referenced as forked in gists) | search-surfaced only; the specific block URL was not verified [X] | Zoom the layout but not the glyphs (counter-scaling) | Yes: the `--inv` CSS variable pattern above. |
| Observable d3 zoom collection (zoomable scatterplot, zoom-to-bounding-box, zoomable treemap/sunburst/circle packing) [X: 429 rate limit on every fetch, but the collection URL appeared in search results] | https://observablehq.com/@d3/-/collection/d3-zoom | Zoom-to-bbox = animated transform to fit a clicked node; treemap/sunburst swap the hierarchy level (drill-down) | Yes. The "click a mesa -> fit its bbox" pattern is exactly the click handler above. |
| Nomic Atlas [V] | https://docs.nomic.ai/atlas/capabilities/topics (live example: https://atlas.nomic.ai/data/nomic/wikipedia-2023 [S 200]) | Hierarchical topic clusters at 2-3 depths; label sets swap by zoom, labels placed by cluster size | Yes in principle: precompute depth-1/2/3 label sets, map to levels 0/1/2. Closest conceptual match to your map. |
| PNNL ThemeView (3D terrain of topics, peak labels) [S 200] | https://in-spire.pnnl.gov/Help/Content/ThemeView_Classic.htm | Peak labels over a topic terrain; user can set number of labels and words per label | Concept only (a desktop app); confirms "terrain + peak label cap" as an old, working metaphor. |
| Fried & Kobourov, "Maps of Computer Science" [S 200] | https://dpfried.github.io/papers/Fried-pacificvis-14.pdf | Map metaphor for topics with multiple zoom levels and rank-based labels | Concept; relevant for rank-ordered label tiers. |
| Google WikiGalaxy [S 200] | https://experiments.withgoogle.com/wikigalaxy | Clusters of articles as stars; zoom reveals article titles | Concept only (WebGL). |
| Wikimap UI (pioder/pderkowski) [S 200] | https://github.com/pderkowski/wikimap_ui | Map of Wikipedia articles with zoom-dependent titles | Concept only; code may be readable. Not deeply examined. |
| Places & Spaces: Mapping Science [S 200] | https://www.dagstuhl.de/21152/places-spaces/maps.html | Index to map-of-science illustrations (Klavans and Boyack etc.) | Visual precedent for hand-lettered topic maps. |
| NYT zoomable graphics | https://www.nytimes.com/interactive/2014/upshot/dialect-quiz-map.html returned 403 [X] | Not verified | I could not verify a specific NYT zoomable-graphic URL; do not cite. |

Plain finding: the transferable trick in all of these is the same two moves, (1) precomputed label tiers with an importance order, (2) camera = viewBox/transform tween on click. None needs a library.

## (e) Layered-rock visual precedents and strata colours

Visual precedents (what to copy):
- USGS "Geologic Time: Graphical Representation" [V 200] https://pubs.usgs.gov/gip/geotime/time.html and poster https://pubs.usgs.gov/gip/2008/58/ [V]: time-ruler with era/period bands and life icons. Copy: a thin mono scale at the left edge of the plateau giving "layers of evidence" a quantitative spine.
- Wikipedia Stratigraphic column [V 200] https://en.wikipedia.org/wiki/Stratigraphic_column : conventional lithology fill patterns (sandstone dots, limestone bricks, shale dashes). Copy: one distinct hatch per bench type (cited / read / written / published), so benches are readable in greyscale and by colour-blind readers.
- Grand Staircase figure on Commons [V 200] https://commons.wikimedia.org/wiki/File:Grand_Staircase-big.jpg : stylised cliffs-and-benches cross-section; the exact image the plateau metaphor echoes (Grand Canyon to Zion to Bryce). Copy: the staircase profile, labelled once per cliff on the right margin.
- Grand Canyon unit list with ages [V] https://www.nps.gov/articles/000/grcatime-numeric-ages.htm and https://www.nps.gov/articles/000/grcatime-layered-paleozoic-rock.htm ; top-to-bottom order [S] https://faculty.jmcl.wwu.edu/River/stratigraphy.pdf. Copy: the mnemonic ordering (Kaibab, Toroweap, Coconino, Hermit, Supai, Redwall, Muav, Bright Angel, Tapeats, Vishnu) as a ready-made, real, ordered list of 7-10 band names if you want a legend with a wink.
- I did not find a specific "layer cake" data-journalism URL or isometric-data-landscape URL I could verify; not claiming one. The isometric/axonometric remark from Esri: "pure isometric does not always translate well to maps; tools use axonometric" (search snippet, https://downloads.esri.com/esripress/books/Thematic-Mapping/files/basic-html/page10.html [S]) supports your plan-oblique choice.

Strata colour chart findings:
- **There is no canonical named-colour chart for Grand Canyon strata from NPS, USGS or the Grand Canyon Association that I could find.** NPS pages describe colour in words and give ages but publish no palette; the one NPS-hosted brochure candidate (https://www.nps.gov/grca/planyourvisit/upload/life_geology.pdf [S]) was not read for colour values. USGS geologic maps use unit-specific map colours that are not a published Grand Canyon palette, and the USGS/FGDC symbology page (https://ngmdb.usgs.gov/fgdc_gds/geolsymstd.php) returned 403 here [X]. The international chart colours (https://stratigraphy.org/chart [V 200]) are by geologic time period, not lithology.
- Verbal colours (hobby/educational, not authoritative) [V] https://www.kaibab.org/geology/gc_layer.htm : Kaibab cream to greyish-white; Toroweap yellow to grey; Coconino white to cream; Hermit deep rust red; the page continues with Supai/Redwall/Muav/Bright Angel/Tapeats (Redwall is grey limestone stained red; Muav yellowish; per search snippets of grandcanyontrust and NPS-linked material). Treat as descriptive.
- Illustrative map colours: the Commons caption for the Grand Staircase figure gives Kaibab tan, Coconino light tan, Hermit light red, Redwall lavender, Tapeats light brown (from search snippet; figure itself is for the Staircase, not the Canyon).
- Recommendation: derive your own palette from those words, labelled "after the Kaibab-to-Tapeats sequence". Suggested starting hexes are MY proposal, not a standard: top rim cream `#EFE6CF`, yellow-grey `#D8CFA0`, pale tan `#E8D9B8`, rust red `#B4553A`, red ledge `#9C4632`, stained grey-red `#B26F5A`, yellowish `#C9AE78`, olive-grey `#8A8F72`, brown `#7A5A44`, basement near-black `#2E2A2B`. Check text contrast with a validator; each bench needs 3:1 against its neighbour or a hatch.

Fonts (all SIL Open Font License 1.1; verified directory exists in google/fonts [V 200]): Archivo https://github.com/google/fonts/tree/main/ofl/archivo ; Source Serif 4 https://github.com/google/fonts/tree/main/ofl/sourceserif4 ; JetBrains Mono https://github.com/google/fonts/tree/main/ofl/jetbrainsmono . Licence is OFL from the directory name ("ofl"); I did not open each OFL.txt. Archivo is variable with a width axis: a condensed instance (wdth 75-87) is useful for tight bench labels, as Anvaka uses Roboto Condensed. Colour references with clear licence: ColorBrewer (Apache-2.0 for the code; palettes free, https://colorbrewer2.org was unreachable from here [X]); for earth tones, the USGS/CGMW time chart colours via stratigraphy.org [V] if you want a defensible "geologic" scheme.
