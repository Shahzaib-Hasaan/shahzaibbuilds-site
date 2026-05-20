'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { projects } from '@/lib/projects';

export default function ProjectGrid() {
  const [openLens, setOpenLens] = useState<string | null>(null);

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
            What I built after the pivot
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[color:var(--text)] tracking-tight leading-tight mb-4">
            Five systems. Real clients.
          </h2>
          <p className="text-[color:var(--text-muted)] text-lg leading-relaxed">
            Production work, scrubbed of client names. Click <span className="font-mono text-[color:var(--text)]">lens</span> on any
            card to see the medical-school analog — the same problem in a
            different career.
          </p>
        </motion.div>

        <ul className="space-y-12 sm:space-y-16">
          {projects.map((p, i) => {
            const isAmber = p.accent === 'amber';
            const accent = isAmber ? 'var(--accent)' : 'var(--teal)';
            const lensOpen = openLens === p.name;
            return (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="group grid grid-cols-12 gap-4 sm:gap-8"
              >
                <div className="col-span-12 sm:col-span-2 flex sm:flex-col items-start gap-3 sm:gap-2">
                  <span
                    className="font-mono text-xs tracking-[0.18em]"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
                    {isAmber ? 'build' : 'pipeline'}
                  </span>
                </div>

                <div className="col-span-12 sm:col-span-10">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)] leading-tight mb-3">
                    {p.name}
                  </h3>
                  <p
                    className="text-lg sm:text-xl font-medium mb-6"
                    style={{ color: accent }}
                  >
                    {p.tagline}
                  </p>
                  <p className="text-[color:var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-3xl mb-6">
                    {p.story}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.lens && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpenLens(lensOpen ? null : p.name)}
                        aria-expanded={lensOpen}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[color:var(--text-faint)] hover:text-[color:var(--accent)] transition-colors"
                      >
                        lens <ArrowUpRight className={`w-3 h-3 transition-transform ${lensOpen ? 'rotate-45' : ''}`} />
                      </button>
                      {lensOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 text-sm font-serif italic text-[color:var(--text-muted)] max-w-xl border-l-2 pl-3"
                          style={{ borderColor: accent }}
                        >
                          {p.lens}
                        </motion.p>
                      )}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
