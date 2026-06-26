'use client'

import { usePathname } from 'next/navigation'
import NetworkBackground from './NetworkBackground'

// The animated canvas is a hero flourish, not site chrome — render it only on
// the homepage so article/list pages stay maximally fast.
export default function ConditionalNetwork() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return <NetworkBackground />
}
