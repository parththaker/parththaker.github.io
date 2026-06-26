import { Metadata } from 'next'
import Link from 'next/link'
import { getAllContent, IdeaMetadata } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Notes - Parth K. Thaker',
  description:
    'A working knowledge garden — research threads and engineering notes by Parth K. Thaker, finished or in progress.',
  alternates: { canonical: '/ideas' },
  openGraph: {
    title: 'Notes - Parth K. Thaker',
    description: 'A working knowledge garden — research threads and engineering notes, finished or in progress.',
    url: 'https://parththaker.github.io/ideas',
    type: 'website',
  },
}

const STATUS_LABEL: Record<string, string> = {
  seed: 'Seed',
  growing: 'Growing',
  evergreen: 'Evergreen',
}

export default function IdeasPage() {
  const ideas = getAllContent<IdeaMetadata>('ideas')

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Notes</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A working garden of research threads and engineering notes — some finished, some still
          taking shape.
        </p>
      </header>

      {ideas.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="text-muted-foreground">
            Add <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.md</code> files to{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">content/ideas/</code> (see{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">_template.md</code>).
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {ideas.map((idea) => {
            const m = idea.metadata
            return (
              <li key={idea.slug}>
                <Link href={`/ideas/${idea.slug}`} className="card-surface group block p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {m.status && <span className="chip">{STATUS_LABEL[m.status] ?? m.status}</span>}
                    {m.domain && <span className="capitalize">{m.domain}</span>}
                  </div>
                  <h2 className="mt-2 font-semibold transition-colors group-hover:text-brand">{m.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
