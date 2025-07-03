import { MetadataRoute } from 'next'
import { getAllContent } from '@/lib/markdown'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parththaker.github.io'
  
  // Get all papers and blogs
  const papers = getAllContent('papers')
  const blogs = getAllContent('blogs')
  
  // Static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/papers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hobbies`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  // Dynamic paper routes
  const paperRoutes = papers.map((paper) => ({
    url: `${baseUrl}/papers/${paper.slug}`,
    lastModified: new Date((paper.metadata as any).date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // Dynamic blog routes
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date((blog.metadata as any).date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  return [...staticRoutes, ...paperRoutes, ...blogRoutes]
}