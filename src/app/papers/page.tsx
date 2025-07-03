import { Metadata } from 'next'
import Link from 'next/link'
import { getAllContent, PaperMetadata } from '@/lib/markdown'
import NetworkBackground from '@/components/NetworkBackground'
import CursorTracker from '@/components/CursorTracker'

export const metadata: Metadata = {
  title: 'Research Papers - Parth K. Thaker',
  description: 'Research papers by Parth K. Thaker on graph theory, nonconvex optimization, bandit learning, and machine learning. Published work from ASU and industry research.',
  alternates: {
    canonical: '/papers',
  },
  openGraph: {
    title: 'Research Papers - Parth K. Thaker',
    description: 'Research papers by Parth K. Thaker on graph theory, nonconvex optimization, bandit learning, and machine learning. Published work from ASU and industry research.',
    url: 'https://parththaker.github.io/papers',
    type: 'website',
  },
}

export default function PapersPage() {
  const papers = getAllContent('papers')
  
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
              <Link href="/hobbies" className="relative group">
                <span className="text-slate-700 hover:text-green-600 transition-colors duration-300 font-medium">
                  Hobbies
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">Research Papers</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A collection of my research work with personal insights on what made each project exciting and impactful.
          </p>
        </div>
      
        {papers.length === 0 ? (
          <div className="text-center py-16">
            <div className="network-card p-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Papers Yet</h3>
              <p className="text-slate-600 mb-6">
                Add your research papers as markdown files to get started.
              </p>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-left">
                <p className="text-slate-700 text-sm">
                  Add <code className="bg-blue-200 px-2 py-1 rounded text-blue-800">.md</code> files to{' '}
                  <code className="bg-blue-200 px-2 py-1 rounded text-blue-800">content/papers/</code>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {papers.map((paper, index) => {
              const metadata = paper.metadata as PaperMetadata
              return (
                <article 
                  key={paper.slug} 
                  className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-xl transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <Link href={`/papers/${paper.slug}`} className="group">
                          <h2 className="text-2xl font-bold text-slate-800 group-hover:gradient-text transition-all duration-300 mb-3">
                            {metadata.title}
                          </h2>
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm">
                          <div className="text-slate-500">
                            {(() => {
                              const authors = metadata.authors.split(', ')
                              if (authors.length > 3) {
                                return authors.slice(0, 3).join(', ') + ' et al.'
                              }
                              return metadata.authors
                            })()}
                          </div>
                          <div className="text-slate-500">
                            {new Date(metadata.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </div>
                          {metadata.venue && (
                            <div className="text-slate-500">{metadata.venue}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {metadata.abstract.substring(0, 400)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div className="flex gap-6">
                        {metadata.arxivId && (
                          <a 
                            href={`https://arxiv.org/abs/${metadata.arxivId}`}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View paper ${metadata.title} on arXiv`}
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
                            aria-label={`View paper ${metadata.title} DOI`}
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            DOI
                          </a>
                        )}
                      </div>
                      
                      <Link 
                        href={`/papers/${paper.slug}`}
                        className="group flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
                        aria-label={`Read more about ${metadata.title}`}
                      >
                        <span className="font-medium">Read More</span>
                        <div className="w-4 h-4 group-hover:translate-x-1 transition-transform">→</div>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}