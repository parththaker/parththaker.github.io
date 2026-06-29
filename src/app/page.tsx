import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from 'lucide-react'
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

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, x: Twitter }
const FOCUS = ['Nonconvex optimization', 'Graph-based bandits', 'Reinforcement learning', 'Secure LLM systems']

function Authors({ s }: { s: string }) {
  return <>{s.split(/(Thaker)/).map((p, i) => (p === 'Thaker' ? <b key={i} className="text-foreground">Thaker</b> : <span key={i}>{p}</span>))}</>
}

export default function Home() {
  const papers = getFeatured<PaperMetadata>('papers', 3)
  const projects = getFeatured<ProjectMetadata>('projects', 2)
  const posts = getAllContent<BlogMetadata>('blogs').slice(0, 3)

  return (
    <>
      {/* ----------------------------------------------------------- HERO */}
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="eyebrow mb-5">AI Research Engineer / Sunnyvale, CA</div>
            <h1 className="whitespace-nowrap text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Parth K. Thaker
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/80">
              Ph.D.-grade <strong className="font-semibold text-foreground">optimization</strong> and{' '}
              <strong className="font-semibold text-foreground">bandit theory</strong>, applied to{' '}
              <strong className="font-semibold text-foreground">secure LLM systems</strong>. Currently building
              privacy-safe LLM workflows at Intuitive Surgical; Ph.D. at ASU on graph-based bandits and
              nonconvex optimization.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span key={f} className="chip">{f}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/papers" className="btn btn-brand">
                View research <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Download className="h-4 w-4" /> Résumé (PDF)
              </a>
            </div>

            <div className="mt-7 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon]
                return (
                  <a key={s.label} href={s.href} target={s.icon === 'mail' ? undefined : '_blank'} rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center border border-border text-foreground/70 transition-colors hover:border-brand hover:text-brand">
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="md:col-span-4">
            <figure>
              <div className="aspect-[4/5] w-full overflow-hidden border border-border bg-card">
                <Image src="/profile_photo.png" alt="Parth K. Thaker" width={400} height={500}
                  className="h-full w-full object-cover object-top" priority />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* § 01 — NOW */}
      <Section num="01" title="Now">
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-foreground/80">
          AI Research Engineer at <b className="font-semibold text-foreground">Intuitive Surgical</b> — building secure,
          privacy-preserving LLM systems: retrieval assistants over internal documents and code, guardrail and
          security analysis for LLM applications, and LLM + CI/CD tooling. Open to AI research engineer roles.
        </p>
      </Section>

      {/* § 02 — TRAJECTORY */}
      <Section num="02" title="Trajectory">
        <CareerTimeline />
      </Section>

      {/* § 03 — SELECTED RESEARCH */}
      <Section num="03" title="Selected research" href="/papers" linkLabel="All papers">
        <ol>
          {papers.map((p, i) => {
            const m = p.metadata
            return (
              <Reveal key={p.slug}>
                <Link href={`/papers/${p.slug}/`}
                  className="index-row items-start grid-cols-[2rem_1fr] gap-y-1 sm:grid-cols-[2.5rem_1fr_8rem]">
                  <span className="index-num tabular">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <div className="font-semibold leading-snug">{m.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground"><Authors s={m.authors} /></div>
                    <div className="mt-1 text-sm text-foreground/70">{m.oneLiner ?? ''}</div>
                  </div>
                  <div className="col-start-2 mt-1 font-mono text-xs text-muted-foreground tabular sm:col-start-3 sm:mt-0 sm:text-right">
                    <div>{m.venue}</div>
                    <div>{new Date(m.date).getFullYear()}</div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ol>
      </Section>

      {/* § 04 — SELECTED PROJECTS */}
      {projects.length > 0 && (
        <Section num="04" title="Selected projects" href="/projects" linkLabel="All projects">
          <ol>
            {projects.map((p, i) => {
              const m = p.metadata
              return (
                <Reveal key={p.slug}>
                  <Link href={`/projects/${p.slug}/`}
                    className="index-row items-start grid-cols-[2rem_1fr] gap-y-1 sm:grid-cols-[2.5rem_1fr_10rem]">
                    <span className="index-num tabular">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <div className="font-semibold leading-snug">{m.title}</div>
                      <div className="mt-1 text-sm text-foreground/70">{m.summary}</div>
                    </div>
                    <div className="col-start-2 mt-1 flex flex-wrap gap-1 sm:col-start-3 sm:mt-0 sm:justify-end">
                      {m.stack?.slice(0, 3).map((s) => (
                        <span key={s} className="font-mono text-[0.68rem] text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </ol>
        </Section>
      )}

      {/* § 05 — WRITING */}
      {posts.length > 0 && (
        <Section num="05" title="Writing" href="/blogs" linkLabel="All writing">
          <ol>
            {posts.map((post) => {
              const m = post.metadata
              return (
                <Reveal key={post.slug}>
                  <Link href={`/blogs/${post.slug}/`}
                    className="index-row items-start grid-cols-[2rem_1fr] gap-y-1 sm:grid-cols-[2.5rem_1fr_7rem]">
                    <span className="index-num tabular">›</span>
                    <div className="min-w-0">
                      <div className="font-semibold leading-snug">{m.title}</div>
                      <div className="mt-1 text-sm text-foreground/70">{m.description}</div>
                    </div>
                    <div className="col-start-2 mt-1 font-mono text-xs text-muted-foreground tabular sm:col-start-3 sm:mt-0 sm:text-right">
                      {new Date(m.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </ol>
        </Section>
      )}
    </>
  )
}

function Section({
  num, title, href, linkLabel, children,
}: {
  num: string; title: string; href?: string; linkLabel?: string; children: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="rule mb-7 flex items-end justify-between gap-4 pt-7">
        <div className="flex items-baseline gap-4">
          <span className="index-num tabular">§ {num}</span>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        {href && linkLabel && (
          <Link href={href} className="link-underline shrink-0 text-sm font-medium text-brand">
            {linkLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
