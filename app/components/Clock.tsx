"use client";
import { useSyncExternalStore } from 'react';
import styles from '../styles/page.module.scss';

const format = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });

// Re-read the time every 10 seconds
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 10000);
  return () => clearInterval(id);
};

/** Live Tokyo time shown in the header. Renders "--:--" on the server to avoid hydration mismatch. */
export const Clock = () => {
  const time = useSyncExternalStore(subscribe, format, () => '--:--');

  return (
    <span className={styles.clock}>
      <i aria-hidden="true"></i>TOKYO <time>{time}</time>
    </span>
  );
};
