import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { BLOG_TAG, blogTag } from '@/lib/cache-tags'

/**
 * microCMS webhook endpoint.
 * Set the webhook URL to https://<your-domain>/api/revalidate and the secret to MICROCMS_WEBHOOK_SECRET.
 * Every publish / update / unpublish refreshes the cached blog list and the changed article.
 */
export async function POST(req: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get('x-microcms-signature') ?? ''
  const expected = createHmac('sha256', secret).update(body).digest('hex')

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let id: string | undefined
  try {
    id = (JSON.parse(body) as { id?: string }).id
  } catch {
    // ignore — still revalidate the whole list
  }

  revalidateTag(BLOG_TAG, 'max')
  if (id) revalidateTag(blogTag(id), 'max')

  return NextResponse.json({ revalidated: true, id: id ?? null })
}
