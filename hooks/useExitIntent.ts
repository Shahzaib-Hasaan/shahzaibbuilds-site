'use client';

import { useEffect, useState } from 'react';

const EXIT_INTENT_KEY = 'exitIntentShown';

interface UseExitIntentOptions {
  enabled?: boolean;
  onExitIntent: () => void;
}

/**
 * Hook to detect when user is about to leave the page
 * Triggers only once per session on desktop
 */
export const useExitIntent = ({ enabled = true, onExitIntent }: UseExitIntentOptions) => {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Check if already shown in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem(EXIT_INTENT_KEY)) {
      setHasTriggered(true);
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile: trigger when user scrolls past 85% of page height
      const handleScroll = () => {
        const scrolled = window.scrollY + window.innerHeight;
        const threshold = document.documentElement.scrollHeight * 0.85;
        if (scrolled >= threshold && !hasTriggered) {
          setHasTriggered(true);
          sessionStorage.setItem(EXIT_INTENT_KEY, 'true');
          onExitIntent();
          if ((window as any).gtag) {
            (window as any).gtag('event', 'exit_intent_shown', { trigger: 'scroll' });
          }
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Desktop: mouse leave from top of viewport (toward browser chrome/address bar)
    const handleMouseLeave = (e: MouseEvent) => {
      // relatedTarget is null when the mouse actually leaves the document
      if (e.relatedTarget === null && e.clientY <= 5 && !hasTriggered) {
        setHasTriggered(true);
        sessionStorage.setItem(EXIT_INTENT_KEY, 'true');
        onExitIntent();
        if ((window as any).gtag) {
          (window as any).gtag('event', 'exit_intent_shown', { trigger: 'mouse_leave' });
        }
      }
    };

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, hasTriggered, onExitIntent]);

  return { hasTriggered };
};
