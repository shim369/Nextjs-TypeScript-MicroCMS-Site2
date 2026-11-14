/** ISO date → "Sep 17, 2023" (Tokyo time) */
export const formatDate = (iso?: string | null) => {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'Asia/Tokyo' }).format(new Date(iso))
}

/** Convert a microCMS image URL to WebP at the given width */
export const cmsImage = (url: string, width: number) => `${url}?fm=webp&w=${width}&q=80`

/** Strip HTML tags for excerpts / meta descriptions */
export const toPlainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
