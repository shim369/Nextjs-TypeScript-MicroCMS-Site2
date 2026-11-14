import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Category = MicroCMSListContent & {
  name: string
}

export type Blog = MicroCMSListContent & {
  title: string
  content: string
  eyecatch?: MicroCMSImage
  category?: Category | null
}

/** Lightweight version for lists (no body) */
export type BlogSummary = Pick<Blog, 'id' | 'title' | 'publishedAt'> & {
  eyecatch: MicroCMSImage | null
  category: string | null
}
