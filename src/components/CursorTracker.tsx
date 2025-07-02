'use client'

import { useEffect, useRef } from 'react'

export default function CursorTracker() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 6}px`
      cursor.style.top = `${e.clientY - 6}px`
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Simple custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 pointer-events-none z-[10000] rounded-full"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          transition: 'transform 0.1s ease',
        }}
      />
      
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}