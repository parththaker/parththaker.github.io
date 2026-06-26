import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import GameShelf from '@/components/GameShelf'
import GamingJourney from '@/components/GamingJourney'
import GamingMemories from '@/components/GamingMemories'
import FunFact from '@/components/FunFact'

export const metadata: Metadata = {
  title: 'Hobbies - Parth K. Thaker',
  description:
    'Beyond research — strategic board games, Euro games, and a decade on Board Game Arena.',
  alternates: { canonical: '/hobbies' },
}

const STATS = [
  { n: '794', label: 'Games played', sub: 'on Board Game Arena' },
  { n: '11k+', label: 'Mastery points', sub: 'across strategy games' },
  { n: '133', label: 'Achievements', sub: 'unlocked over the years' },
]

export default function HobbiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Strategic <span className="text-gradient">board games</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          What started as chess with my dad turned into a long-running habit of heavy Euro games.
          Every game is a small optimization problem — which is probably why I never stopped.
        </p>

        <a
          href="https://boardgamearena.com/player?id=85701539"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand mt-7"
        >
          My Board Game Arena profile <ExternalLink className="h-4 w-4" />
        </a>
      </header>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-card/70 px-6 py-7 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-brand">{s.n}</div>
            <div className="mt-1 text-sm font-medium text-foreground/85">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 space-y-16">
        <GamingMemories />
        <FunFact />
        <GameShelf />
        <GamingJourney />
      </div>
    </div>
  )
}
