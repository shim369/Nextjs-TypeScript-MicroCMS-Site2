"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/page.module.scss';

const format = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });

/** Live Tokyo time shown in the header. Renders "--:--" until mounted to avoid hydration mismatch. */
export const Clock = () => {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={styles.clock}>
      <i aria-hidden="true"></i>TOKYO <time>{time}</time>
    </span>
  );
};
