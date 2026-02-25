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

    // Don't trigger on mobile (unreliable)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasTriggered) {
        setHasTriggered(true);
        sessionStorage.setItem(EXIT_INTENT_KEY, 'true');
        onExitIntent();

        // Track with GA4
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'exit_intent_shown');
        }
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [enabled, hasTriggered, onExitIntent]);

  return { hasTriggered };
};
