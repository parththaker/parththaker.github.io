'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'
import landscape from '@/data/expertise-landscape.json'

type Terrain = { c: string; d: string; k?: number; g?: [number, number, number, number] }
type Field = { c: [number, number]; r: number[]; n: number[]; title: string; years: string }
type FieldLabel = { f: string; kind: 'field'; name: string; sub: string; far: [number, number]; near: [number, number]; anchor: 'start' | 'middle' | 'end'; tgt: [number, number] }
type BenchLabel = { f: string; kind: 'bench'; x: number; y: number; name: string; lay: number }
type Item = { slug: string; f: string; fields: string[]; type: string; year?: number | null; name: string; lay: number; layer: string; public: boolean; label: string; href?: string | null; summary?: string | null; authors?: string | null; venue?: string | null }
type Join = { a: string; b: string; layer: string; n: number; of: number; d: string }
type Share = { a: string; b: string; layer: string; n: number; of: number; drawn: boolean }
type Terrace = { f: string; lay: number; d: string }
type Reading = { title: string; year?: number | null; authors?: string | null; url?: string | null; fields: string[] }
type Landscape = {
  W: number; H: number; ZS: number
  cam0: { cx: number; cy: number; s: number }
  layers: string[]
  built: string
  placeholders: string[]
  list_titles: string[]
  terrain: Terrain[]
  joins: Join[]
  shares: Share[]
  terraces: Terrace[]
  hits: { f: string; cx: number; cy: number; r: number }[]
  fields: Record<string, Field>
  labels: (FieldLabel | BenchLabel)[]
  items: Item[]
  reading: Record<string, Record<string, Reading[]>>
}
type Cam = { cx: number; cy: number; s: number }
type JoinSel = { a: string; b: string; layer: string }

const D = landscape as unknown as Landscape
const { W, H, ZS } = D
const HOME: Cam = { cx: D.cam0.cx, cy: D.cam0.cy, s: D.cam0.s }
const ORDER = [...D.layers].reverse()                       // published first, to-read last
const LAY = (layer: string) => D.layers.indexOf(layer) + 1  // 1 = to-read shelf … 5 = published
const SHOW: Record<string, string> = { 'to-read': 'to read' }
const STYLES = [
  { id: 'chipboard', label: 'Chipboard' },
  { id: 'strata', label: 'Strata' },
  { id: 'sandstone', label: 'Sandstone' },
] as const
type StyleId = (typeof STYLES)[number]['id']

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const fieldCam = (f: string): Cam => {
  const F = D.fields[f]
  const span = 2 * F.r[0] + 5 * ZS + 40
  return { cx: F.c[0], cy: F.c[1] - 2 * ZS, s: clamp(Math.max(1.8, H / span), 1.8, 2.9) }
}
const other = (j: { a: string; b: string }, f: string) => (j.a === f ? j.b : j.a)
const joinKey = (a: string, b: string) => [a, b].sort().join('--')

export default function MapOfWork() {
  const [cam, setCam] = React.useState<Cam>(HOME)
  const [view, setView] = React.useState<string | null>(null)          // null = whole map, else a field id
  const [layer, setLayer] = React.useState<string | null>(null)        // the selected terrace of the focused field
  const [openLayers, setOpenLayers] = React.useState<string[]>(['published', 'written'])
  const [join, setJoin] = React.useState<JoinSel | null>(null)
  const [hotF, setHotF] = React.useState<string | null>(null)
  const [hotL, setHotL] = React.useState<string | null>(null)
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [style, setStyleState] = React.useState<StyleId>('strata')
  const [still, setStill] = React.useState(false)
  const raf = React.useRef<number | null>(null)
  const svgRef = React.useRef<SVGSVGElement | null>(null)
  const panelRef = React.useRef<HTMLElement | null>(null)
  const [kScale, setKScale] = React.useState(1)                       // viewBox px per rendered px: keeps labels a constant size on screen
  const camRef = React.useRef(cam)
  camRef.current = cam

  React.useEffect(() => {
    if (location.search.includes('still')) setStill(true)
    try {
      const saved = localStorage.getItem('mapwork-style') as StyleId | null
      if (saved && STYLES.some((s) => s.id === saved)) setStyleState(saved)
    } catch {}
  }, [])
  const setStyle = (s: StyleId) => { setStyleState(s); try { localStorage.setItem('mapwork-style', s) } catch {} }

  React.useEffect(() => {
    const el = svgRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([e]) => { const w = e.contentRect.width; if (w > 0) setKScale(Math.min(1.8, Math.max(1, W / w))) })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {                                              // bring the selected band into view
    if (!layer) return
    const band = document.getElementById(`band-${layer}`), panel = panelRef.current
    if (!band || !panel) return
    if (getComputedStyle(panel).overflowY === 'auto') panel.scrollTo({ top: band.offsetTop - panel.offsetTop, behavior: still ? 'auto' : 'smooth' })
    else if (join || !still) band.scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' })
  }, [layer, join, still])

  // camera tween: one rAF loop, ease-out cubic, instant under reduced motion or in still mode
  const goTo = React.useCallback((target: Cam, ms = 800) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    const reduced = (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) || (typeof location !== 'undefined' && location.search.includes('still'))
    if (reduced || ms === 0) { setCam(target); return }
    const from = { ...camRef.current }, t0 = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2
      setCam({ cx: from.cx + (target.cx - from.cx) * e, cy: from.cy + (target.cy - from.cy) * e, s: from.s + (target.s - from.s) * e })
      if (k < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }, [])

  const setHash = (h: string) => { try { history.replaceState(null, '', h ? `#${h}` : location.pathname + location.search) } catch {} }
  const open = React.useCallback((f: string) => { setView(f); setHotF(f); setHotL(null); setJoin(null); setLayer(null); goTo(fieldCam(f)); setHash(f) }, [goTo])
  const home = React.useCallback(() => { setView(null); setHotF(null); setHotL(null); setLayer(null); setJoin(null); goTo(HOME); setHash('') }, [goTo])
  const toggle = React.useCallback((f: string) => { if (view === f) home(); else open(f) }, [view, home, open])
  /** Select a terrace of the focused field; clicking the selected one again releases it. */
  const pickLayer = React.useCallback((f: string, l: string, keepJoin = false) => {
    if (view !== f) { setView(f); setHotF(f); goTo(fieldCam(f)) }
    if (!keepJoin) setJoin(null)
    if (view === f && layer === l && !keepJoin) { home(); return }
    setLayer(l); setOpenLayers((o) => (o.includes(l) ? o : [...o, l])); setHash(`${f}/${l}`)
  }, [view, layer, goTo, home])
  const pickJoin = React.useCallback((j: { a: string; b: string; layer: string }) => {
    const f = view && (view === j.a || view === j.b) ? view : j.a
    setJoin({ a: j.a, b: j.b, layer: j.layer })
    pickLayer(f, j.layer, true)
    setHash(`${joinKey(j.a, j.b)}/${j.layer}`)
  }, [view, pickLayer])
  const pickItem = React.useCallback((it: Item) => {
    const f = view && it.fields.includes(view) ? view : it.f
    pickLayer(f, it.layer)
    setHash(`${f}/${it.layer}/${it.slug}`)
    setTimeout(() => document.getElementById(`w-${it.slug}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 80)
  }, [view, pickLayer])

  React.useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1))
    if (!h) return
    const id = setTimeout(() => {
      const [head, l, slug] = h.split('/')
      if (head.includes('--')) {
        const [a, b] = head.split('--')
        const j = D.joins.find((x) => joinKey(x.a, x.b) === joinKey(a, b) && x.layer === l) ?? D.shares.find((x) => joinKey(x.a, x.b) === joinKey(a, b) && x.layer === l)
        if (j) pickJoin(j)
        return
      }
      if (!D.fields[head]) return
      open(head)
      if (l && D.layers.includes(l)) setTimeout(() => { setLayer(l); setOpenLayers((o) => (o.includes(l) ? o : [...o, l])) }, 20)
      if (slug) setTimeout(() => document.getElementById(`w-${slug}`)?.scrollIntoView({ block: 'nearest' }), 120)
    }, 60)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !cmdOpen) { if (layer || join) { setLayer(null); setJoin(null); if (view) setHash(view) } else home() }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((o) => !o) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [home, cmdOpen, layer, join, view])

  const sx = (x: number) => W / 2 + (x - cam.cx) * cam.s
  const sy = (y: number) => H / 2 + (y - cam.cy) * cam.s
  const level = view ? 1 : 0
  const progress = clamp((cam.s - HOME.s) / (1.8 - HOME.s), 0, 1)   // 0 at home, 1 at a mesa
  const shelf = D.terrain.filter((p) => p.c === 'shelf')
  const rock = D.terrain.filter((p) => p.c !== 'shelf')
  const listed = view ? D.shares.filter((s) => !s.drawn && (s.a === view || s.b === view)) : []
  const nFields = Object.keys(D.fields).length
  const F = view ? D.fields[view] : null

  return (
    <div className="mapwork" data-style={style} data-z={level} data-still={still || undefined} style={{ ['--k' as string]: kScale }}>
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-end gap-x-3 gap-y-2 font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
          {view && (
            <Button variant="ghost" size="sm" className="mr-auto h-7 gap-1 px-2 font-mono text-[10.5px] tracking-[0.08em] uppercase" onClick={home}>← All fields</Button>
          )}
          <ToggleGroup type="single" size="sm" value={style} onValueChange={(v) => v && setStyle(v as StyleId)} aria-label="Map style" className="gap-1">
            {STYLES.map((s) => (
              <ToggleGroupItem key={s.id} value={s.id} className="h-7 rounded-sm px-2 font-mono text-[10.5px] tracking-[0.08em] uppercase data-[state=on]:bg-transparent data-[state=on]:text-foreground data-[state=on]:underline data-[state=on]:underline-offset-4">{s.label}</ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 font-mono text-[10.5px] tracking-[0.08em] uppercase" onClick={() => setCmdOpen(true)}>
            <Search className="size-3.5" /> Find <Kbd className="h-4 text-[10px]">⌘K</Kbd>
          </Button>
        </div>

        <figure className="m-0">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Terraced plateau of ${nFields} mesas, one per field of work`}
            className="mw-map"
            onClick={(e) => { if (e.target === e.currentTarget || (e.target as Element).id === 'mw-sea') home() }}
          >
            <defs>
              <filter id="grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.14 0.32" numOctaves={2} seed={7} result="n" />
                <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.16 0.12" result="a" />
                <feComposite in="a" in2="SourceAlpha" operator="in" result="g" />
                <feBlend in="SourceGraphic" in2="g" mode="multiply" />
              </filter>
              {(['w', 'e'] as const).map((side) =>
                [2, 3, 4, 5].map((k) => {
                  const hgt = 5 + (k % 3)
                  return (
                    <pattern key={side + k} id={`b${side}${k}`} width={8} height={hgt} patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${(k * 1.3).toFixed(1)})`}>
                      <rect width={8} height={hgt} fill={`var(--r${side}${k})`} />
                      <path d="M0 .5H8" stroke="#000" strokeOpacity={0.16} strokeWidth={0.6} />
                      <path d={`M1 ${(hgt / 2).toFixed(1)}H6`} stroke="#fff" strokeOpacity={0.1} strokeWidth={0.5} />
                      {side === 'e' && <path d={`M5.5 1.6V${(hgt * 0.75).toFixed(1)}`} stroke="#000" strokeOpacity={0.09} strokeWidth={0.6} />}
                    </pattern>
                  )
                })
              )}
              {rock.map((p, i) => p.c === 'shade' && p.g && (
                <linearGradient key={'g' + i} id={`shade${i}`} gradientUnits="userSpaceOnUse" x1={p.g[0]} y1={p.g[1]} x2={p.g[2]} y2={p.g[3]}>
                  <stop offset="0" stopColor="#000" stopOpacity={0} />
                  <stop offset="0.35" stopColor="#000" stopOpacity={0.045} />
                  <stop offset="0.65" stopColor="#000" stopOpacity={0.045} />
                  <stop offset="1" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <rect id="mw-sea" width={W} height={H} fill="var(--sea)" />

            <g transform={`translate(${W / 2 - cam.cx * cam.s} ${H / 2 - cam.cy * cam.s}) scale(${cam.s})`}>
              {shelf.map((p, i) => <path key={'s' + i} className={p.c} d={p.d} />)}
              <g className="rock">{rock.map((p, i) => <path key={'r' + i} className={p.c} d={p.d} fill={p.c === 'shade' ? `url(#shade${i})` : undefined} />)}</g>
              {D.hits.filter((h) => h.f !== view).map((h) => (
                <circle key={h.f} className="hit" cx={h.cx} cy={h.cy} r={h.r}
                  onClick={(e) => { e.stopPropagation(); toggle(h.f) }}
                  onPointerEnter={() => !view && setHotF(h.f)} onPointerLeave={() => !view && setHotF(null)}>
                  <title>{D.fields[h.f].title}</title>
                </circle>
              ))}
              {view && D.terraces.filter((t) => t.f === view).map((t) => {
                const l = D.layers[t.lay - 1]
                const cls = 'tl' + (layer === l && !join ? ' sel' : '') + (hotL === l ? ' hot' : '')
                return (
                  <path key={t.f + t.lay} className={cls} d={t.d}
                    onClick={(e) => { e.stopPropagation(); pickLayer(view, l) }}
                    onPointerEnter={() => setHotL(l)} onPointerLeave={() => setHotL((h) => (h === l ? null : h))}>
                    <title>{`${D.fields[view].title} · ${SHOW[l] ?? l} · ${D.fields[view].n[t.lay - 1]}`}</title>
                  </path>
                )
              })}
              {D.joins.map((j, i) => {
                const sel = join && joinKey(join.a, join.b) === joinKey(j.a, j.b) && join.layer === j.layer
                return (
                  <path key={'j' + i} className={'jn' + (sel ? ' sel' : '')} d={j.d} onClick={(e) => { e.stopPropagation(); pickJoin(j) }}>
                    <title>{`${j.n} ${SHOW[j.layer] ?? j.layer} ${j.n === 1 ? 'entry' : 'entries'} shared by ${D.fields[j.a].title} and ${D.fields[j.b].title}`}</title>
                  </path>
                )
              })}
            </g>

            <g className="lbl">
              {D.labels.map((l, idx) => {
                if (l.kind === 'field') {
                  const kk = view === l.f ? progress : 0
                  const wx = l.far[0] + (l.near[0] - l.far[0]) * kk, wy = l.far[1] + (l.near[1] - l.far[1]) * kk
                  const x = sx(wx), y = sy(wy)
                  const an = kk > 0.5 ? 'middle' : l.anchor
                  const tx = sx(l.tgt[0]), ty = sy(l.tgt[1])
                  const gx = an === 'start' ? x - 4 * kScale : an === 'end' ? x + 4 * kScale : x, gy = an === 'middle' ? y + 4 * kScale : y - 3 * kScale
                  const hot = hotF === l.f, dim = !!view && view !== l.f
                  const click = (e: React.MouseEvent) => { e.stopPropagation(); toggle(l.f) }
                  return (
                    <g key={idx} onPointerEnter={() => !view && setHotF(l.f)} onPointerLeave={() => !view && setHotF(null)}>
                      <path className={'fl' + (hot ? ' hot' : '') + (dim ? ' off' : '')} d={`M${gx} ${gy}L${tx} ${ty}`} style={{ opacity: dim ? 0 : 1 - kk }} />
                      <text className={'fn' + (hot ? ' hot' : '') + (dim ? ' off' : '')} x={x} y={y} textAnchor={an} onClick={click}>{l.name}</text>
                      <text className={'fs' + (dim ? ' off' : '')} x={x} y={y + 11 * kScale} textAnchor={an} onClick={click}>{l.sub}</text>
                    </g>
                  )
                }
                const off = view !== l.f
                const ln = D.layers[l.lay - 1]
                return (
                  <text key={idx} className={'bn' + (off ? ' off' : '') + (layer === ln && !join ? ' hot' : '')} x={sx(l.x)} y={sy(l.y)} textAnchor="middle"
                    onClick={(e) => { e.stopPropagation(); if (view) pickLayer(view, ln) }}>{l.name}</text>
                )
              })}
            </g>
          </svg>
          <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">
            <span aria-live="polite">{view ? `${D.fields[view].title} · click a terrace to open its layer · click it again to return` : 'Click a field.'}</span>
            {listed.length > 0 && (
              <span>{listed.map((s) => `${s.n} ${SHOW[s.layer] ?? s.layer} shared with ${D.fields[other(s, view!)].title} · not drawn`).join(' · ')}</span>
            )}
            <a href="/expertise/method/" className="text-foreground/80 underline-offset-4 hover:underline">How this map is made</a>
          </figcaption>
        </figure>
      </div>

      <div className="mw-below mt-10" key={view ?? 'index'}>
      {!view && (
        <nav className="mw-index" aria-label="Fields">
          {Object.entries(D.fields).map(([id, Fd]) => {
            const counts = ORDER.map((l) => [l, Fd.n[LAY(l) - 1]] as const).filter(([, c]) => c > 0).map(([l, c]) => `${c} ${SHOW[l] ?? l}`).join(' · ')
            return (
              <button key={id} type="button" className={'mw-row' + (hotF === id ? ' hot' : '')} onClick={() => open(id)}
                onPointerEnter={() => setHotF(id)} onPointerLeave={() => setHotF((h) => (h === id ? null : h))}>
                <span className="mw-row-name">{Fd.title}</span>
                <span className="mw-row-years">{Fd.years}</span>
                <span className="mw-row-counts">{counts}</span>
              </button>
            )
          })}
        </nav>
      )}
      {view && F && (
        <aside ref={panelRef} className="mw-panel" aria-label={`${F.title}: the stack`}>
          <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6">
            <h2 className="font-sans text-lg font-semibold tracking-tight">{F.title}</h2>
            <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">{F.years}</p>
          </header>
          {ORDER.map((l) => {
            const k = LAY(l)
            const count = F.n[k - 1]
            const isOpen = openLayers.includes(l) && count > 0
            const sel = layer === l
            const works = D.items.filter((it) => it.layer === l && it.fields.includes(view))
            const shared = join && join.layer === l ? other(join, view) : null
            const ordered = shared ? [...works.filter((w) => w.fields.includes(shared)), ...works.filter((w) => !w.fields.includes(shared))] : works
            const shares = D.shares.filter((s) => s.layer === l && (s.a === view || s.b === view))
            const reading = D.reading[view]?.[l] ?? []
            return (
              <section key={l} id={`band-${l}`} className={'mw-band' + ` mw-l${k}` + (sel ? ' sel' : '') + (count === 0 ? ' empty' : '')}>
                <button type="button" disabled={count === 0} aria-expanded={isOpen} onClick={() => pickLayer(view, l)}
                  onPointerEnter={() => setHotL(l)} onPointerLeave={() => setHotL((h) => (h === l ? null : h))}>
                  <span>{SHOW[l] ?? l} · {count}</span>
                </button>
                {isOpen && (
                  <div className="mw-body">
                    {shared && (
                      <p className="mw-shared font-mono text-[10.5px] tracking-[0.08em] uppercase">
                        {(() => { const n = D.shares.find((s) => s.layer === l && joinKey(s.a, s.b) === joinKey(join!.a, join!.b))?.n ?? 0; return `${n} ${SHOW[l] ?? l} ${n === 1 ? 'entry' : 'entries'} shared with ${D.fields[shared].title}` })()}
                      </p>
                    )}
                    {ordered.map((it) => (
                      <article key={it.slug} id={`w-${it.slug}`} className={'mw-work' + (shared && it.fields.includes(shared) ? ' is-shared' : '')}>
                        {it.public && it.href ? <a href={it.href} className="font-serif text-[15px] leading-snug underline-offset-4 hover:underline">{it.name}</a> : <span className="font-serif text-[15px] leading-snug">{it.name}</span>}
                        <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
                          {[it.year, it.label, it.venue].filter(Boolean).join(' · ')}{!it.public && ' · draft'}
                        </p>
                        {it.fields.length > 1 && (
                          <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">shared with {it.fields.filter((x) => x !== view).map((x) => D.fields[x].title).join(', ')}</p>
                        )}
                      </article>
                    ))}
                    {works.length === 0 && shares.map((s) => (
                      <p key={s.a + s.b} className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">{s.n} shared with {D.fields[other(s, view)].title}</p>
                    ))}
                    {reading.map((r, i) => (
                      <article key={i} className="mw-work">
                        {r.url ? <a href={r.url} className="font-serif text-[15px] leading-snug underline-offset-4 hover:underline" rel="noopener">{r.title}</a> : <span className="font-serif text-[15px] leading-snug">{r.title}</span>}
                        <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">{[r.year, r.authors].filter(Boolean).join(' · ')}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </aside>
      )}
      </div>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen} title="Find a field or a work" description="Type to filter">
        <CommandInput placeholder="Find a field or a work…" />
        <CommandList>
          <CommandEmpty>Nothing matches.</CommandEmpty>
          <CommandGroup heading="Fields">
            {Object.entries(D.fields).map(([id, Fd]) => (
              <CommandItem key={id} value={Fd.title} onSelect={() => { setCmdOpen(false); open(id) }}>
                {Fd.title}<span className="ml-auto font-mono text-[10px] text-muted-foreground">{Fd.n[4] ? `${Fd.n[4]} published` : `${Fd.n[3]} written`} · {Fd.n[2]} read</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Papers, patents, projects and posts">
            {D.items.map((it) => (
              <CommandItem key={it.slug} value={`${it.name} ${it.fields.map((x) => D.fields[x].title).join(' ')}`} onSelect={() => { setCmdOpen(false); pickItem(it) }}>
                {it.name}<span className="ml-auto font-mono text-[10px] text-muted-foreground">{it.label}{it.year ? `, ${it.year}` : ''}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
