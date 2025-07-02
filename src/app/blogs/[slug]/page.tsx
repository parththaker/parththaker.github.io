import { notFound } from 'next/navigation'
import { getContentBySlug, getAllSlugs, BlogMetadata } from '@/lib/markdown'
import Link from 'next/link'
import NetworkBackground from '@/components/NetworkBackground'
import CursorTracker from '@/components/CursorTracker'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('blogs')
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPage({ params }: Props) {
  const blog = await getContentBySlug('blogs', params.slug)
  
  if (!blog) {
    notFound()
  }
  
  const metadata = blog.metadata as BlogMetadata
  
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
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
                <span className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Papers
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/blogs" className="relative group">
                <span className="text-orange-600 font-medium">
                  Blog
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Blog Header */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 mb-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">{metadata.title}</h1>
              
              <div className="flex items-center gap-6 text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{new Date(metadata.date).toLocaleDateString()}</span>
                </div>
                {metadata.readTime && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span>{metadata.readTime} min read</span>
                  </div>
                )}
              </div>
              
              <p className="text-slate-700 text-lg leading-relaxed mb-6">{metadata.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200">
          <div className="prose prose-slate max-w-none prose-headings:gradient-text prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}