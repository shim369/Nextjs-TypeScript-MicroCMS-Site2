import Link from 'next/link'
import { getBlogs } from '@/lib/microcms'
import { cmsImage, formatDate } from '@/lib/format'
import type { Metadata } from 'next'
import styles from '../styles/page.module.scss'
import { UnderInner } from '../components/UnderInner'

export const metadata: Metadata = {
  title: 'BLOG'
}


const FALLBACK_IMAGES = ['/1.webp', '/2.webp', '/3.webp', '/4.webp']

export default async function Page() {
  const posts = await getBlogs()
  return (
    <section id="blog">
      <UnderInner title={metadata.title as string} label="Articles & Notes" />
      <div className={`${styles.wrap} ${styles.pageBody}`}>
        <p className={styles.underRead} data-reveal>On my blog, I regularly update the latest industry trends, technical tutorials, and up-to-date information. If you have any questions, please feel free to contact me through my contact page.</p>

        {posts.length === 0 ? (
          <p className={styles.empty}>No articles yet.</p>
        ) : (
          <ul className={styles.blogGrid}>
            {posts.map((post, index) => {
              const src = post.eyecatch ? cmsImage(post.eyecatch.url, 840) : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
              return (
                <li key={post.id} data-reveal={index % 3 ? String(index % 3) : ''}>
                  <Link href={`/articles/${post.id}`}>
                    <div className={styles.imgWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" width="840" height="630" loading="lazy" />
                    </div>
                    <div className={styles.date}>
                      {post.category && <span className={styles.cat}>{post.category}</span>}
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <p>{post.title}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
