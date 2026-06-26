import { MetadataRoute } from 'next'
import { getAllContent, type Collection } from '@/lib/markdown'

export const dynamic = 'force-static'

const baseUrl = 'https://parththaker.github.io'

// next.config has trailingSlash: true, so canonical URLs end with "/".
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/papers/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/projects/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blogs/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ideas/`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/hobbies/`, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const collections: { type: Collection; priority: number }[] = [
    { type: 'papers', priority: 0.8 },
    { type: 'projects', priority: 0.7 },
    { type: 'blogs', priority: 0.6 },
    { type: 'ideas', priority: 0.5 },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = collections.flatMap(({ type, priority }) =>
    getAllContent(type).map((item) => ({
      url: `${baseUrl}/${type}/${item.slug}/`,
      lastModified: new Date(item.metadata.date || Date.now()),
      changeFrequency: 'monthly' as const,
      priority,
    }))
  )

  return [...staticRoutes, ...dynamicRoutes]
}
