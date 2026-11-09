# Rock-look rendering options for the terraced relief SVG

Method: web search plus fetch of each URL listed in section (d). I also ran the snippets in
section (b) in Chrome headless (google-chrome --screenshot) and in resvg (pip `resvg-py`,
via `uv run --with resvg-py`). Both rendered without error. Chrome and resvg output differed
visibly (noted below). Items marked UNVERIFIED are from memory, not fetched.

## (a) Comparison table

| Technique | Look | Bytes added | JS | og-image safe | Dark mode | Verdict |
|---|---|---|---|---|---|---|
| feTurbulence grain, multiplied over fills (`feColorMatrix` to alpha, `feBlend multiply`) | Sandstone speckle and streak. Anisotropic `baseFrequency="0.05 0.6"` gives horizontal strata grain. | ~350 B per filter, defined once | No | Yes in resvg (table: feTurbulence 94%, feBlend 100%, feComposite 100%, feColorMatrix 100%). Satori to Sharp/librsvg: librsvg is 78% on turbulence and 100% on feBlend, so it likely works but is untested here. Noise differs per rasteriser, so og crops will not match the page pixel for pixel. | Alpha-only grain over currentColor or CSS-variable fills works in both themes. Tune alpha per theme with a CSS custom property on the filter's `feFuncA` (not tested) or two filters. | Use. Apply to the terrace-top and riser groups, never per small block. |
| feTurbulence + feDisplacementMap on edges | Slightly irregular, eroded outlines. | ~250 B | No | Renders in resvg, but resvg moved edges visibly more than Chrome at the same `scale`. Test table row for feDisplacementMap in resvg is ambiguous (page shows 200% with one test). | Neutral | Use with scale at or below 1.5 units. It blurs 6 to 10 px features, so apply to terrace groups only, not to blocks or labels. Risk: it rasterises at device resolution, so it costs paint time. |
| feDiffuseLighting / feSpecularLighting with a bump map | Real-looking relief shading on the faces. | ~400 B | No | resvg: diffuse 95%, specular 100%. Chrome shows 27% / 25% on the resvg test suite, so lighting is the least consistent across engines. Safari is 100% on diffuse and 25% on specular. | Light colour and `surfaceScale` can be switched per theme | Risky. The riser faces are already flat polygons, so a baked fill per face is cheaper and identical everywhere. Use only as an optional extra and check Chrome, Safari and resvg side by side. |
| `<pattern>` bedding hairlines on riser faces | Horizontal strata lines, the strongest Colorado Plateau cue | ~200 B per pattern | No | Yes. resvg pattern 100%, Chrome and Firefox 100%, Safari 86%. | Use `currentColor` or CSS variables for the stroke colour (variables inside `<pattern>` work inline in browsers; resvg has no CSS variables, so bake the colours in for og). | Use. Best value per byte. |
| Stipple or brick `<pattern>` | Debris and talus texture or masonry | ~250 B | No | Yes | Same as bedding | Stipple only on talus slopes. Brick reads as a wall and looks like a game, so skip it. |
| `mix-blend-mode: multiply` overlays | Shade multiplication of layers | 0 to 100 B | No | resvg 100%, Chrome and Firefox 100%, Safari only 30% on the test suite | Works | Avoid on the page. Use `feBlend` inside a filter or plain opacity instead. |
| clip-path hatching on riser faces | Engraved vertical hatch for shade | ~100 to 300 B per face | No | Yes (clipPath is basic SVG) | Stroke colour via CSS | Use sparingly. Cheaper form: a `<pattern>` of diagonal lines as the riser fill. |
| Tanaka illuminated contour strokes (light line on lit edges, dark on shadow edges) | Crisp engraved, cartographic relief. Fits terraces exactly. | Two stroke paths per terrace edge, roughly the cost of the outline again | No | Yes, plain paths | Swap the lit and shadow colours per theme | Use. This is the best fit for "must not look like a game". |
| Build-time raster (PNG grain and lighting from Pillow, node-canvas or cairo) shipped beside the SVG | Richest texture | 30 to 200 KB PNG | No | Yes (just an image) | Needs two PNGs or a luminance mask; blurry when scaled | Use only as a texture tile (small seamless PNG inside `<pattern>`, or one data-URI) and not for geometry. |
| Rough.js hachure (`rough.svg`) | Sketchy hand-drawn | Library <9 kB gzipped; or run at build time in Node so 0 B at runtime | Only if run client-side | Yes if baked | Stroke colour | A hand-drawn look fights the clean engraving direction. Skip unless the owner wants a sketch map. |
| three.js or regl extruded terraces | 3D strata with shaders | three.js is far over 5 KB (UNVERIFIED: ~150 KB+ gzipped for a minimal scene); regl is a no-dependency GL wrapper (size not stated on its page) | Yes | No | Yes | Fails: static fallback, JS budget, og image. |
| Satori-only | Satori outputs SVG from JSX; its filter support is `url()` references within the document | n/a | n/a | Not a render path for this; it only wraps. For og, rasterise the page's SVG with resvg directly. | n/a | Use resvg, not Satori, for the og image. |

## Findings by question

**Q1 SVG-native.** feTurbulence, feDiffuseLighting and feDisplacementMap are in the Baseline "widely available" set on MDN (since July 2015).
resvg implements them and the test suite states per-engine pass rates (see table). Two practical cautions:
- (1) Noise is generated in user space at the output resolution, so resvg and Chrome produce different noise. Do not rely on a specific pattern.
- (2) Filters on large groups at 900x520 rasterise per frame when zooming; keep filters on static groups and never animate them.

**Q2 Raster.** Drawing the same geometry to PNG at build time (Pillow or cairo, grain by numpy noise) gives full control and no cross-engine difference, but the PNG is not crisp at 6 to 10 px features when the page scales, and it needs one image per theme. The better hybrid is a small tiled noise PNG or an inline SVG pattern inside the vector SVG.

**Q3 WebGL.** I found no <30 KB library that gives a plan-oblique look. The three.js docs index shows tree-shakable named imports but states no sizes, and regl's page does not state a size either, so treat both as unverified. Laser-cut and paper-cut tools (laserUp-js, topocut, TopoStack) output stacked contour slices as SVG. Visually they are flat contour layers with no shading: just the contour outlines you already compute. Nothing to adopt.

**Q4 Engraving looks.** Tanaka implementations found: Axis Maps blog (Leaflet + d3-contour, canvas drop-shadow trick), Sahil Chinoy's Observable notebook (per-segment orientation sets colour and width; I could not fetch it, HTTP 429, and it is described from a search snippet), Anita Graser's QGIS recipe (method described below), the R `tanaka` package. I found no maintained SVG or d3 Tanaka library, so write it yourself at build time (snippet below).

**Q5 Semantic zoom.** I could not find anvaka's label logic: the map-of-github README says it uses maplibre with tippecanoe tiles, which handles label levels in the tile style, not in inline SVG. The pattern in section (c) is my own.

## (b) Snippets (tested in Chrome headless and resvg)

### 1. Sandstone grain plus eroded edge

```svg
<filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.05 0.6" numOctaves="2" seed="7" result="n"/>
  <!-- noise -> black with alpha 0.42 - 0.55*noiseAlpha: darker flecks, never lighter -->
  <feColorMatrix in="n" type="matrix"
    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 0.42" result="a"/>
  <feComposite in="a" in2="SourceAlpha" operator="in" result="g"/>
  <feBlend in="SourceGraphic" in2="g" mode="multiply"/>
</filter>
<filter id="erode" x="-2%" y="-2%" width="104%" height="104%">
  <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="3" result="t"/>
  <feDisplacementMap in="SourceGraphic" in2="t" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<g filter="url(#erode)"><g filter="url(#grain)"> ...terrace tops and risers... </g></g>
```

Test result: the filtered sample read as fine-grained rock strata in both Chrome and resvg. Caveats from my runs:
- Contrast must be low; my first try (`-1.4 1.0`, isotropic frequency) looked like fur or wood. The shipped values above are the gentler pair.
- The anisotropic frequency (x low, y high) is what makes horizontal bedding; with the high frequency on x you get vertical streaks.
- It still reads slightly like wood grain. Mitigate with a second isotropic speckle layer or by lowering alpha to ~0.3 on top faces, and rely on the bedding pattern and Tanaka lines for the rock cue.
- resvg displaced the edges more than Chrome at the same scale, and its noise looked finer.

### 2. Bedding pattern (risers and terrace tops)

```svg
<pattern id="bed" width="8" height="5" patternUnits="userSpaceOnUse">
  <path d="M0 .5H8" stroke="#000" stroke-opacity=".18" stroke-width=".6"/>
  <path d="M0 3.2H5" stroke="#fff" stroke-opacity=".12" stroke-width=".5"/>
</pattern>
<!-- draw after the base fill, same path data -->
<path d="M20 40H200V90H20Z" fill="#c4683a"/>
<path d="M20 40H200V90H20Z" fill="url(#bed)"/>
```

Staggered second line (different length, white) breaks the mechanical repeat. For irregular strata, vary `height` per riser (4 to 7), or set `patternTransform="translate(0 N)"` so the lines do not align across neighbouring risers. This rendered correctly in both rasterisers.

### 3. Tanaka illuminated contours (build-time, no runtime cost)

Method (from Anita Graser's recipe): split each contour into segments, compute the azimuth of each segment, set lightness by the angle to a fixed light (NW, white facing it, black facing away), set width by orthogonality (wider when facing toward or away from the light, thinner at right angles). For a terrace edge this reduces to classifying each edge segment by its normal.

```python
import math
LIGHT = math.radians(-45)           # light from upper left, in SVG coordinates (y down)

def tanaka(path_pts, lit="#fff4dc", dark="#2a1008"):
    """path_pts: closed ring of (x,y), terrace-top outline, CCW so the outward normal is on the right."""
    out = []
    for (x0, y0), (x1, y1) in zip(path_pts, path_pts[1:] + path_pts[:1]):
        dx, dy = x1 - x0, y1 - y0
        L = math.hypot(dx, dy)
        if not L: continue
        nx, ny = dy / L, -dx / L                       # outward normal
        facing = nx * math.cos(LIGHT) * -1 + ny * math.sin(LIGHT) * -1   # +1 toward light, -1 away
        w = 0.35 + 0.9 * abs(facing)                   # thick when facing/away, thin at right angles
        col = lit if facing > 0.15 else dark if facing < -0.15 else None
        if col:
            out.append(f'<path d="M{x0:.1f} {y0:.1f}L{x1:.1f} {y1:.1f}" stroke="{col}" stroke-width="{w:.2f}"/>')
    return '<g fill="none" stroke-linecap="round">' + "".join(out) + "</g>"
```

Merge adjacent segments of the same class into one polyline at build time to keep the byte count down (about 2x the outline). Theme: emit `class="lit"` and `class="shade"` and set `stroke` in CSS, e.g. light theme `.lit{stroke:#fff4dc}.shade{stroke:#3a1a0c}`, dark theme `.lit{stroke:#e0b080}.shade{stroke:#000}`. Note the sign convention depends on polygon winding; flip `nx, ny` if lit lines land on the wrong side. This snippet was not rendered; the formula comes from the Graser recipe, so verify the winding on your data.

## (c) Semantic zoom, vanilla (about 1.0 KB, 0.7 KB gzipped; syntax-checked with `node --check`, not run in a browser)

Markup: each field is `<g data-f class="f">` containing item labels `<text class="l2">`; field labels are `<text class="l1">`.

```css
svg#map [class~="l2"]{display:none}
svg#map[data-z="1"] .l2, svg#map[data-z="2"] .l2{display:inline}
svg#map[data-z="0"] .l1{font-size:22px} svg#map[data-z="2"] .l1{opacity:.35}
svg#map .edge{vector-effect:non-scaling-stroke}  /* keeps hairlines 1 device px while zooming */
```

```js
const svg=document.querySelector('svg#map'),W=900,H=520;
let v={x:0,y:0,w:W,h:H},raf;
const set=()=>{svg.setAttribute('viewBox',`${v.x} ${v.y} ${v.w} ${v.h}`);
 const z=W/v.w;svg.dataset.z=z<1.6?0:z<3?1:2;};
function go(t,ms=500){cancelAnimationFrame(raf);const a={...v},t0=performance.now();
 (function f(n){const k=Math.min(1,(n-t0)/ms),e=k*k*(3-2*k);
  for(const p in a)v[p]=a[p]+(t[p]-a[p])*e;set();if(k<1)raf=requestAnimationFrame(f)})(t0)}
svg.addEventListener('click',e=>{const g=e.target.closest('[data-f]');
 if(!g){go({x:0,y:0,w:W,h:H});return}
 const b=g.getBBox(),p=40,w=b.width+2*p,h=Math.max(w*H/W,b.height+2*p);
 go({x:b.x+b.width/2-w/2,y:b.y+b.height/2-h/2,w:h*W/H>w?h*W/H:w,h});});
svg.addEventListener('wheel',e=>{e.preventDefault();const r=svg.getBoundingClientRect(),
 mx=v.x+(e.clientX-r.left)/r.width*v.w,my=v.y+(e.clientY-r.top)/r.height*v.h,
 s=Math.min(W,Math.max(W/6,v.w*(e.deltaY>0?1.15:.87)))/v.w;
 v={x:mx-(mx-v.x)*s,y:my-(my-v.y)*s,w:v.w*s,h:v.h*s};set()},{passive:false});
set();
```

Notes:
- `vector-effect: non-scaling-stroke` is Baseline widely available (MDN, since January 2020); only `none` and `non-scaling-stroke` have implementations.
- Text in an SVG scales with the viewBox, so item labels need `font-size` divided by the zoom, either via a CSS variable set in `set()` (`svg.style.setProperty('--k',v.w/W)`, then `font-size:calc(11px*var(--k))`) or by authoring them at the size that is right at z=3.
- Collision avoidance at build time (Python): sort labels by priority, place each at its candidate anchors (right, left, above, below), measure the box at about 0.55 em per character, and reject a placement when it overlaps an accepted box. Do this once per zoom level (overview: fields only; z1: plus large items; z2: all), and write the level as `class="l1|l2|l3"`. The static SVG (no JS) shows only level 1, which is also what the og image gets.
- No-JS fallback: without the script `data-z` is unset, so item labels stay hidden and the page still reads as the overview.
- Keyboard and touch: add `tabindex` and Enter handling on `[data-f]` if the pan/zoom ships.

## (d) URLs relied on (all fetched or returned by search in this session)

Fetched OK:
- https://github.com/linebender/resvg/blob/main/docs/unsupported.md
- https://github.com/linebender/resvg
- https://raw.githubusercontent.com/linebender/resvg/main/docs/svg2-changelog.md (mix-blend-mode, isolation, filter functions done)
- https://linebender.org/resvg-test-suite/svg-support-table.html (pass rates quoted above)
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDiffuseLighting
- https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
- https://github.com/vercel/satori (SVG output only; PNG goes through Sharp/librsvg)
- https://roughjs.com/ (<9 kB gzipped, hachure options)
- https://anitagraser.com/2015/05/24/how-to-create-illuminated-contours-tanaka-style/
- https://www.axismaps.com/blog/contour-maps-in-a-web-browser
- https://github.com/trivisonno/laserup-js
- https://github.com/anvaka/map-of-github (maplibre + tippecanoe; no label logic described)
- https://github.com/regl-project/regl (no size stated)
- https://threejs.org/docs/#manual/en/introduction/Installation (no size stated)

Returned by search only, not fetched or fetch failed:
- https://observablehq.com/@sahilchinoy/tanaka-contours (HTTP 429)
- https://geospatialstuff.com/posts/2025-11-18-tanaka-30-day-maps-2025-day-18 (redirect page, no content read)
- https://github.com/riatelab/tanaka, https://github.com/kcaylor/topocut, https://www.atomm.com/creativetools/layered-laser-cut-generator

Local test files: /tmp/claude-1000/-home-pkt-ParthPersonal/aaf04bbc-a718-4fb0-a8a4-82dd965e2010/scratchpad/research/rock/t/ (t.svg, chrome3.png, z.js)
