import Link from 'next/link'

const STOPS = [
  { year: '2016', org: 'IIT Madras', role: 'B.Tech + M.Tech', now: false },
  { year: '2022', org: 'MERL', role: 'Research Intern', now: false },
  { year: '2023', org: 'Intuitive Surgical', role: 'Research Intern', now: false },
  { year: '2024', org: 'ASU', role: 'Ph.D. — optimization & bandits', now: false },
  { year: 'NOW', org: 'Intuitive Surgical', role: 'AI Research Engineer', now: true },
]

export default function CareerTimeline() {
  return (
    <div className="relative">
      {/* desktop: horizontal hairline through the nodes */}
      <div className="absolute left-1 right-1 top-[5px] hidden h-px bg-border sm:block" />
      {/* mobile: vertical hairline spine */}
      <div className="absolute bottom-2 left-[4px] top-2 w-px bg-border sm:hidden" />

      <ol className="grid grid-cols-1 gap-7 sm:grid-cols-5 sm:gap-5">
        {STOPS.map((s) => (
          <li key={`${s.year}-${s.org}`} className="relative flex items-start gap-4 sm:block">
            {/* square node — Swiss geometric; red = now */}
            <span
              className={`mt-0.5 block h-2.5 w-2.5 shrink-0 ring-4 ring-background ${
                s.now ? 'bg-brand' : 'bg-foreground/70'
              }`}
            />
            <div className="sm:mt-4">
              <div
                className={`font-mono text-xs font-medium tabular ${
                  s.now ? 'text-brand' : 'text-muted-foreground'
                }`}
              >
                {s.year}
              </div>
              <div className="mt-1 text-sm font-semibold leading-snug">{s.org}</div>
              <div className="text-xs text-muted-foreground">{s.role}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-7">
        <Link href="/about" className="link-underline text-sm text-brand">
          Full trajectory &amp; CV →
        </Link>
      </div>
    </div>
  )
}
