'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'The pivot' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#blog', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl text-[color:var(--text)]"
        >
          shahzaib<span className="text-[color:var(--accent)]">.</span>builds
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-[color:var(--text-muted)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[color:var(--text)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden sm:inline-flex btn-ink"
          >
            Say hello
          </Link>
        </div>
      </div>
    </header>
  );
}
