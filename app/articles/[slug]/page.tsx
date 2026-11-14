import Link from 'next/link'
import { getArticles, getArticleBySlug } from '@/lib/newt'
import type { Article } from '@/types/article'
import type { Metadata } from 'next'
import styles from '../../styles/page.module.scss'
import { UnderInner } from '@/app/components/UnderInner'

type Props = {
  params: {
    slug: string
  }
}

export async function generatemetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'BLOG',
    };
  }

  return {
    title: article.title,
  };
}

export default async function Article({ params }: Props) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  if (!article) return null;

  return (
    <section>
      <UnderInner title={"BLOG"} label="Article" />
      <div className={`${styles.wrap} ${styles.pageBody}`}>
        <article className={styles.blogDetail} data-reveal>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
          <time className={styles.date}>
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(article.date))}
          </time>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: article.body }} />
        </article>
      </div>
    </section>
  );
}
