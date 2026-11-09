import type { Metadata } from 'next'

import MapOfWork from '@/components/expertise/MapOfWork'
import landscape from '@/data/expertise-landscape.json'
import '@/components/expertise/map.css'

export const metadata: Metadata = {
  title: 'Expertise · Parth K. Thaker',
  description: 'The fields I have worked in, drawn from my reading log and my papers, with every public paper, patent, project and post linked.',
}

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function ExpertisePage() {
  const placeholders = (landscape.placeholders as string[]).length > 0
  return (
    <div className="mx-auto max-w-5xl px-5 pt-6 pb-20">
      <h1 className="sr-only">Expertise</h1>
      <MapOfWork />

      <p className="mt-14 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
        Drawn from my reading log and publication list.{placeholders && ' Reading counts are placeholders until the ledger is filled in.'} Rebuilt {longDate(landscape.built)}.{' '}
        <a href="/expertise/method/" className="text-foreground/80 underline-offset-4 hover:underline">How this map is made</a>
      </p>
    </div>
  )
}
