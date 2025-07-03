import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/temp/', '/out/'],
    },
    sitemap: 'https://parththaker.github.io/sitemap.xml',
  }
}