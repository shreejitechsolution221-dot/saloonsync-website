'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

/** Reset reused catch-all pages after Next has committed the destination. */
export function RouteNavigation() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    const positionPage = () => {
      const hash = window.location.hash;
      if (hash) {
        try {
          document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
        } catch { /* Leave malformed fragment navigation to the browser. */ }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };
    positionPage();
    // Next's own navigation effects run during commit; finish after those effects.
    firstFrame = requestAnimationFrame(() => {
      positionPage();
      secondFrame = requestAnimationFrame(positionPage);
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [pathname]);

  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    function samePage(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin === location.origin && destination.pathname === location.pathname && destination.search === location.search && !destination.hash) {
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      }
    }
    document.addEventListener('click', samePage, true);
    return () => { history.scrollRestoration = previous; document.removeEventListener('click', samePage, true); };
  }, []);
  return null;
}
