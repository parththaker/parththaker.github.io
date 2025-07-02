import Link from 'next/link'
import { getAllContent, PaperMetadata } from '@/lib/markdown'

export default function PapersPage() {
  const papers = getAllContent('papers')
  
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
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Research Papers</h1>
      
      {papers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No papers found.</p>
          <p className="text-gray-500">
            Add your papers as markdown files in the <code className="bg-gray-100 px-2 py-1 rounded">content/papers/</code> directory.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {papers.map((paper) => {
            const metadata = paper.metadata as PaperMetadata
            return (
              <div key={paper.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Link href={`/papers/${paper.slug}`}>
                  <h2 className="text-2xl font-semibold mb-3 text-blue-600 hover:text-blue-800">
                    {metadata.title}
                  </h2>
                </Link>
                
                <div className="text-gray-600 mb-2">
                  <span className="font-medium">Authors:</span> {metadata.authors}
                </div>
                
                <div className="text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {new Date(metadata.date).toLocaleDateString()}
                </div>
                
                {metadata.venue && (
                  <div className="text-gray-600 mb-3">
                    <span className="font-medium">Venue:</span> {metadata.venue}
                  </div>
                )}
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {metadata.abstract.substring(0, 300)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {metadata.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 text-sm">
                  {metadata.arxivId && (
                    <a 
                      href={`https://arxiv.org/abs/${metadata.arxivId}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      arXiv: {metadata.arxivId}
                    </a>
                  )}
                  {metadata.doi && (
                    <a 
                      href={`https://doi.org/${metadata.doi}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DOI
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      </div>
    </div>
  )
}