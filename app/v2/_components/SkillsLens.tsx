'use client';

import { motion } from 'framer-motion';

interface Cluster {
  title: string;
  rhyme: string;
  items: string[];
}

const clusters: Cluster[] = [
  {
    title: 'Automation',
    rhyme: 'Like building a treatment protocol — same input, predictable outcome.',
    items: ['n8n (self-hosted)', 'Make.com', 'Zapier', 'Airtable', 'Instantly', 'ActiveCampaign'],
  },
  {
    title: 'AI agents & LLMs',
    rhyme: 'Differential diagnosis at scale — ask the right questions, narrow the answers.',
    items: ['OpenAI', 'Claude', 'Mistral', 'CrewAI', 'Agno', 'Function calling'],
  },
  {
    title: 'Voice AI',
    rhyme: 'The bedside manner. Tone and timing matter more than the words.',
    items: ['VAPI', 'Retell', 'Bland AI', 'ElevenLabs'],
  },
  {
    title: 'Engineering',
    rhyme: 'Anatomy of a system: every part connects, nothing is decoration.',
    items: ['Python', 'TypeScript', 'Next.js', 'React', 'Node', 'Postgres'],
  },
  {
    title: 'Infrastructure',
    rhyme: 'Like running your own pharmacy — you stock it, you maintain it, you own it.',
    items: ['Linux / Ubuntu', 'Docker', 'Nginx', 'Self-hosted VPS', 'Hetzner', 'DigitalOcean'],
  },
  {
    title: 'Teaching',
    rhyme: 'Residency rounds: you learn it by teaching it to someone newer.',
    items: ['4 Python bootcamps', 'AI certificate TA', 'Neurafinity workshops', 'YouTube lectures'],
  },
];

export default function SkillsLens() {
  return (
    <section className="relative py-24 sm:py-32 bg-[color:var(--bg)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-4">
            What I work in
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[color:var(--text)] tracking-tight leading-tight">
            Six clusters.
            <br />
            Each one rhymes with something I almost learned.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--border)]">
          {clusters.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="bg-[color:var(--bg)] p-8 sm:p-9 hover:bg-[color:var(--bg-alt)] transition-colors"
            >
              <h3 className="font-serif text-2xl text-[color:var(--text)] mb-2">
                {c.title}
              </h3>
              <p className="text-sm italic text-[color:var(--text-muted)] mb-5 leading-relaxed">
                {c.rhyme}
              </p>
              <ul className="space-y-1.5">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs text-[color:var(--text)] tracking-tight"
                  >
                    <span className="text-[color:var(--accent)] mr-2">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
