"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.scss';

interface StatementProps {
  text: string;
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export const Statement = ({ text }: StatementProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.4), 0), 1);
      setLit(Math.round(p * words.length));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={styles.statementText}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className={`${styles.word} ${i < lit ? styles.lit : ''}`}>{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
};
