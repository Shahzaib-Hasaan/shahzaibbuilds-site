'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPosition < windowHeight * 0.3) {
        setIsVisible(false);
        setIsDismissed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="sticky-cta"
        >
          <div className="glass-card rounded-xl p-3 flex items-center gap-3 shadow-2xl">
            <a
              href="https://calendly.com/shahxeebhassan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-electric-blue hover:bg-electric-blue-hover text-white font-medium rounded-lg transition-all duration-200 glow-blue min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">Book Free Audit</span>
            </a>
            <button
              onClick={handleDismiss}
              className="p-2 rounded-lg hover:bg-dark-surface transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-light-muted" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
