/** Cache tag for all blog content (used by "use cache" in lib/microcms.ts and the revalidate webhook) */
export const BLOG_TAG = 'blogs'

export const blogTag = (id: string) => `${BLOG_TAG}-${id}`
