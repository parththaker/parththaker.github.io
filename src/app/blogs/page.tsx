import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllContent, BlogMetadata } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Writing - Parth K. Thaker',
  description:
    'Technical writing by Parth K. Thaker on optimization, bandits, machine learning, and applied LLM systems.',
  alternates: { canonical: '/blogs' },
  openGraph: {
    title: 'Writing - Parth K. Thaker',
    description: 'Technical writing on optimization, bandits, machine learning, and applied LLM systems.',
    url: 'https://parththaker.github.io/blogs',
    type: 'website',
  },
}

export default function BlogsPage() {
  const posts = getAllContent<BlogMetadata>('blogs')

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Writing</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Notes and deep-dives — bridging theory and the systems I build.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="text-muted-foreground">
            Add <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.md</code> files to{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">content/blogs/</code>.
          </p>
        </div>
      ) : (
        <ol className="space-y-4">
          {posts.map((post) => {
            const m = post.metadata
            return (
              <li key={post.slug}>
                <Link href={`/blogs/${post.slug}`} className="card-surface group block p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>
                      {new Date(m.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {m.readTime && <span>· {m.readTime} min read</span>}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold transition-colors group-hover:text-brand">
                    {m.title}
                  </h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{m.description}</p>
                  {m.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.tags.map((t) => (
                        <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
