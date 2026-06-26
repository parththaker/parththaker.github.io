'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DIST = 140
const MOUSE_DIST = 190

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999, active: false }

    const isDark = () => document.documentElement.classList.contains('dark')

    const seedNodes = () => {
      const target = Math.min(
        window.innerWidth < 640 ? 34 : 80,
        Math.floor((width * height) / 18000)
      )
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedNodes()
    }

    const draw = () => {
      const dark = isDark()
      const line = dark ? '150, 138, 255' : '79, 62, 200'
      const dot = dark ? '186, 178, 255' : '90, 74, 210'

      ctx.clearRect(0, 0, width, height)

      // node-to-node links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${line}, ${(1 - d / LINK_DIST) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // links to cursor + dots
      for (const n of nodes) {
        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
          if (d < MOUSE_DIST) {
            ctx.strokeStyle = `rgba(${line}, ${(1 - d / MOUSE_DIST) * 0.5})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${dot}, 0.55)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= width) n.vx *= -1
        if (n.y <= 0 || n.y >= height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        raf = requestAnimationFrame(step)
      }
    }

    resize()
    if (reduced) {
      draw() // single static frame
    } else {
      raf = requestAnimationFrame(step)
      window.addEventListener('mousemove', onMove, { passive: true })
      window.addEventListener('mouseout', onLeave)
      document.addEventListener('visibilitychange', onVisibility)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 print:hidden"
      style={{ opacity: 0.7 }}
    />
  )
}
