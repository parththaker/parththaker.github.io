'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodes: Node[] = []
      const nodeCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 15000))
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: []
        })
      }

      // Create connections
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * nodes.length)
          if (targetIndex !== i && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex)
          }
        }
      })

      nodesRef.current = nodes
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const nodes = nodesRef.current
      
      // Update positions
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1
      nodes.forEach((node) => {
        node.connections.forEach(targetIndex => {
          if (targetIndex < nodes.length) {
            const target = nodes[targetIndex]
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            )
            
            if (distance < 200) {
              const opacity = (1 - distance / 200) * 0.3
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(100, 116, 139, 0.4)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Pulsing effect
        const pulseRadius = 3 + Math.sin(Date.now() * 0.002 + node.x * 0.01) * 1
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createNodes()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createNodes()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}