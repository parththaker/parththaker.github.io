'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'
import landscape from '@/data/expertise-landscape.json'

type Terrain = { c: string; d: string; k?: number }
type Field = { c: [number, number]; r: number[]; n: number[]; title: string; years: string }
type FieldLabel = { f: string; kind: 'field'; name: string; sub: string; far: [number, number]; near: [number, number]; anchor: 'start' | 'middle' | 'end'; tgt: [number, number] }
type BenchLabel = { f: string; kind: 'bench'; x: number; y: number; name: string; lay: number }
type Item = {
  i: number; f: string; fields: string[]; type: string; year?: number | null; name: string; x: number; y: number; lay: number
  glyph: string; public: boolean; evidence: boolean; label: string; href?: string | null; summary?: string | null; authors?: string | null; venue?: string | null
}
type Share = { a: string; b: string; layer: string; n: number; of: number; drawn: boolean }
type Landscape = {
  W: number; H: number; ZS: number
  cam0: { cx: number; cy: number; s: number }
  built: string
  placeholders: string[]
  terrain: Terrain[]
  shares: Share[]
  hits: { f: string; cx: number; cy: number; r: number }[]
  fields: Record<string, Field>
  labels: (FieldLabel | BenchLabel)[]
  items: Item[]
}
type Cam = { cx: number; cy: number; s: number }

const D = landscape as unknown as Landscape
const { W, H, ZS } = D
const HOME: Cam = { cx: D.cam0.cx, cy: D.cam0.cy, s: D.cam0.s }
const STYLES = [
  { id: 'chipboard', label: 'Chipboard' },
  { id: 'strata', label: 'Strata' },
  { id: 'sandstone', label: 'Sandstone' },
] as const
type StyleId = (typeof STYLES)[number]['id']
const OPEN: Record<string, string> = { paper: 'Open the paper', patent: 'Open the patent', post: 'Open the post', project: 'Open the project', note: 'Open the note', talk: 'Open the talk' }

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const pad = (n: number) => String(n).padStart(2, '0')
const fieldCam = (f: string): Cam => {
  const F = D.fields[f]
  const span = 2 * F.r[0] + 5 * ZS + 40
  return { cx: F.c[0], cy: F.c[1] - 2 * ZS, s: clamp(Math.max(1.8, H / span), 1.8, 2.9) }
}
const titles = (fs: string[]) => fs.map((f) => D.fields[f].title).join(' · ')

/** Flush point symbol in plan: shape from the material config, about 5 px across at the mesa level. */
function Glyph({ shape, x, y, r }: { shape: string; x: number; y: number; r: number }) {
  switch (shape) {
    case 'square': return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} />
    case 'diamond': return <path d={`M${x} ${y - r * 1.3}L${x + r * 1.3} ${y}L${x} ${y + r * 1.3}L${x - r * 1.3} ${y}Z`} />
    case 'triangle': return <path d={`M${x} ${y - r * 1.25}L${x + r * 1.2} ${y + r * 0.9}L${x - r * 1.2} ${y + r * 0.9}Z`} />
    case 'hexagon': return <path d={[0, 1, 2, 3, 4, 5].map((i) => `${i ? 'L' : 'M'}${x + r * 1.15 * Math.cos((Math.PI / 3) * i)} ${y + r * 1.15 * Math.sin((Math.PI / 3) * i)}`).join('') + 'Z'} />
    case 'bar': return <rect x={x - r * 1.4} y={y - r * 0.5} width={2.8 * r} height={r} />
    case 'plus': return <path d={`M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}`} />
    default: return <circle cx={x} cy={y} r={r} />
  }
}

export default function MapOfWork() {
  const [cam, setCam] = React.useState<Cam>(HOME)
  const [view, setView] = React.useState<string | null>(null)          // null = whole map, else a field id
  const [hotF, setHotF] = React.useState<string | null>(null)
  const [hotI, setHotI] = React.useState<number | null>(null)
  const [selected, setSelected] = React.useState<Item | null>(null)
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [style, setStyleState] = React.useState<StyleId>('strata')
  const [still, setStill] = React.useState(false)
  const raf = React.useRef<number | null>(null)
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

  // camera tween: one rAF loop, ease-out cubic, instant under reduced motion or in still mode
  const goTo = React.useCallback((target: Cam, ms = 450) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    const reduced = (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) || (typeof location !== 'undefined' && location.search.includes('still'))
    if (reduced || ms === 0) { setCam(target); return }
    const from = { ...camRef.current }, t0 = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3)
      setCam({ cx: from.cx + (target.cx - from.cx) * e, cy: from.cy + (target.cy - from.cy) * e, s: from.s + (target.s - from.s) * e })
      if (k < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }, [])

  const open = React.useCallback((f: string) => { setView(f); setHotF(f); setHotI(null); goTo(fieldCam(f)) }, [goTo])
  const home = React.useCallback(() => { setView(null); setHotF(null); setHotI(null); setSelected(null); goTo(HOME) }, [goTo])
  const toggle = React.useCallback((f: string) => { if (view === f) home(); else open(f) }, [view, home, open])
  const pick = React.useCallback((it: Item) => { if (!view || !it.fields.includes(view)) open(it.f); setHotI(it.i); setSelected(it) }, [view, open])

  React.useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1))
    if (!h) return
    const id = setTimeout(() => {
      if (D.fields[h]) open(h)
      else if (/^i\d+$/.test(h)) { const it = D.items.find((o) => o.i === Number(h.slice(1))); if (it) pick(it) }
    }, 60)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !cmdOpen) { if (selected) setSelected(null); else home() }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen((o) => !o) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [home, cmdOpen, selected])

  const sx = (x: number) => W / 2 + (x - cam.cx) * cam.s
  const sy = (y: number) => H / 2 + (y - cam.cy) * cam.s
  const level = view ? 1 : 0
  const progress = clamp((cam.s - HOME.s) / (1.8 - HOME.s), 0, 1)   // 0 at home, 1 at a mesa
  const shelf = D.terrain.filter((p) => p.c === 'shelf')
  const rock = D.terrain.filter((p) => p.c !== 'shelf')
  const R = 3.0 // glyph radius in world units
  const hotItem = hotI != null ? D.items.find((o) => o.i === hotI) : undefined
  const listed = view ? D.shares.filter((s) => !s.drawn && (s.a === view || s.b === view)) : []
  const nFields = Object.keys(D.fields).length

  return (
    <div className="mapwork" data-style={style} data-z={level} data-still={still || undefined}>
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
          </defs>
          <rect id="mw-sea" width={W} height={H} fill="var(--sea)" />

          <g transform={`translate(${W / 2 - cam.cx * cam.s} ${H / 2 - cam.cy * cam.s}) scale(${cam.s})`}>
            {shelf.map((p, i) => <path key={'s' + i} className={p.c} d={p.d} />)}
            <g className="rock">{rock.map((p, i) => <path key={'r' + i} className={p.c} d={p.d} />)}</g>
            {D.hits.map((h) => (
              <circle key={h.f} className="hit" cx={h.cx} cy={h.cy} r={h.r}
                onClick={(e) => { e.stopPropagation(); toggle(h.f) }}
                onPointerEnter={() => !view && setHotF(h.f)} onPointerLeave={() => !view && setHotF(null)}>
                <title>{D.fields[h.f].title}</title>
              </circle>
            ))}
            {D.items.map((it) => {
              const on = !!view && it.fields.includes(view)
              const cls = 'mk' + (it.public ? '' : ' draft') + (hotI === it.i ? ' hot' : '') + (on ? '' : ' off')
              return (
                <g key={it.i} className={cls} onClick={(e) => { e.stopPropagation(); if (it.type !== 'overflow') pick(it) }}
                  onPointerEnter={() => on && setHotI(it.i)} onPointerLeave={() => on && hotI === it.i && !selected && setHotI(null)}>
                  <title>{it.type === 'overflow' ? it.name : `${it.name} · ${it.label}${it.year ? `, ${it.year}` : ''}`}</title>
                  <Glyph shape={it.glyph} x={it.x} y={it.y} r={R} />
                  <text className="mn" x={it.x + R + 1.4} y={it.y + 1.4}>{it.type === 'overflow' ? it.name : pad(it.i)}</text>
                </g>
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
                const gx = an === 'start' ? x - 4 : an === 'end' ? x + 4 : x, gy = an === 'middle' ? y + 4 : y - 3
                const hot = hotF === l.f, dim = !!view && view !== l.f
                const click = (e: React.MouseEvent) => { e.stopPropagation(); toggle(l.f) }
                return (
                  <g key={idx} onPointerEnter={() => !view && setHotF(l.f)} onPointerLeave={() => !view && setHotF(null)}>
                    <path className={'fl' + (hot ? ' hot' : '') + (dim ? ' off' : '')} d={`M${gx} ${gy}L${tx} ${ty}`} style={{ opacity: dim ? 0 : 1 - kk }} />
                    <text className={'fn' + (hot ? ' hot' : '') + (dim ? ' off' : '')} x={x} y={y} textAnchor={an} onClick={click}>{l.name}</text>
                    <text className={'fs' + (dim ? ' off' : '')} x={x} y={y + 11} textAnchor={an} onClick={click}>{l.sub}</text>
                  </g>
                )
              }
              const off = view !== l.f
              return <text key={idx} className={'bn' + (off ? ' off' : '')} x={sx(l.x)} y={sy(l.y)} textAnchor="middle">{l.name}</text>
            })}
            {hotItem && view && (
              <text className="it hot" x={sx(hotItem.x)} y={sy(hotItem.y) - 9} textAnchor="middle">{hotItem.name}</text>
            )}
          </g>
        </svg>
        <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">
          <span aria-live="polite">{view ? `${D.fields[view].title} · click a numbered item to open it · click the field again to return` : 'Click a field.'}</span>
          {listed.length > 0 && (
            <span>{listed.map((s) => `${s.n} ${s.layer} shared with ${D.fields[s.a === view ? s.b : s.a].title} · not drawn`).join(' · ')}</span>
          )}
          <a href="/expertise/method/" className="text-foreground/80 underline-offset-4 hover:underline">How this map is made</a>
        </figcaption>
      </figure>

      <Sheet open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); setHotI(null) } }}>
        <SheetContent side="right">
          {selected && (
            <>
              <SheetHeader>
                <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{pad(selected.i)} · {selected.label}{selected.year ? ` · ${selected.year}` : ''} · {titles(selected.fields)}</p>
                <SheetTitle className="font-sans text-lg leading-snug">{selected.name}</SheetTitle>
                {selected.summary && <SheetDescription className="font-serif text-[15px] leading-relaxed text-foreground/80">{selected.summary}</SheetDescription>}
              </SheetHeader>
              <div className="px-4 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                {selected.venue && <p>{selected.venue}</p>}
                {selected.public && selected.href
                  ? <a href={selected.href} className="mt-2 inline-block text-foreground underline underline-offset-4">{OPEN[selected.label] ?? 'Open'}</a>
                  : <p className="mt-2">Draft · not public yet</p>}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen} title="Find a field or an item" description="Type to filter">
        <CommandInput placeholder="Find a field or an item…" />
        <CommandList>
          <CommandEmpty>Nothing matches.</CommandEmpty>
          <CommandGroup heading="Fields">
            {Object.entries(D.fields).map(([id, F]) => (
              <CommandItem key={id} value={F.title} onSelect={() => { setCmdOpen(false); open(id) }}>
                {F.title}<span className="ml-auto font-mono text-[10px] text-muted-foreground">{F.n[4] ? `${F.n[4]} published` : `${F.n[3]} written`} · {F.n[2]} read</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Items">
            {D.items.filter((it) => it.type !== 'overflow').map((it) => (
              <CommandItem key={it.i} value={`${it.name} ${titles(it.fields)}`} onSelect={() => { setCmdOpen(false); pick(it) }}>
                {it.name}<span className="ml-auto font-mono text-[10px] text-muted-foreground">{it.label}{it.year ? `, ${it.year}` : ''}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
