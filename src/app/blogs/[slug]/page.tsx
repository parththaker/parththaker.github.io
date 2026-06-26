import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getContentBySlug, getAllSlugs, BlogMetadata } from '@/lib/markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('blogs').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getContentBySlug<BlogMetadata>('blogs', slug)
  if (!post) return {}
  const m = post.metadata
  return {
    title: `${m.title} - Parth K. Thaker`,
    description: m.description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: { title: m.title, description: m.description, type: 'article' },
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  const post = await getContentBySlug<BlogMetadata>('blogs', slug)
  if (!post) notFound()

  const m = post.metadata

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/blogs" className="link-underline mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Writing
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time>
            {new Date(m.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {m.readTime && <span>· {m.readTime} min read</span>}
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{m.title}</h1>
        {m.description && <p className="mt-4 text-lg text-muted-foreground">{m.description}</p>}
        {m.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.tags.map((t) => (
              <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
