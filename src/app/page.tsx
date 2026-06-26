import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
import {
  getFeatured,
  getAllContent,
  type PaperMetadata,
  type ProjectMetadata,
  type BlogMetadata,
} from '@/lib/markdown'
import { SOCIALS } from '@/lib/site'
import Reveal from '@/components/Reveal'
import CareerTimeline from '@/components/CareerTimeline'
import MagneticButton from '@/components/MagneticButton'

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, x: Twitter }

const FOCUS = [
  'Nonconvex optimization',
  'Graph-based bandits',
  'Reinforcement learning',
  'Secure LLM systems',
]

const VENUES = ['NeurIPS', 'ECCV', 'ICASSP', 'ISIT']

export default function Home() {
  const papers = getFeatured<PaperMetadata>('papers', 3)
  const projects = getFeatured<ProjectMetadata>('projects', 2)
  const posts = getAllContent<BlogMetadata>('blogs').slice(0, 3)
  const paperCount = getAllContent('papers').length

  const [featured, ...restPapers] = papers

  return (
    <>
      {/* ----------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden">
        <div className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-16 md:pt-24 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Open to AI research engineer roles
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Parth K. Thaker
            </h1>
            <p className="mt-3 text-base font-medium text-muted-foreground">AI Research Engineer</p>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-snug text-foreground">
              Ph.D.-grade optimization and bandit theory, applied to secure LLM systems.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-foreground/80">
              Currently building <strong className="font-semibold text-foreground">privacy-safe LLM
              workflows</strong> at Intuitive Surgical. Before that, a Ph.D. at ASU on{' '}
              <strong className="font-semibold text-foreground">graph-based bandits</strong> and{' '}
              <strong className="font-semibold text-foreground">nonconvex optimization</strong>, with
              research at MERL and IISc.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span key={f} className="chip">
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="/papers" className="btn btn-brand">
                View research <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Download className="h-4 w-4" /> Résumé (PDF)
              </a>
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
            <figure className="mx-auto w-fit">
              <div className="relative aspect-[4/5] w-[260px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:w-[320px]">
                <Image
                  src="/profile_photo.png"
                  alt="Parth K. Thaker — AI Research Engineer"
                  fill
                  sizes="(max-width: 640px) 260px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-muted-foreground">
                <span className="font-medium text-brand">Now</span> — AI Research Engineer @ Intuitive
                Surgical
              </figcaption>
            </figure>
          </div>
        </div>

        {/* proof band: borrowed credibility + honest counts */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 px-6 py-6 backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-8">
            <span className="eyebrow">Published at</span>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium">
              {VENUES.map((v) => (
                <span key={v} className="venue-mark">
                  {v}
                </span>
              ))}
            </div>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-sm tabular-nums text-muted-foreground">
              {paperCount} papers · 1 patent · open-source code
            </span>
          </div>
        </div>

        {/* career timeline */}
        <div className="mx-auto max-w-3xl px-6 py-12">
          <CareerTimeline />
        </div>

        {/* scroll cue */}
        <div className="flex justify-center pb-6">
          <a
            href="#research"
            aria-label="Jump to research"
            className="scroll-cue grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
          >
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ------------------------------------------------- SELECTED RESEARCH */}
      {featured && (
        <Section id="research" index="01" eyebrow="Research" title="Selected research" href="/papers" linkLabel="All papers">
          <Reveal>
            <Link
              href={`/papers/${featured.slug}`}
              className="card-surface group block border-brand/30 p-6 sm:p-8"
            >
              <PaperMeta m={featured.metadata} />
              <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-brand sm:text-2xl">
                {featured.metadata.title}
              </h3>
              <p className="mt-3 max-w-3xl text-[0.975rem] leading-relaxed text-foreground/80">
                {featured.metadata.oneLiner ?? featured.metadata.abstract}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Read the paper{' '}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          {restPapers.length > 0 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {restPapers.map((p, i) => (
                <Reveal key={p.slug} delay={(i + 1) * 80}>
                  <Link href={`/papers/${p.slug}`} className="card-surface group flex h-full flex-col p-5">
                    <PaperMeta m={p.metadata} />
                    <h3 className="mt-2 font-semibold leading-snug transition-colors group-hover:text-brand">
                      {p.metadata.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-foreground/75">
                      {p.metadata.oneLiner ?? p.metadata.abstract}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ----------------------------------------------- SELECTED PROJECTS */}
      {projects.length > 0 && (
        <Section index="02" eyebrow="Projects" title="Selected projects" href="/projects" linkLabel="All projects">
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/projects/${p.slug}`} className="card-surface group flex h-full flex-col p-6">
                  {p.metadata.role && (
                    <div className="eyebrow mb-2 text-[0.7rem]">{p.metadata.role}</div>
                  )}
                  <h3 className="font-semibold leading-snug transition-colors group-hover:text-brand">
                    {p.metadata.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-foreground/75">{p.metadata.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.metadata.stack?.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* -------------------------------------------------- LATEST WRITING */}
      {posts.length > 0 && (
        <Section index="03" eyebrow="Writing" title="Latest writing" href="/blogs" linkLabel="All writing">
          <div className="grid gap-4">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="card-surface group flex items-center justify-between gap-4 p-5"
                >
                  <div>
                    <h3 className="font-semibold transition-colors group-hover:text-brand">
                      {post.metadata.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/75">
                      {post.metadata.description}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

function PaperMeta({ m }: { m: PaperMetadata }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
      {m.venue && <span className="chip">{m.venue}</span>}
      <span className="tabular-nums">{new Date(m.date).getFullYear()}</span>
      {m.codeUrl && (
        <span className="inline-flex items-center gap-1">
          <Github className="h-3 w-3" /> Code
        </span>
      )}
      {m.arxivId && <span>arXiv</span>}
    </div>
  )
}

function Section({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  children,
}: {
  id?: string
  index: string
  eyebrow: string
  title: string
  subtitle?: string
  href: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow">
            {index} — {eyebrow}
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link href={href} className="link-underline shrink-0 text-sm font-medium text-brand">
          {linkLabel} →
        </Link>
      </div>
      {children}
    </section>
  )
}
