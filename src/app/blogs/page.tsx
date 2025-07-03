import Link from 'next/link'
import { getAllContent, BlogMetadata } from '@/lib/markdown'
import NetworkBackground from '@/components/NetworkBackground'
import CursorTracker from '@/components/CursorTracker'

export default function BlogsPage() {
  const blogs = getAllContent('blogs')
  
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
          <h1 className="text-5xl font-bold gradient-text mb-4">Blog Posts</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Thoughts on research trends, insights from the field, and explorations of emerging ideas in academia.
          </p>
        </div>
      
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="network-card p-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Blog Posts Yet</h3>
              <p className="text-slate-600 mb-6">
                Start sharing your thoughts and insights by adding blog posts.
              </p>
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-left">
                <p className="text-slate-700 text-sm">
                  Add <code className="bg-orange-200 px-2 py-1 rounded text-orange-800">.md</code> files to{' '}
                  <code className="bg-orange-200 px-2 py-1 rounded text-orange-800">content/blogs/</code>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {blogs.map((blog, index) => {
              const metadata = blog.metadata as BlogMetadata
              return (
                <div 
                  key={blog.slug} 
                  className="network-card p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-xl transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <Link href={`/blogs/${blog.slug}`} className="group">
                          <h2 className="text-2xl font-bold text-slate-800 group-hover:gradient-text transition-all duration-300 mb-3">
                            {metadata.title}
                          </h2>
                        </Link>
                        
                        <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
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
                      </div>
                    </div>
                    
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {metadata.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-700 rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-end pt-4 border-t border-slate-200">
                      <Link 
                        href={`/blogs/${blog.slug}`}
                        className="group flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-lg"
                      >
                        <span className="font-medium">Read More</span>
                        <div className="w-4 h-4 group-hover:translate-x-1 transition-transform">→</div>
                      </Link>
                    </div>
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