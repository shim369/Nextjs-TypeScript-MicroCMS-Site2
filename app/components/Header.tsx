"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../styles/page.module.scss';
import { Logo } from './Logo';
import { LinkList } from './LinkList';
import { Clock } from './Clock';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Close the menu after navigating
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle(styles.open, isNavOpen);

    return () => {
      document.body.classList.remove(styles.open);
    };
  }, [isNavOpen]);

  // Close with Escape
  useEffect(() => {
    if (!isNavOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsNavOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isNavOpen]);

  return (
    <>
      <header className={styles.header} data-testid="header">
        <nav className={`${styles.wrap} ${styles.nav}`} aria-label="Main">
          <p className={styles.logo}>
            <Logo />
          </p>
          <div className={styles.menu}>
            <LinkList />
          </div>
          <div className={styles.navRight}>
            <Clock />
            <button
              type="button"
              className={styles.burger}
              onClick={toggleNavClick}
              aria-expanded={isNavOpen}
              aria-controls="overlayMenu"
              data-testid="jsNavToggle"
            >
              {isNavOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </nav>
      </header>

      <div id="overlayMenu" className={styles.overlay} aria-hidden={!isNavOpen}>
        <nav aria-label="Mobile">
          <LinkList variant="big" />
        </nav>
        <div className={`${styles.ext} ${styles.mono}`}>
          <a href="https://github.com/shim369" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://sohtani.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">Tech Blog ↗</a>
        </div>
      </div>
    </>
  );
};
