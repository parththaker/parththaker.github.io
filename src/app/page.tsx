import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import {
  getFeatured,
  getAllContent,
  type PaperMetadata,
  type ProjectMetadata,
  type BlogMetadata,
} from '@/lib/markdown'
import { SOCIALS } from '@/lib/site'
import RotatingText from '@/components/RotatingText'
import Reveal from '@/components/Reveal'

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, x: Twitter }

const FOCUS = [
  'Nonconvex optimization',
  'Graph-based bandits',
  'Reinforcement learning',
  'Secure LLM systems',
]

const FACTS = [
  { k: 'Now', v: 'AI Research Engineer · Intuitive Surgical' },
  { k: 'Ph.D.', v: 'Electrical Engineering · ASU, 2024' },
  { k: 'Earlier', v: 'B.Tech / M.Tech · IIT Madras' },
]

export default function Home() {
  const papers = getFeatured<PaperMetadata>('papers', 3)
  const projects = getFeatured<ProjectMetadata>('projects', 2)
  const posts = getAllContent<BlogMetadata>('blogs').slice(0, 2)

  return (
    <>
      {/* ----------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden">
        <div className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 md:pt-24 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              Open to AI research engineer roles
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-gradient">Parth K. Thaker</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
              AI Research Engineer working on{' '}
              <RotatingText items={FOCUS} />
            </p>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
              I apply optimization and bandit theory from my Ph.D. to building secure, applied
              LLM systems. Currently working on privacy-safe LLM workflows at Intuitive
              Surgical; previously research on graph-based bandits and nonconvex optimization at
              ASU, MERL, and IISc.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/papers" className="btn btn-brand">
                View research <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="btn btn-ghost">
                Projects
              </Link>
              <Link href="/blogs" className="btn btn-ghost">
                Writing
              </Link>
              <Link href="/about" className="btn btn-ghost">
                <FileText className="h-4 w-4" /> About / CV
              </Link>
            </div>

            <div className="mt-8 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === 'mail' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative mx-auto w-fit">
              <div className="brand-glow absolute -inset-6 -z-10 rounded-full opacity-70" />
              <div className="relative mx-auto aspect-[4/5] w-[260px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:w-[320px]">
                <Image
                  src="/profile_photo.png"
                  alt="Parth K. Thaker — AI Research Engineer"
                  fill
                  sizes="(max-width: 640px) 260px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* credibility strip */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-card/70 px-5 py-4 backdrop-blur-sm">
                <div className="text-xs font-medium uppercase tracking-wide text-brand">{f.k}</div>
                <div className="mt-1 text-sm text-foreground/85">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- FEATURED PAPERS */}
      {papers.length > 0 && (
        <Section
          title="Selected research"
          href="/papers"
          linkLabel="All papers"
          subtitle="Optimization, bandits, and graph theory — several with open-source code."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {papers.map((p, i) => {
              const m = p.metadata
              return (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={`/papers/${p.slug}`} className="card-surface flex h-full flex-col p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      {m.venue && <span className="chip">{m.venue}</span>}
                    </div>
                    <h3 className="font-semibold leading-snug">{m.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                      {m.oneLiner ?? m.abstract}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Section>
      )}

      {/* ----------------------------------------------- FEATURED PROJECTS */}
      {projects.length > 0 && (
        <Section
          title="Selected projects"
          href="/projects"
          linkLabel="All projects"
          subtitle="Applied systems — from open-source research code to secure LLM tooling."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => {
              const m = p.metadata
              return (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={`/projects/${p.slug}`} className="card-surface flex h-full flex-col p-6">
                    <h3 className="font-semibold leading-snug">{m.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.stack?.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Section>
      )}

      {/* -------------------------------------------------- LATEST WRITING */}
      {posts.length > 0 && (
        <Section title="Latest writing" href="/blogs" linkLabel="All writing">
          <div className="grid gap-4">
            {posts.map((post) => {
              const m = post.metadata
              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="card-surface flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-brand sm:block" />
                </Link>
              )
            })}
          </div>
        </Section>
      )}
    </>
  )
}

function Section({
  title,
  subtitle,
  href,
  linkLabel,
  children,
}: {
  title: string
  subtitle?: string
  href: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link
          href={href}
          className="link-underline shrink-0 text-sm font-medium text-brand"
        >
          {linkLabel} →
        </Link>
      </div>
      {children}
    </section>
  )
}
