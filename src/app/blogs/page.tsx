import Link from 'next/link'
import { getAllContent, BlogMetadata } from '@/lib/markdown'

export default function BlogsPage() {
  const blogs = getAllContent('blogs')
  
  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Parth K. Thaker
            </Link>
            <div className="flex gap-6">
              <Link href="/papers" className="hover:text-blue-600 transition-colors">
                Papers
              </Link>
              <Link href="/blogs" className="text-green-600 font-medium">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No blog posts found.</p>
          <p className="text-gray-500">
            Add your blog posts as markdown files in the <code className="bg-gray-100 px-2 py-1 rounded">content/blogs/</code> directory.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => {
            const metadata = blog.metadata as BlogMetadata
            return (
              <div key={blog.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Link href={`/blogs/${blog.slug}`}>
                  <h2 className="text-2xl font-semibold mb-3 text-green-600 hover:text-green-800">
                    {metadata.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <span>{new Date(metadata.date).toLocaleDateString()}</span>
                  {metadata.readTime && (
                    <span>{metadata.readTime} min read</span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {metadata.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
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