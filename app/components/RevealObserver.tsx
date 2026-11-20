"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds `data-shown` to every `[data-reveal]` element once it scrolls into view.
 * Re-scans on route changes and when new nodes are added to the DOM.
 */
export const RevealObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    const selector = '[data-reveal]:not([data-shown])';

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll(selector).forEach((el) => el.setAttribute('data-shown', ''));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', '');
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0: tall elements (e.g. long articles) can never reach a ratio-based threshold
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    const scan = () => document.querySelectorAll(selector).forEach((el) => io.observe(el));
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
};
