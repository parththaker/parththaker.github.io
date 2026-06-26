import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getContentBySlug, getAllSlugs, IdeaMetadata } from '@/lib/markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('ideas').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const idea = await getContentBySlug<IdeaMetadata>('ideas', slug)
  if (!idea) return {}
  const m = idea.metadata
  return {
    title: `${m.title} - Parth K. Thaker`,
    description: m.summary,
    alternates: { canonical: `/ideas/${slug}` },
    openGraph: { title: m.title, description: m.summary, type: 'article' },
  }
}

export default async function IdeaPage({ params }: Props) {
  const { slug } = await params
  const idea = await getContentBySlug<IdeaMetadata>('ideas', slug)
  if (!idea) notFound()

  const m = idea.metadata

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/ideas" className="link-underline mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Notes
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {m.status && <span className="chip capitalize">{m.status}</span>}
          {m.domain && <span className="capitalize">{m.domain}</span>}
          {m.updated && (
            <span>
              · updated{' '}
              {new Date(m.updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight">{m.title}</h1>
        {m.summary && <p className="mt-3 text-lg text-muted-foreground">{m.summary}</p>}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: idea.content }} />
    </article>
  )
}
