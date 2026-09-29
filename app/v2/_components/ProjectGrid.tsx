'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { openSource, clientWork } from '@/lib/projects';

const chip =
  'font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-muted)]';

export default function ProjectGrid() {
  return (
    <section id="work" className="relative py-24 sm:py-32 md:py-40 bg-[color:var(--bg)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-4">
            Projects
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[color:var(--text)] tracking-tight leading-tight mb-4">
            Built in the open.
          </h2>
          <p className="text-[color:var(--text-muted)] text-lg leading-relaxed">
            The code for these is public. Read it, run it, fork it.
          </p>
        </motion.div>

        <ul className="space-y-12 sm:space-y-16">
          {openSource.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 sm:gap-8"
            >
              <div className="col-span-12 sm:col-span-2 flex sm:flex-col items-start gap-3 sm:gap-2">
                <span className="font-mono text-xs tracking-[0.18em] text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
                  {p.license}
                </span>
              </div>

              <div className="col-span-12 sm:col-span-10">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)] leading-tight mb-3">
                  {p.name}
                </h3>
                <p className="text-lg sm:text-xl font-medium mb-5 text-[color:var(--accent)]">{p.tagline}</p>
                <p className="text-[color:var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-3xl mb-5">
                  {p.details}
                </p>
                <ul className="mb-6 space-y-1.5 max-w-3xl">
                  {p.highlights.map((h) => (
                    <li key={h} className="text-[color:var(--text-muted)] text-sm sm:text-base leading-relaxed pl-4 relative">
                      <span className="absolute left-0 text-[color:var(--accent)]" aria-hidden="true">
                        ·
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className={chip}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-[0.16em] text-[color:var(--text)] hover:text-[color:var(--accent)] transition-colors"
                  >
                    View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  {p.extra && (
                    <a
                      href={p.extra.href}
                      className="inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-[0.16em] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors"
                    >
                      {p.extra.label} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mt-20 sm:mt-24 grid grid-cols-12 gap-4 sm:gap-8"
        >
          <div className="col-span-12 sm:col-span-2">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
              client work
            </span>
          </div>
          <div className="col-span-12 sm:col-span-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[color:var(--text)] leading-tight mb-2">
              Production systems at Automaxion
            </h3>
            <p className="text-[color:var(--text-muted)] text-base leading-relaxed mb-6 max-w-3xl">
              Built for clients, so named by category only.
            </p>
            <ul className="divide-y divide-[color:var(--border-strong)] border-y border-[color:var(--border-strong)] max-w-3xl">
              {clientWork.map((c) => (
                <li key={c.name} className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                  <span className="text-[color:var(--text)] text-base">{c.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] sm:text-right">
                    {c.stack}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
