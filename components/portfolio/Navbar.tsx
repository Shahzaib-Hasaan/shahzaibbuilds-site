'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/80 backdrop-blur-md shadow-2xl border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-electric-blue to-code-green flex items-center justify-center glow-blue">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-mono text-base sm:text-lg font-semibold text-white group-hover:text-code-green transition-colors">
              shahzaib<span className="text-code-green">.</span>builds
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-gray-400 hover:text-code-green transition-colors relative group"
              >
                <span className="text-code-green opacity-0 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                {link.label}
              </a>
            ))}
            <a
              href="https://calendly.com/shahxeebhassan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 min-h-[44px] bg-electric-blue hover:bg-electric-blue-hover text-white text-sm font-medium rounded-lg transition-all duration-200 glow-blue hover:scale-105 inline-flex items-center justify-center"
            >
              Book Audit
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 min-h-[44px] min-w-[44px] text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* POLISH UPGRADE #4: Enhanced mobile menu with better backdrop blur */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-mono text-sm text-gray-400 hover:text-code-green transition-colors py-3 px-3 rounded-lg hover:bg-white/5 min-h-[44px] flex items-center"
                >
                  <span className="text-code-green mr-1">./</span>
                  {link.label}
                </a>
              ))}
              <a
                href="https://calendly.com/shahxeebhassan/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 min-h-[44px] bg-electric-blue hover:bg-electric-blue-hover text-white text-sm font-medium rounded-lg transition-colors mt-4"
              >
                Book Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
