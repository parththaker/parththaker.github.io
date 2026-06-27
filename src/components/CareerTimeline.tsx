import Link from 'next/link'

// Compact career rail: a single connecting line turns separate facts into one
// trajectory (Gestalt continuity). Horizontal on desktop, vertical spine on
// mobile. Full chronology lives on /about.
const STOPS = [
  { year: '2016', org: 'IIT Madras', role: 'B.Tech + M.Tech', now: false },
  { year: '2022', org: 'MERL', role: 'Research Intern', now: false },
  { year: '2024', org: 'ASU', role: 'Ph.D. — optimization & bandits', now: false },
  { year: 'now', org: 'Intuitive Surgical', role: 'AI Research Engineer', now: true },
]

export default function CareerTimeline() {
  return (
    <div className="relative">
      {/* desktop horizontal line */}
      <div className="absolute left-[12%] right-[12%] top-[7px] hidden h-px bg-border sm:block" />
      {/* mobile vertical spine */}
      <div className="absolute bottom-3 left-[7px] top-3 w-px bg-border sm:hidden" />

      <ol className="grid grid-cols-1 gap-7 sm:grid-cols-4 sm:gap-4">
        {STOPS.map((s) => (
          <li
            key={s.org}
            className="relative flex items-start gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
          >
            <span
              className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-background ${
                s.now ? 'animate-pulse bg-brand' : 'bg-muted-foreground/60'
              }`}
            />
            <div className="sm:mt-3">
              <div
                className={`text-xs font-medium tabular-nums uppercase tracking-wide ${
                  s.now ? 'text-brand' : 'text-muted-foreground'
                }`}
              >
                {s.year}
              </div>
              <div className="mt-0.5 text-sm font-semibold">{s.org}</div>
              <div className="text-xs text-muted-foreground">{s.role}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 text-center sm:mt-7">
        <Link href="/about" className="link-underline text-sm font-medium text-brand">
          Full timeline &amp; CV →
        </Link>
      </div>
    </div>
  )
}
