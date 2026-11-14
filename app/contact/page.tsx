import { Contact } from "../components/Contact"
import { UnderInner } from "../components/UnderInner"
import styles from '../styles/page.module.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CONTACT'
}

export default function Page() {
  return (
    <>
      <UnderInner title={metadata.title as string} label="Get in touch" />
      <section id="contact" className={styles.contact}>
        <div className={styles.wrap}>
          <Contact />
        </div>
      </section>
    </>
  )
}
