import React from 'react'
import styles from './styles/page.module.scss'
import { Contact } from './components/Contact'
import { Service } from './components/Service'
import { Statement } from './components/Statement'

const tickerItems = ['HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'Next.js', 'Corporate Sites', 'Online Shops']

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} id="top">
        <div className={styles.wrap}>
          <div className={styles.metaRow}>
            <span>(Web Development)</span>
            <span>Est. 2023 — Tokyo, JP</span>
            <span>Available for new projects</span>
          </div>

          <h1 className={styles.heroTitle} aria-label="Increasing Business Velocity through Technology">
            <span className={styles.line} aria-hidden="true"><span>Increasing</span></span>
            <span className={`${styles.line} ${styles.right}`} aria-hidden="true"><span>Business</span></span>
            <span className={styles.line} aria-hidden="true">
              <span><em className={styles.hot}>Velocity</em><span className={styles.outline}>/Tech</span></span>
            </span>
          </h1>

          <div className={styles.heroBottom}>
            <p className={styles.heroLead}><b>Welcome to NEXT BASE.</b> Your gateway to cutting-edge tech solutions — built to move your business faster.</p>
            <a href="#contact" className={styles.cta}>Start a project <span className={styles.ar}>→</span></a>
            <div className={styles.badge} aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <defs><path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
                <text fontSize="15" letterSpacing="5" fill="#121212">
                  <textPath href="#circ">WEB DEVELOPMENT • SINCE 2023 • NEXT BASE • </textPath>
                </text>
              </svg>
              <span className={styles.core}>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* Index */}
      <section className={styles.section} id="index">
        <div className={styles.wrap}>
          <div className={styles.secTop} data-reveal>
            <span className={styles.mono}>( Index — 04 )</span>
            <h2>What I do,<br />and how.</h2>
          </div>
          <Service />
        </div>
      </section>

      {/* Statement */}
      <section className={styles.statement}>
        <div className={styles.wrap}>
          <span className={styles.mono}>( Philosophy )</span>
          <Statement text="Technology is not the goal. Speed, clarity and growth for your business — that is what I build for." />
          <div className={styles.statementFoot} data-reveal>
            <div className={styles.stat}><b>2023</b><span>Founded</span></div>
            <div className={styles.stat}><b>6+</b><span>Core technologies</span></div>
            <div className={styles.stat}><b>1:1</b><span>Direct communication</span></div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact} id="contact">
        <div className={styles.wrap}>
          <Contact />
        </div>
      </section>
    </>
  )
}
