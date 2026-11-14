import Link from 'next/link'
import { getArticles } from '@/lib/newt'
import type { Metadata } from 'next'
import styles from '../styles/page.module.scss'
import { UnderInner } from '../components/UnderInner'

export const metadata: Metadata = {
  title: 'BLOG'
}

export default async function Page() {
  const articles = await getArticles()
  return (
    <section id="blog">
      <UnderInner title={metadata.title as string} label="Articles & Notes" />
      <div className={`${styles.wrap} ${styles.pageBody}`}>
        <p className={styles.underRead} data-reveal>On my blog, I regularly update the latest industry trends, technical tutorials, and up-to-date information. If you have any questions, please feel free to contact me through my contact page.</p>

        {articles.length === 0 ? (
          <p className={styles.empty}>No articles yet.</p>
        ) : (
          <ul className={styles.blogGrid}>
            {articles.map((article, index) => {
              return (
                <li key={article._id} data-reveal={index % 3 ? String(index % 3) : ''}>
                  <Link href={`/articles/${article.slug}`}>
                    <div className={styles.imgWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.coverImage.src}
                        alt={article.title}
                        width="300"
                        height="200"
                        loading="lazy"
                      />
                    </div>
                    <time className={styles.date}>
                      {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(article.date))}
                    </time>
                    <p>{article.title}</p>
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
