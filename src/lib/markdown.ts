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

/**
 * Every content type is just a folder of Markdown files under /content.
 * Add a new `.md` file -> it shows up on the site after the next build.
 * Files whose name starts with "_" (e.g. _template.md) and files with
 * `draft: true` in their frontmatter are ignored.
 */
export type Collection = 'papers' | 'blogs' | 'projects' | 'ideas'

interface BaseMetadata {
  title: string
  /** ISO date string, e.g. "2024-05-01". Used for sorting (newest first). */
  date: string
  tags?: string[]
  /** Surface this item in the "featured" rails on the homepage. */
  featured?: boolean
  /** Hide from the published site without deleting the file. */
  draft?: boolean
}

export interface PaperMetadata extends BaseMetadata {
  authors: string
  arxivId?: string
  doi?: string
  venue?: string
  videoUrl?: string
  posterUrl?: string
  slideUrl?: string
  conferenceUrl?: string
  /** Link to runnable code / repo — high-signal for research-engineer roles. */
  codeUrl?: string
  tags: string[]
  abstract: string
  /** One plain sentence ("what it does") for cards and previews. */
  oneLiner?: string
  /**
   * Parth's authentic, first-person "why this mattered" note (1-3 sentences).
   * Preferred over the older `excitement` field, which reads as generated copy.
   */
  insight?: string
  /** @deprecated Legacy field — migrate to `insight` in your own voice. */
  excitement?: string
  images?: string[]
  simulations?: string[]
}

export interface BlogMetadata extends BaseMetadata {
  tags: string[]
  description: string
  readTime?: number
}

/** Applied / engineering case studies (cloud, LLM systems, side projects). */
export interface ProjectMetadata extends BaseMetadata {
  /** One-line elevator pitch shown on cards. */
  summary: string
  role?: string
  /** Tech used, e.g. ["AWS", "Terraform", "Python", "LLM"]. */
  stack: string[]
  problem?: string
  approach?: string
  result?: string
  links?: { label: string; url: string }[]
  image?: string
  tags: string[]
}

/** Lightweight "knowledge garden" notes: research threads + skills, finished or not. */
export interface IdeaMetadata extends BaseMetadata {
  summary: string
  /** Maturity of the note. */
  status?: 'seed' | 'growing' | 'evergreen'
  /** Which side of the portfolio this belongs to. */
  domain?: 'research' | 'engineering'
  updated?: string
  /** Slugs of related ideas (for future cross-linking / graph view). */
  related?: string[]
  tags: string[]
}

export type ContentMetadata =
  | PaperMetadata
  | BlogMetadata
  | ProjectMetadata
  | IdeaMetadata

export interface ContentItem<T extends ContentMetadata = ContentMetadata> {
  slug: string
  content: string
  metadata: T
}

const markdownProcessor = remark()
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeKatex)
  .use(rehypeHighlight)
  .use(rehypeStringify, { allowDangerousHtml: true })

async function renderMarkdown(content: string): Promise<string> {
  const processed = await markdownProcessor.process(content)
  return processed.toString()
}

function isPublishable(fileName: string, data: Record<string, unknown>): boolean {
  if (!fileName.endsWith('.md')) return false
  if (fileName.startsWith('_')) return false
  if (data.draft === true) return false
  return true
}

function sortByDateDesc(a: ContentItem, b: ContentItem): number {
  const dateA = new Date(a.metadata.date || 0).getTime()
  const dateB = new Date(b.metadata.date || 0).getTime()
  return dateB - dateA
}

export async function getContentBySlug<T extends ContentMetadata = ContentMetadata>(
  type: Collection,
  slug: string
): Promise<ContentItem<T> | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content: await renderMarkdown(content),
      metadata: data as T,
    }
  } catch {
    return null
  }
}

/** All publishable items in a collection, newest first. Body is truncated for list views. */
export function getAllContent<T extends ContentMetadata = ContentMetadata>(
  type: Collection
): ContentItem<T>[] {
  const fullPath = path.join(contentDirectory, type)
  if (!fs.existsSync(fullPath)) return []

  return fs
    .readdirSync(fullPath)
    .map((fileName) => {
      const fileContents = fs.readFileSync(path.join(fullPath, fileName), 'utf8')
      const { data, content } = matter(fileContents)
      return { fileName, data, content }
    })
    .filter(({ fileName, data }) => isPublishable(fileName, data))
    .map(({ fileName, data, content }) => ({
      slug: fileName.replace(/\.md$/, ''),
      content: content.slice(0, 200) + '...',
      metadata: data as T,
    }))
    .sort(sortByDateDesc)
}

/** Slugs for getStaticPaths(). Excludes templates and drafts. */
export function getAllSlugs(type: Collection): string[] {
  const fullPath = path.join(contentDirectory, type)
  if (!fs.existsSync(fullPath)) return []

  return fs
    .readdirSync(fullPath)
    .filter((fileName) => {
      if (!fileName.endsWith('.md') || fileName.startsWith('_')) return false
      const fileContents = fs.readFileSync(path.join(fullPath, fileName), 'utf8')
      const { data } = matter(fileContents)
      return data.draft !== true
    })
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

/** Featured items for homepage rails (falls back to most-recent if none flagged). */
export function getFeatured<T extends ContentMetadata = ContentMetadata>(
  type: Collection,
  limit = 3
): ContentItem<T>[] {
  const all = getAllContent<T>(type)
  const featured = all.filter((item) => item.metadata.featured)
  return (featured.length > 0 ? featured : all).slice(0, limit)
}
