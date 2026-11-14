import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlog, getBlogs } from '@/lib/microcms'
import { cmsImage, formatDate, toPlainText } from '@/lib/format'
import styles from '../../styles/page.module.scss'
import { UnderInner } from '@/app/components/UnderInner'

type Props = {
  params: {
    id: string
  }
}

// Regenerate at most every 60 seconds; articles added after build are generated on first request
export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getBlogs()
  return posts.map((post) => ({ id: post.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlog(params.id)
  if (!post) return { title: 'BLOG' }

  const description = toPlainText(post.content).slice(0, 110) || undefined
  const image = post.eyecatch ? cmsImage(post.eyecatch.url, 1200) : undefined

  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description, images: image ? [image] : undefined },
  }
}

export default async function Article({ params }: Props) {
  const [post, posts] = await Promise.all([getBlog(params.id), getBlogs()])
  if (!post) notFound();

  // List is newest first: PREV = one older, NEXT = one newer
  const index = posts.findIndex((p) => p.id === post.id)
  const prev = index >= 0 ? posts[index + 1] : undefined
  const next = index >= 0 && index > 0 ? posts[index - 1] : undefined

  return (
    <section>
      <UnderInner title={"BLOG"} label="Article" />
      <div className={`${styles.wrap} ${styles.pageBody}`}>
        <article className={styles.blogDetail} data-reveal>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
          <div className={styles.date}>
            {post.category?.name && <span className={styles.cat}>{post.category.name}</span>}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt ?? post.createdAt)}</time>
          </div>
          <h2 className={styles.articleTitle}>{post.title}</h2>
          {post.eyecatch && (
            <div className={styles.eyecatch}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cmsImage(post.eyecatch.url, 1600)}
                alt=""
                width={post.eyecatch.width}
                height={post.eyecatch.height}
              />
            </div>
          )}
          <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: post.content }} />

          {(prev || next) && (
            <nav className={styles.pager} aria-label="Adjacent articles">
              {prev ? (
                <Link href={`/articles/${prev.id}`}>
                  <small>← PREV</small>
                  <span>{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/articles/${next.id}`} className={styles.pagerNext}>
                  <small>NEXT →</small>
                  <span>{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </div>
    </section>
  );
}
