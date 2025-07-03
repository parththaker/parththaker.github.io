import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PaperMetadata {
  title: string
  authors: string
  date: string
  arxivId?: string
  doi?: string
  venue?: string
  videoUrl?: string
  posterUrl?: string
  slideUrl?: string
  conferenceUrl?: string
  tags: string[]
  abstract: string
  excitement: string
  images?: string[]
  simulations?: string[]
}

export interface BlogMetadata {
  title: string
  date: string
  tags: string[]
  description: string
  readTime?: number
}

export interface ContentItem {
  slug: string
  content: string
  metadata: PaperMetadata | BlogMetadata
}

export async function getContentBySlug(
  type: 'papers' | 'blogs',
  slug: string
): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkBreaks)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeKatex)
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
    
    return {
      slug,
      content: processedContent.toString(),
      metadata: data as PaperMetadata | BlogMetadata
    }
  } catch {
    return null
  }
}

export function getAllContent(type: 'papers' | 'blogs'): ContentItem[] {
  const fullPath = path.join(contentDirectory, type)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }
  
  const fileNames = fs.readdirSync(fullPath)
  const allContent = fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const slug = name.replace(/\.md$/, '')
      const fullFilePath = path.join(fullPath, name)
      const fileContents = fs.readFileSync(fullFilePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        content: content.substring(0, 200) + '...',
        metadata: data as PaperMetadata | BlogMetadata
      }
    })
  
  return allContent.sort((a, b) => {
    const dateA = new Date(a.metadata.date)
    const dateB = new Date(b.metadata.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export function getAllSlugs(type: 'papers' | 'blogs'): string[] {
  const fullPath = path.join(contentDirectory, type)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }
  
  const fileNames = fs.readdirSync(fullPath)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''))
}