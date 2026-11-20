import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './styles/page.module.scss'
import { UnderInner } from './components/UnderInner'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <section>
      <UnderInner title="404" label="Page not found" />
      <div className={`${styles.wrap} ${styles.notice}`}>
        <p className={styles.underRead}>The page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className={styles.cta}><span className={styles.ar}>←</span> Back to Top</Link>
      </div>
    </section>
  )
}
