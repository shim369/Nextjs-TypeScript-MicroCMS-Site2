import { cacheLife } from 'next/cache'

/** Current year, cached for a day (Cache Components doesn't allow raw `new Date()` while prerendering) */
export async function getCurrentYear() {
  'use cache'
  cacheLife('days')
  return new Date().getFullYear()
}
