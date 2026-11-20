import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Cache Components: data is cached with "use cache" + cacheLife/cacheTag (see lib/microcms.ts)
  cacheComponents: true,
  // Prefetch only the static shell of linked pages (recommended together with cacheComponents)
  partialPrefetching: true,
  // Type-checked <Link href> and router.push()
  typedRoutes: true,
}

export default nextConfig
