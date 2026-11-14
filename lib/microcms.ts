import 'server-only'
import { createClient } from 'microcms-js-sdk'
import type { Blog, BlogSummary } from '../types/blog'

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

if (!serviceDomain || !apiKey) {
  throw new Error('Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY in .env.local')
}

const client = createClient({ serviceDomain, apiKey })

const toSummary = (blog: Blog): BlogSummary => ({
  id: blog.id,
  title: blog.title,
  publishedAt: blog.publishedAt ?? blog.createdAt,
  eyecatch: blog.eyecatch ?? null,
  category: blog.category?.name ?? null,
})

/** Blog list, newest first */
export const getBlogs = async (limit = 100): Promise<BlogSummary[]> => {
  const { contents } = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      limit,
      orders: '-publishedAt',
      fields: 'id,title,publishedAt,createdAt,eyecatch,category.name',
    },
  })
  return contents.map(toSummary)
}

/** Blog detail (null if not found) */
export const getBlog = async (id: string): Promise<Blog | null> => {
  try {
    return await client.getListDetail<Blog>({ endpoint: 'blogs', contentId: id })
  } catch {
    return null
  }
}
