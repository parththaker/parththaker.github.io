import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, FileText, Github } from 'lucide-react'
import { getAllContent, PaperMetadata } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Research Papers - Parth K. Thaker',
  description:
    'Research papers by Parth K. Thaker on graph theory, nonconvex optimization, bandit learning, and machine learning. Published work from ASU and industry research.',
  alternates: { canonical: '/papers' },
  openGraph: {
    title: 'Research Papers - Parth K. Thaker',
    description:
      'Research papers by Parth K. Thaker on graph theory, nonconvex optimization, bandit learning, and machine learning.',
    url: 'https://parththaker.github.io/papers',
    type: 'website',
  },
}

export default function PapersPage() {
  const papers = getAllContent<PaperMetadata>('papers')

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Research</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Peer-reviewed papers and preprints in optimization, bandits, and graph theory. Where the
          code is public, it&apos;s linked directly.
        </p>
      </header>

      {papers.length === 0 ? (
        <EmptyState />
      ) : (
        <ol className="space-y-4">
          {papers.map((paper) => {
            const m = paper.metadata
            const authors =
              m.authors.split(', ').length > 4
                ? m.authors.split(', ').slice(0, 4).join(', ') + ' et al.'
                : m.authors
            return (
              <li key={paper.slug}>
                <article className="card-surface p-6">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {m.venue && <span className="chip">{m.venue}</span>}
                    <span>{new Date(m.date).getFullYear()}</span>
                  </div>
                  <Link href={`/papers/${paper.slug}`} className="group">
                    <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-brand">
                      {m.title}
                    </h2>
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{authors}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                    {m.oneLiner ?? m.abstract.slice(0, 240) + '…'}
                  </p>

                  {m.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.tags.map((t) => (
                        <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
                    {m.arxivId && (
                      <PaperLink href={`https://arxiv.org/abs/${m.arxivId}`} icon={<FileText className="h-3.5 w-3.5" />}>
                        arXiv:{m.arxivId}
                      </PaperLink>
                    )}
                    {m.doi && (
                      <PaperLink href={`https://doi.org/${m.doi}`} icon={<ExternalLink className="h-3.5 w-3.5" />}>
                        DOI
                      </PaperLink>
                    )}
                    {m.codeUrl && (
                      <PaperLink href={m.codeUrl} icon={<Github className="h-3.5 w-3.5" />}>
                        Code
                      </PaperLink>
                    )}
                    <Link
                      href={`/papers/${paper.slug}`}
                      className="ml-auto inline-flex items-center gap-1 font-medium text-brand"
                    >
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

function PaperLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand"
    >
      {icon}
      {children}
    </a>
  )
}

function EmptyState() {
  return (
    <div className="card-surface p-10 text-center">
      <p className="text-muted-foreground">
        Add <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.md</code> files to{' '}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">content/papers/</code> to publish.
      </p>
    </div>
  )
}
