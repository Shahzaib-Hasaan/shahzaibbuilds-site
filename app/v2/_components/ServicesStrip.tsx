'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Workflow Automation',
    line: 'n8n, Make.com, Zapier. End-to-end pipelines that actually run.',
  },
  {
    title: 'AI Voice Agents',
    line: 'VAPI, Retell, ElevenLabs. Inbound, outbound, in your stack.',
  },
  {
    title: 'Custom AI Applications',
    line: 'Next.js + Python + LLM APIs. Built from scratch when no platform fits.',
  },
];

export default function ServicesStrip() {
  return (
    <section className="relative py-20 sm:py-24 bg-[color:var(--bg)] border-t border-[color:var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-3">
            Available for
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[color:var(--text)] leading-tight">
            Selective freelance + consulting work.
          </h2>
          <p className="mt-3 text-sm text-[color:var(--text-muted)]">
            Three things I do well. If your problem rhymes with one of them,
            email me.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)]">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="bg-[color:var(--bg)] p-8 hover:bg-[color:var(--bg-alt)] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
                0{i + 1}
              </span>
              <h3 className="font-serif text-2xl text-[color:var(--text)] mt-2 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">
                {s.line}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
