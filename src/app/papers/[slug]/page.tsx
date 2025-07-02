import { notFound } from 'next/navigation'
import { getContentBySlug, getAllSlugs, PaperMetadata } from '@/lib/markdown'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('papers')
  return slugs.map((slug) => ({ slug }))
}

export default async function PaperPage({ params }: Props) {
  const paper = await getContentBySlug('papers', params.slug)
  
  if (!paper) {
    notFound()
  }
  
  const metadata = paper.metadata as PaperMetadata
  
  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Parth K. Thaker
            </Link>
            <div className="flex gap-6">
              <Link href="/papers" className="text-blue-600 font-medium">
                Papers
              </Link>
              <Link href="/blogs" className="hover:text-green-600 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
        <div className="text-gray-600 mb-2">
          <span className="font-medium">Authors:</span> {metadata.authors}
        </div>
        <div className="text-gray-600 mb-2">
          <span className="font-medium">Date:</span> {new Date(metadata.date).toLocaleDateString()}
        </div>
        {metadata.venue && (
          <div className="text-gray-600 mb-2">
            <span className="font-medium">Venue:</span> {metadata.venue}
          </div>
        )}
        {metadata.arxivId && (
          <div className="text-gray-600 mb-2">
            <span className="font-medium">arXiv:</span>{' '}
            <a 
              href={`https://arxiv.org/abs/${metadata.arxivId}`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {metadata.arxivId}
            </a>
          </div>
        )}
        {metadata.doi && (
          <div className="text-gray-600 mb-4">
            <span className="font-medium">DOI:</span>{' '}
            <a 
              href={`https://doi.org/${metadata.doi}`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {metadata.doi}
            </a>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
        <p className="text-gray-700 leading-relaxed">{metadata.abstract}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What Excited Me</h2>
        <p className="text-gray-700 leading-relaxed">{metadata.excitement}</p>
      </div>

      {metadata.images && metadata.images.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Figures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadata.images.map((image, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={`/content/images/${image}`}
                  alt={`Figure ${index + 1}`}
                  fill
                  className="object-contain rounded-lg border"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {metadata.simulations && metadata.simulations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Simulations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadata.simulations.map((sim, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={`/simulations/${sim}`}
                  alt={`Simulation ${index + 1}`}
                  fill
                  className="object-contain rounded-lg border"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: paper.content }} />
      </div>
      </div>
    </div>
  )
}