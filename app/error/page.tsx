import Link from 'next/link'
import type { Metadata } from 'next'
import styles from '../styles/page.module.scss'
import { UnderInner } from '../components/UnderInner'

export const metadata: Metadata = {
  title: 'ERROR'
}

export default function Page() {
  return (
    <section id="contact">
      <UnderInner title={metadata.title as string} label="Something went wrong" />
      <div className={`${styles.wrap} ${styles.notice}`} data-reveal>
        <p className={styles.underRead}>Sending your inquiry failed.</p>
        <Link href="/contact" className={styles.cta}><span className={styles.ar}>←</span> Back to Previous Page</Link>
      </div>
    </section>
  )
}
