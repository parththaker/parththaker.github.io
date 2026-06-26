'use client'

import { useEffect, useState } from 'react'

export default function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cycle = setInterval(() => {
      setShow(false)
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setShow(true)
      }, 280)
      return () => clearTimeout(swap)
    }, 2600)
    return () => clearInterval(cycle)
  }, [items.length])

  return (
    <span
      className="font-mono text-brand transition-opacity duration-300"
      style={{ opacity: show ? 1 : 0 }}
    >
      {items[index]}
    </span>
  )
}
