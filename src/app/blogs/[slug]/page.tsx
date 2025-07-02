import { notFound } from 'next/navigation'
import { getContentBySlug, getAllSlugs, BlogMetadata } from '@/lib/markdown'
import Link from 'next/link'

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
      
      <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span>{new Date(metadata.date).toLocaleDateString()}</span>
          {metadata.readTime && (
            <span>{metadata.readTime} min read</span>
          )}
        </div>
        <p className="text-gray-700 text-lg mb-6">{metadata.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
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

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
      </div>
    </div>
  )
}