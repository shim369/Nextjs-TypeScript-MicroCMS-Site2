import Link from 'next/link'
import styles from '../styles/page.module.scss'

export const Footer = ({ year }: { year: number }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footWord} aria-hidden="true">NEXT BASE</div>
        <div className={styles.footBar}>
          <p>&copy; 2023–{year} NEXT BASE</p>
          <nav className={styles.footLinks} aria-label="Footer">
            <Link href="/about">About</Link>
            <Link href="/service">Service</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <a href="#">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
