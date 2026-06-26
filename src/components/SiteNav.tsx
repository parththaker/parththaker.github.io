'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const NAV = [
  { href: '/papers', label: 'Papers' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Writing' },
  { href: '/ideas', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/hobbies', label: 'Hobbies' },
]

export default function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md print:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground text-sm font-bold">
            PT
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:inline">
            Parth K. Thaker
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-brand'
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-border" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground/80"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(item.href) ? 'text-brand' : 'text-foreground/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
