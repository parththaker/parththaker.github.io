import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText, Github, Presentation, Video } from 'lucide-react'
import { getContentBySlug, getAllSlugs, PaperMetadata } from '@/lib/markdown'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('papers').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const paper = await getContentBySlug<PaperMetadata>('papers', slug)
  if (!paper) return {}
  const m = paper.metadata
  return {
    title: `${m.title} - Parth K. Thaker`,
    description: m.oneLiner ?? m.abstract.slice(0, 160),
    alternates: { canonical: `/papers/${slug}` },
    openGraph: { title: m.title, description: m.oneLiner ?? m.abstract.slice(0, 160), type: 'article' },
  }
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params
  const paper = await getContentBySlug<PaperMetadata>('papers', slug)
  if (!paper) notFound()

  const m = paper.metadata
  const note = m.insight ?? m.excitement

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/papers" className="link-underline mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Research
      </Link>

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {m.venue && <span className="chip">{m.venue}</span>}
          <span>
            {new Date(m.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{m.title}</h1>
        <p className="mt-3 text-muted-foreground">{m.authors}</p>

        {m.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.tags.map((t) => (
              <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2.5">
          {m.arxivId && (
            <LinkBtn href={`https://arxiv.org/abs/${m.arxivId}`} icon={<FileText className="h-4 w-4" />}>
              arXiv
            </LinkBtn>
          )}
          {m.doi && (
            <LinkBtn href={`https://doi.org/${m.doi}`} icon={<ExternalLink className="h-4 w-4" />}>
              DOI
            </LinkBtn>
          )}
          {m.codeUrl && (
            <LinkBtn href={m.codeUrl} icon={<Github className="h-4 w-4" />}>
              Code
            </LinkBtn>
          )}
          {m.videoUrl && (
            <LinkBtn href={m.videoUrl} icon={<Video className="h-4 w-4" />}>
              Video
            </LinkBtn>
          )}
          {m.slideUrl && (
            <LinkBtn href={m.slideUrl} icon={<Presentation className="h-4 w-4" />}>
              Slides
            </LinkBtn>
          )}
          {m.posterUrl && (
            <LinkBtn href={m.posterUrl} icon={<FileText className="h-4 w-4" />}>
              Poster
            </LinkBtn>
          )}
        </div>
      </header>

      {note && (
        <div className="mt-10 rounded-2xl border border-brand/25 bg-brand/[0.06] p-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
            Why this mattered
          </div>
          <p className="leading-relaxed text-foreground/90">{note}</p>
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Abstract</h2>
        <p className="mt-3 leading-relaxed text-foreground/85">{m.abstract}</p>
      </section>

      {m.images && m.images.length > 0 && (
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {m.images.map((image, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image src={`/content/images/${image}`} alt={`Figure ${i + 1}`} fill className="object-contain" />
            </div>
          ))}
        </section>
      )}

      {m.simulations && m.simulations.length > 0 && (
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {m.simulations.map((sim, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image src={`/simulations/${sim}`} alt={`Simulation ${i + 1}`} fill className="object-contain" />
            </div>
          ))}
        </section>
      )}

      <div className="prose mt-12" dangerouslySetInnerHTML={{ __html: paper.content }} />
    </article>
  )
}

function LinkBtn({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-4 py-2 text-sm">
      {icon}
      {children}
    </a>
  )
}
