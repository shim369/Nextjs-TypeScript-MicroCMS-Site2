import { Metadata } from 'next'
import styles from '../styles/page.module.scss'
import { UnderInner } from '../components/UnderInner';

export const metadata: Metadata = {
  title: 'SERVICE'
}

export default function Page() {
  const services = [
    {
      title: "Website Development",
      technologies: "HTML, CSS/SASS, JavaScript, Astro",
      price: "¥400,000 ~"
    },
    {
      title: "Web Application Development",
      technologies: "Next.js, Nuxt.js, Python, Django",
      price: "¥1,000,000 ~"
    },
    {
      title: "CMS Construction",
      technologies: "WordPress, MicroCMS, Newt",
      price: "¥500,000 ~"
    },
    {
      title: "Design & UI/UX",
      technologies: "Figma, Adobe Photoshop, Illustrator",
      price: "¥200,000 ~"
    },
  ];

  const options = [
    { title: "Maintenance", price: "¥20,000 ~ /Month" },
    { title: "SEO Optimization", price: "¥80,000 ~" },
    { title: "Content Creation", price: "¥30,000 ~ /Page" },
  ];

  return (
    <section id="service">
      <UnderInner title={metadata.title as string} label="What I offer" />
      <div className={`${styles.wrap} ${styles.pageBody}`}>
        <p className={styles.underRead} data-reveal>The prices listed below are reference prices (excluding tax) and may vary depending on the project&apos;s scope and requirements. For more details, please inquire.</p>

        <ul className={styles.rows}>
          {services.map((service, index) => (
            <li key={service.title} className={styles.priceRow} data-reveal={index ? String(index) : ''}>
              <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p className={styles.tech}>{service.technologies}</p>
              <span className={styles.price}>{service.price}</span>
            </li>
          ))}
        </ul>

        <div className={styles.optionsBox} data-reveal>
          <span className={`${styles.mono} ${styles.dim}`}>( Options )</span>
          <h2>Additional Options</h2>
          <ul>
            {options.map((option) => (
              <li key={option.title}>
                <span>{option.title}</span>
                <span>{option.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
