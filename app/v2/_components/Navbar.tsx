'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#building', label: 'Building' },
  { href: '#path', label: 'The pivot' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#blog', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? 'bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-[color:var(--text)]" onClick={() => setOpen(false)}>
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
          <Link href="#contact" className="!hidden sm:!inline-flex btn-ink">
            Say hello
          </Link>
          {/* mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-[color:var(--text)]"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      {open && (
        <nav className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--bg)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-base text-[color:var(--text-muted)] hover:text-[color:var(--accent)] py-3 border-b border-[color:var(--border)]/60 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-ink mt-5 justify-center"
            >
              Say hello
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
