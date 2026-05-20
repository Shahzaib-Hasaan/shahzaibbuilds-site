'use client';

import { Github, Linkedin, Mail, MapPin, Twitter, Instagram } from 'lucide-react';
import MagneticLink from './MagneticLink';

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com/shahzaib_builds', icon: Twitter },
  { label: 'LinkedIn', href: 'https://pk.linkedin.com/in/shahzaib-hassan-ai', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/Shahzaib-Hasaan', icon: Github },
  { label: 'Instagram', href: 'https://instagram.com/shahzaib_builds', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bg-alt)]/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <a href="/" className="font-serif text-xl text-[color:var(--text)]">
              shahzaib<span className="text-[color:var(--accent)]">.</span>builds
            </a>
            <p className="mt-3 text-sm text-[color:var(--text-muted)] leading-relaxed max-w-xs">
              Personal site, work log, and writing. Built and rebuilt in the
              open. Currently rebuilding LinkedIn from zero — long story.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-3">
              Navigate
            </p>
            <ul className="space-y-2 text-sm text-[color:var(--text-muted)]">
              <li><a href="#work" className="hover:text-[color:var(--text)]">Work</a></li>
              <li><a href="#path" className="hover:text-[color:var(--text)]">The pivot</a></li>
              <li><a href="#teaching" className="hover:text-[color:var(--text)]">Teaching</a></li>
              <li><a href="/blog" className="hover:text-[color:var(--text)]">Writing</a></li>
              <li><a href="/v1" className="hover:text-[color:var(--text)]">v1 archive</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-3">
              Elsewhere
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <MagneticLink
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  magnetic={{ strength: 0.35, radius: 70, scale: 1.1 }}
                  className="w-9 h-9 rounded-full border border-[color:var(--border)] grid place-items-center text-[color:var(--text-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </MagneticLink>
              ))}
            </div>
          </div>
        </div>

        <div className="rule mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[color:var(--text-faint)]">
          <span>© {new Date().getFullYear()} Shahzaib Hassan · all human, no LLM padding</span>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Lahore, Pakistan
            </span>
            <a
              href="mailto:contact@shahzaibbuilds.me"
              className="inline-flex items-center gap-1.5 hover:text-[color:var(--text)] transition-colors"
            >
              <Mail className="w-3 h-3" /> contact@shahzaibbuilds.me
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
