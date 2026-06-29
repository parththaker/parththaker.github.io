import type { Metadata } from 'next'
import PrintButton from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'About - Parth K. Thaker',
  description:
    'Parth K. Thaker — AI Research Engineer at Intuitive Surgical, Ph.D. from ASU. Background in nonconvex optimization, bandits, graph theory, and secure LLM systems.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About - Parth K. Thaker',
    description: 'AI Research Engineer at Intuitive Surgical, Ph.D. from ASU.',
    url: 'https://parththaker.github.io/about',
    type: 'profile',
  },
}

const EDUCATION = [
  {
    degree: 'Ph.D., Electrical Engineering',
    org: 'Arizona State University',
    when: 'May 2024',
    where: 'Tempe, AZ',
    note: 'Graph theory and optimization, advised by Prof. Gautam Dasarathy.',
  },
  {
    degree: 'B.Tech + M.Tech (Dual Degree), Electrical Engineering',
    org: 'IIT Madras',
    when: '2016',
    where: 'Chennai, India',
    note: 'Five-year integrated dual degree; specialization in communication systems and signal processing.',
  },
]

const EXPERIENCE = [
  {
    role: 'AI Research Engineer',
    org: 'Intuitive Surgical',
    when: 'Jul 2024 — Present',
    where: 'Sunnyvale, CA',
    note: 'Secure, privacy-safe LLM workflows — document and image assistants, guardrail and security analysis for LLM applications, and LLM + CI/CD tooling — alongside platform and infrastructure work: pipeline performance, cross-region Kubernetes, and operational monitoring.',
  },
  {
    role: 'Ph.D. Researcher — Optimization & Bandits',
    org: 'Arizona State University',
    when: 'Aug 2017 — Jun 2024',
    where: 'Tempe, AZ',
    note: 'Nonconvex optimization, multi-armed bandits, and graph theory with Prof. Gautam Dasarathy — from sample-complexity and landscape analysis for quadratic feasibility to graph-informed pure exploration (GRUB, NeurIPS 2022).',
  },
  {
    role: 'Research Intern',
    org: 'Intuitive Surgical',
    when: 'May — Aug 2023',
    where: 'San Francisco Bay Area',
    note: 'Improved a DINO-based self-supervised video-search system with fine-grained training objectives, raising retrieval quality under limited-label constraints.',
  },
  {
    role: 'Research Intern — Algorithms',
    org: 'Mitsubishi Electric Research Labs (MERL)',
    when: 'May — Aug 2022',
    where: 'Cambridge, MA',
    note: 'Intersection of robotics and bandits for multi-agent resource monitoring under noisy sensing.',
  },
  {
    role: 'Systems Engineer',
    org: 'NetraDyne',
    when: 'Sep 2016 — May 2017',
    where: 'Bengaluru, India',
    note: 'Driver-safety features from mobile sensor and IMU data to analyze driving behavior.',
  },
  {
    role: 'Summer Research Intern',
    org: 'Indian Institute of Science (IISc)',
    when: 'May — Aug 2015',
    where: 'Bangalore, India',
    note: 'Linear bandit algorithms under perturbation (validity of OFUL); a learning algorithm for multi-user bandwidth sharing, analyzed and proven to converge.',
  },
  {
    role: 'Summer Intern',
    org: 'Securifi Embedded Systems',
    when: 'May — Jul 2014',
    where: 'Hyderabad, India',
    note: 'SQL/NoSQL database performance analysis, cloud automation with Cloud-init + Puppet, and embedded-OS driver support on routers.',
  },
  {
    role: 'Engineering Intern',
    org: 'Cisco Systems',
    when: 'May — Jul 2013',
    where: 'Bangalore, India',
    note: 'A lightweight DHCP client (v4/v6) in Python to test BNG session controllers at 1M+ subscriber-session scale, with round-trip latency measurements.',
  },
]

const SKILLS = [
  {
    group: 'Research',
    items: ['Nonconvex optimization', 'Multi-armed bandits', 'Graph theory', 'Reinforcement learning', 'Statistical learning'],
  },
  {
    group: 'Applied & engineering',
    items: ['LLMs & RAG', 'Secure LLM deployment', 'Python', 'Cloud platforms', 'CI/CD tooling'],
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">About</h1>
          <p className="mt-2 text-muted-foreground">Parth K. Thaker · AI Research Engineer</p>
        </div>
        <PrintButton />
      </header>

      <section className="prose mt-8">
        <p>
          I&apos;m an AI Research Engineer at Intuitive Surgical, where I build secure,
          privacy-preserving LLM systems — assistants over internal documents and images,
          guardrails and security analysis for LLM applications, and tooling that brings LLMs into
          CI/CD workflows.
        </p>
        <p>
          Before industry, I did a Ph.D. at Arizona State University with Prof. Gautam Dasarathy,
          working at the intersection of nonconvex optimization, graph theory, and multi-armed
          bandits — from sample-complexity and landscape analysis for quadratic feasibility to
          graph-informed pure exploration (GRUB, NeurIPS 2022). I care about results that are both
          provable and usable, and I try to carry that discipline into the systems I ship today.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Focus</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.group} className="card-surface p-5">
              <div className="text-sm font-semibold">{s.group}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span key={it} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Timeline title="Experience" entries={EXPERIENCE} primaryKey="role" />
      <Timeline title="Education" entries={EDUCATION} primaryKey="degree" />
    </div>
  )
}

type Entry = { when: string; where: string; org: string; note: string; role?: string; degree?: string }

function Timeline({ title, entries, primaryKey }: { title: string; entries: Entry[]; primaryKey: 'role' | 'degree' }) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ol className="relative space-y-7 border-l border-border pl-6">
        {entries.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-semibold">{e[primaryKey]}</h3>
              <span className="text-xs text-muted-foreground">{e.when}</span>
            </div>
            <div className="text-sm text-brand">{e.org}</div>
            <div className="text-xs text-muted-foreground">{e.where}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{e.note}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
