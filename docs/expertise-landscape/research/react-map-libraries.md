# React SVG map libs research (2026-11-08)
Numbers: npm registry API (version, publish date), npm downloads API (last-week), bundlephobia API (min+gz INCLUDING dependency tree, not tree-shaken).

## (a) Pan/zoom comparison
| Lib | Version | Published | Weekly DL | min+gz (bundlephobia) | TS types | React 19 | Animated programmatic | Wheel@cursor / pinch | Click vs drag |
|---|---|---|---|---|---|---|---|---|---|
| d3-zoom (+selection, transition) | 3.0.1 / 3.0.1 / 3.0.2 | 2026-11-03 (republish, same versions) | 51M | zoom 17.7k (incl deps), selection 4.3k, transition 10.9k; real tree-shaken total ~ 12-15k | @types/d3-zoom (separate) | framework-agnostic; use refs, no React peer | Yes: selection.transition().duration().call(zoom.transform, zoomIdentity...) , interpolateZoom (van Wijk smooth) built in | Yes / yes (touch) | Built in: clickDistance(), suppresses click after drag beyond threshold |
| panzoom (anvaka) | 9.4.4 | 2026-03-26 | 200k | 6.2k | bundled .d.ts | agnostic, vanilla; no React peer | smoothZoom / moveTo / zoomAbs have animation but easing is fixed-ish, no fit-to-box helper | Yes / yes | Suppresses click after drag via its own handling; less configurable |
| react-zoom-pan-pinch | 4.2.0 | 2026-09-03 | 3.9M | 15.5k | bundled | peer react "*" | Yes: zoomToElement, setTransform(x,y,scale,time,easing) | Yes / yes | Works mostly on HTML wrapper; SVG <g> needs TransformComponent wrapping; click-vs-drag needs manual guard |
| @visx/zoom | 4.0.0 | 2026-06-11 | 308k | 10.7k (incl deps) | bundled | peers react ^18 || ^19 | Matrix state only; no animation, you drive it | Yes / yes | Manual |
| react-svg-pan-zoom | 3.13.1 | 2024-08-15 | 28k | 11.4k | bundled | stale (2 yrs); unverified for 19 | Limited | Yes | Own tool modes; imposes viewer UI |

Not verified: open React 19 issues per library (GitHub search returned nothing useful); real tree-shaken sizes.

Recommendation: d3-zoom + d3-selection (+ d3-transition, d3-interpolate only if smooth zoom-to-fit wanted). Only one with built-in clickDistance, interpolateZoom, wheelDelta/filter/constrain hooks and exact cursor zoom. Keep React out of the transform: d3 writes the `transform` attribute to the <g> directly via ref; React only holds a coarse zoom-tier state (setState only when tier changes).

## (b) Recommended stack and installs
- `npm i d3-zoom d3-selection d3-transition` and `npm i -D @types/d3-zoom @types/d3-selection @types/d3-transition` (add d3-interpolate if using zoomIdentity interpolation manually; d3-transition already pulls it).
- shadcn: `npx shadcn@latest add toggle-group tooltip sheet drawer command dropdown-menu switch button card kbd` (all exist, verified via ui.shadcn.com/r/styles/new-york-v4/<name>.json). Deps: radix-ui (unified package) for toggle-group/tooltip/sheet/dropdown/switch/button; vaul for drawer; cmdk for command (command also pulls dialog). card and kbd have no deps. toggle-group requires toggle (auto-added).
- Theme: `npm i next-themes` (0.4.6, 1.5k gz, React 19 peer ok) OR custom hook.
- Animation: d3-transition (already present) + `window.matchMedia('(prefers-reduced-motion: reduce)')` -> duration 0.

## (c) Minimal pattern
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";
import "d3-transition";

const W = 900, H = 520;
const tier = (k: number) => (k < 1.8 ? 0 : k < 4 ? 1 : 2);

export function Map({ children }: { children: React.ReactNode }) {
  const svg = useRef<SVGSVGElement>(null);
  const cam = useRef<SVGGElement>(null);
  const zb = useRef<ZoomBehavior<SVGSVGElement, unknown>>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const s = select(svg.current!);
    const z = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12]).translateExtent([[0, 0], [W, H]])
      .clickDistance(4)
      .on("zoom", (e) => {
        cam.current!.setAttribute("transform", e.transform.toString());
        setT(tier(e.transform.k)); // bails out when unchanged
      });
    zb.current = z; s.call(z).on("dblclick.zoom", null);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && flyTo();
    window.addEventListener("keydown", esc);
    return () => { s.on(".zoom", null); window.removeEventListener("keydown", esc); };
  }, []);

  // fit bbox [x0,y0,x1,y1] in viewBox units; no arg = reset
  function flyTo(b?: [number, number, number, number], pad = 40) {
    const s = select(svg.current!);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tr = zoomIdentity;
    if (b) {
      const k = Math.min(12, Math.min(W / (b[2] - b[0] + pad), H / (b[3] - b[1] + pad)));
      tr = zoomIdentity.translate(W / 2, H / 2).scale(k)
        .translate(-(b[0] + b[2]) / 2, -(b[1] + b[3]) / 2);
    }
    s.transition().duration(reduce ? 0 : 750).call(zb.current!.transform, tr);
  }
  return (
    <svg ref={svg} viewBox={`0 0 ${W} ${H}`} data-tier={t} className="touch-none">
      <g ref={cam}>{children}</g>
    </svg>
  ); // CSS: [data-tier="0"] .l2,.l3{display:none} etc; children onClick call flyTo(bbox)
}
```
Notes: SSR renders untransformed <g> (static map visible); labels tiers via CSS on data-tier, so zero React re-renders per frame. For SSR default tier, render data-tier=0. Export flyTo through a ref/context for caption clicks and command palette. Use `getBBox()` or prebaked bboxes from build script. Counter-scale labels with `vector-effect`/ font-size = base / k via CSS var set on svg in the zoom handler.

## (d) Notes Q3-Q6
- Q3: next-themes 0.4.6 (2025-03-11, 34M/wk, 1.5k gz) supports App Router, class attribute (`attribute="class"`), React 19 in peers; works with static export (inline script prevents flash; wrap in client provider, `suppressHydrationWarning` on <html>). Caveat: last publish is 8 months old (unverified issues). Since site already has a .dark toggle, don't replace it; the style switcher (3 styles) persistence is a 10-line hook: localStorage + `data-style` attr on <html>, set by a tiny inline <script> in layout head to avoid flash. Recommend: keep existing theme toggle; custom hook for style; skip next-themes unless existing toggle is flawed.
- Q4: d3-transition (11k gz, already needed, interpolateZoom gives van Wijk flight) is best for camera. motion 14.10.1 is 61k gz bundlephobia (LazyMotion/`animate` mini ~ 2-3k claimed but unverified) - overkill. Hand rAF is ~15 lines but you lose interrupt-safe interplay with d3-zoom's internal transform state; if you animate by hand you must call `svg.call(zb.transform, tr)` every frame anyway. Reduced motion: duration 0 as above; also CSS `@media (prefers-reduced-motion)` for panel transitions (tw-animate-css respects via motion-reduce: variants).
- Q5: d3-labeler (1.0.0, 2018, 70 dl/wk) and labella (1.1.4, 2017, 5k dl/wk, 6.8k gz, 1-D timeline labels) are abandoned; neither fits 3 tiers. With seven mesas and a fixed map, hand-placed anchors + tier tags in the build script, with a build-time bbox overlap assertion test, is sufficient. If you want auto, run simulated-annealing in the build script only (never shipped).
- Q6: react-simple-maps 5.0.5 (2026-09-12, 1.4M/wk, 33k gz) ZoomableGroup wraps d3-zoom around a <g> - confirms the pattern; it re-renders React on every zoom (avoid). Copy: d3-zoom on svg, transform on <g>, translateExtent/scaleExtent, counter-scaled stroke (`vector-effect: non-scaling-stroke`) and marker sizes by 1/k. visx zoom example: matrix state, TS. Observable Plot has no zoom. Not verified in detail: anvaka's Map of GitHub internals (uses its own WebGL, not SVG).

## shadcn / Tailwind v4 notes
- shadcn CLI latest 4.23.0 (2026-10-27, npm "shadcn"); registry `new-york-v4` is the Tailwind v4 + React 19 style (ui.shadcn.com/docs/tailwind-v4: React 19, no forwardRef, data-slot attrs). `radix-ui` unified package 1.8.1 (bundlephobia 74k gz whole package; tree-shakes per primitive). Existing @radix-ui/react-slot coexists; fine to migrate.
- Gotchas for static export: all components are client-side, add "use client" already in generated files; no server APIs involved. Drawer depends on vaul (extra dep; skip drawer and use sheet with side="bottom" for mobile to save ~weight). Command palette: cmdk 1.1.1 (16.7k gz incl deps) - lazy-load via next/dynamic({ssr:false}) opened on Ctrl/Cmd-K to keep initial JS small. Tooltip needs TooltipProvider. Existing components.json style may be "default"/older; check `style` field before add (CLI may overwrite button.tsx: answer no or diff).
- Unverified: CLI-v3 vs v4 naming (npm latest is 4.23.0, so "CLI v3" is outdated); kbd component existence verified in registry JSON.

## (e) URLs fetched
https://registry.npmjs.org/<pkg> for d3-zoom d3-selection d3-transition panzoom react-zoom-pan-pinch @visx/zoom react-svg-pan-zoom next-themes motion framer-motion cmdk shadcn radix-ui d3-labeler labella react-simple-maps d3-interpolate
https://api.npmjs.org/downloads/point/last-week/<pkg>
https://bundlephobia.com/api/size?package=<pkg> (failed for shadcn)
https://ui.shadcn.com/r/styles/new-york-v4/{toggle-group,tooltip,sheet,drawer,command,dropdown-menu,switch,button,card,kbd}.json
https://ui.shadcn.com/docs/tailwind-v4 , https://ui.shadcn.com/docs/components/radix/drawer
https://raw.githubusercontent.com/d3/d3-zoom/main/README.md
https://api.github.com/repos/anvaka/panzoom/issues , GitHub search issues for react-zoom-pan-pinch (no useful output)
No web search done; the code pattern was not executed/type-checked.
