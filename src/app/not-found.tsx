import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="font-mono text-7xl font-bold text-brand">404</div>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Disconnected node</h1>
      <p className="mt-3 text-muted-foreground">
        This page isn&apos;t linked into the graph. The edge you followed leads nowhere.
      </p>
      <Link href="/" className="btn btn-brand mt-8">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  )
}
