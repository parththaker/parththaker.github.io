'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'

// A subtle "magnetic" pull on the single primary CTA. Pure transform (GPU),
// and disabled on touch / coarse pointers and for prefers-reduced-motion.
export default function MagneticButton({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </Link>
  )
}
