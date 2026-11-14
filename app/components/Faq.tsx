"use client"
import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from '../styles/page.module.scss'

export const Faq = () => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const handleToggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((q) => q !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleQuestion(index);
    }
  };

  return (
    <div className={styles.qaList}>
      {faqData.map((faq, index) => {
        const isOpen = openQuestions.includes(index);
        return (
          <dl className={`${styles.qa} ${isOpen ? styles.qaOpen : ''}`} key={index} data-reveal>
            <dt
              onClick={() => handleToggleQuestion(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
<span className={styles.num} aria-hidden="true">Q.{String(index + 1).padStart(2, '0')}</span>
              {faq.question}
            </dt>
            <dd id={`faq-answer-${index}`} style={{ display: isOpen ? 'block' : 'none' }}>
              {faq.answer}
            </dd>
          </dl>
        );
      })}
    </div>
  )
}

const faqData = [
  {
    question: 'How is the service fee determined?',
    answer: "The fee varies based on the project's scope, requirements, and the technologies used. The base plan starts at ¥400,000, but a specific estimate will be provided after I have the details of your project.",
  },
  {
    question: 'Do you offer post-development support?',
    answer: 'Yes, I provide post-development support with maintenance plans. The basic maintenance fee is ¥20,000 per month.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'I utilize a variety of technologies, primarily including HTML, CSS/SASS, Astro, JavaScript, Next.js, Nuxt.js, Python, and Django. For content management systems (CMS), I use MicroCMS, Newt, and WordPress.',
  },
  {
    question: 'What design tools do you use?',
    answer: "For design, I use the Figma platform along with Adobe's toolset, which includes Photoshop and Illustrator.",
  },
  {
    question: 'What is the estimated delivery time?',
    answer: "The delivery time depends on the project's size and requirements, but for the base plan, I typically estimate a delivery time of 4 to 6 weeks.",
  },
  {
    question: 'What happens if there are changes in requirements during the project?',
    answer: 'If there are changes in requirements during the project, there may be additional charges. I will explain the changes and their impact and provide a new estimate accordingly.',
  },
  {
    question: 'Do you provide content creation services?',
    answer: 'Yes, I offer content creation services. The base fee for content creation starts at ¥30,000 per page.',
  },
];
