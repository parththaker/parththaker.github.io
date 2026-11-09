import type { Metadata } from 'next'

import MapOfWork from '@/components/expertise/MapOfWork'
import landscape from '@/data/expertise-landscape.json'
import '@/components/expertise/map.css'

export const metadata: Metadata = {
  title: 'Work · Parth K. Thaker',
  description: 'The fields I have worked in, drawn from my reading log and my papers, with every public paper, patent, project and post linked.',
}

type Field = { c: [number, number]; r: number[]; n: number[]; title: string; years: string }
type Item = { slug: string; f: string; fields: string[]; type: string; year?: number | null; name: string; layer: string; public: boolean; label: string; href?: string | null }

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function ExpertisePage() {
  const fields = landscape.fields as unknown as Record<string, Field>
  const rows = landscape.items as unknown as Item[]
  const placeholders = (landscape.placeholders as string[]).length > 0
  return (
    <div className="mx-auto max-w-5xl px-5 pt-6 pb-20">
      <h1 className="sr-only">Work</h1>
      <MapOfWork />

      <section className="mt-14" aria-labelledby="public-work">
        <h2 id="public-work" className="font-sans text-xl font-semibold tracking-tight">Papers, patents, projects and posts</h2>
        <table className="mt-4 w-full border-collapse text-[15px]">
          <thead>
            <tr className="border-b border-border font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
              <th className="py-2 pr-4 text-left font-medium">Year</th>
              <th className="py-2 pr-4 text-left font-medium">Item</th>
              <th className="py-2 pr-4 text-left font-medium">Type</th>
              <th className="py-2 text-left font-medium">Field</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((it) => (
              <tr key={it.slug} id={`row-${it.slug}`} className="border-b border-border/60 align-baseline">
                <td className="py-2 pr-4 font-mono text-[12px] tabular-nums">{it.year ?? ''}</td>
                <td className="py-2 pr-4 font-serif">
                  {it.public && it.href ? <a href={it.href} className="underline-offset-4 hover:underline">{it.name}</a> : it.name}
                  {!it.public && <span className="ml-2 font-mono text-[10px] tracking-[0.06em] text-muted-foreground uppercase">draft</span>}
                </td>
                <td className="py-2 pr-4 font-mono text-[10.5px] tracking-[0.06em] text-muted-foreground uppercase">{it.label}</td>
                <td className="py-2 font-mono text-[10.5px] tracking-[0.06em] text-muted-foreground uppercase">
                  {it.fields.map((f, i) => (
                    <span key={f}>{i > 0 && ' · '}<a href={`/expertise/#${f}/${it.layer}/${it.slug}`} className="underline-offset-4 hover:underline" title="Show on the map">{fields[f].title}</a></span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-14 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
        Drawn from my reading log and publication list.{placeholders && ' Reading counts are placeholders until the ledger is filled in.'} Rebuilt {longDate(landscape.built)}.{' '}
        <a href="/expertise/method/" className="text-foreground/80 underline-offset-4 hover:underline">How this map is made</a>
      </p>
    </div>
  )
}
