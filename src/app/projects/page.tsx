import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllContent, ProjectMetadata } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Projects - Parth K. Thaker',
  description:
    'Applied and engineering projects by Parth K. Thaker — open-source research code, secure LLM systems, and cloud tooling.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects - Parth K. Thaker',
    description: 'Applied and engineering projects — open-source research code, secure LLM systems, and cloud tooling.',
    url: 'https://parththaker.github.io/projects',
    type: 'website',
  },
}

export default function ProjectsPage() {
  const projects = getAllContent<ProjectMetadata>('projects')

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Case studies — problem, approach, and outcome — across research code and applied systems.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="text-muted-foreground">
            Add <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.md</code> files to{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">content/projects/</code> (see{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">_template.md</code>).
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            const m = project.metadata
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="card-surface group flex flex-col p-6">
                {m.role && (
                  <div className="mb-2 text-xs font-medium uppercase tracking-wide text-brand">{m.role}</div>
                )}
                <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                  {m.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.stack?.map((s) => (
                    <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Case study <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
