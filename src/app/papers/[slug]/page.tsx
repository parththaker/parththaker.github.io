import { notFound } from 'next/navigation'
import { getContentBySlug, getAllSlugs, PaperMetadata } from '@/lib/markdown'
import Image from 'next/image'
import Link from 'next/link'
import NetworkBackground from '@/components/NetworkBackground'
import CursorTracker from '@/components/CursorTracker'

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
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CursorTracker />
      <NetworkBackground />
      
      <nav className="relative z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Parth K. Thaker
            </Link>
            <div className="flex gap-8">
              <Link href="/papers" className="relative group">
                <span className="text-blue-600 font-medium">
                  Papers
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              </Link>
              <Link href="/blogs" className="relative group">
                <span className="text-slate-700 hover:text-orange-600 transition-colors duration-300 font-medium">
                  Blog
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Paper Header */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">{metadata.title}</h1>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Authors:</span>
                  <p className="text-slate-800">{metadata.authors}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Date:</span>
                  <p className="text-slate-800">{new Date(metadata.date).toLocaleDateString()}</p>
                </div>
                {metadata.venue && (
                  <div>
                    <span className="font-medium text-slate-600">Venue:</span>
                    <p className="text-slate-800">{metadata.venue}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {metadata.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-6 pt-4 border-t border-slate-200">
                {metadata.arxivId && (
                  <a 
                    href={`https://arxiv.org/abs/${metadata.arxivId}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    arXiv: {metadata.arxivId}
                  </a>
                )}
                {metadata.doi && (
                  <a 
                    href={`https://doi.org/${metadata.doi}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    DOI
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Abstract */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4">Abstract</h2>
          <p className="text-slate-700 leading-relaxed text-lg">{metadata.abstract}</p>
        </div>

        {/* What Excited Me */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4">What Excited Me</h2>
          <p className="text-slate-700 leading-relaxed text-lg">{metadata.excitement}</p>
        </div>

        {metadata.images && metadata.images.length > 0 && (
          <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Figures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metadata.images.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={`/content/images/${image}`}
                    alt={`Figure ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {metadata.simulations && metadata.simulations.length > 0 && (
          <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Simulations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metadata.simulations.map((sim, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={`/simulations/${sim}`}
                    alt={`Simulation ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:gradient-text prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: paper.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}