import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { SITE, SOCIALS } from '@/lib/site'

const ICONS = { mail: Mail, github: Github, linkedin: Linkedin, x: Twitter }

const COLUMNS = [
  { href: '/papers', label: 'Papers' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Writing' },
  { href: '/ideas', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/hobbies', label: 'Hobbies' },
]

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/70 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="text-base font-semibold tracking-tight">{SITE.name}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SITE.blurb}</p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.icon === 'mail' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
          {COLUMNS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Built with Next.js &amp; Tailwind, deployed on
          GitHub Pages.
        </p>
      </div>
    </footer>
  )
}
