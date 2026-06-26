import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getContentBySlug, getAllSlugs, ProjectMetadata } from '@/lib/markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('projects').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getContentBySlug<ProjectMetadata>('projects', slug)
  if (!project) return {}
  const m = project.metadata
  return {
    title: `${m.title} - Parth K. Thaker`,
    description: m.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: m.title, description: m.summary, type: 'article' },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getContentBySlug<ProjectMetadata>('projects', slug)
  if (!project) notFound()

  const m = project.metadata

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/projects" className="link-underline mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Projects
      </Link>

      <header className="mb-10">
        {m.role && <div className="text-xs font-medium uppercase tracking-wide text-brand">{m.role}</div>}
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{m.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{m.summary}</p>

        {m.stack?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        )}

        {m.links && m.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {m.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost px-4 py-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: project.content }} />
    </article>
  )
}
