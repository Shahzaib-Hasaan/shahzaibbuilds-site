'use client';

import { motion } from 'framer-motion';

const highlights = [
  { value: '4', label: 'Python bootcamps taught' },
  { value: '10mo', label: 'AI certificate course TA' },
  { value: '3.65', label: 'CGPA, BS AI · IUB' },
  { value: 'PM', label: 'Laptop Scheme awardee' },
];

export default function TeachingSection() {
  return (
    <section id="teaching" className="relative py-24 sm:py-32 bg-[color:var(--bg-alt)] grain">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-4">
            What I taught while I learned it
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[color:var(--text)] tracking-tight leading-tight mb-8">
            Teaching forced me to actually understand things.
          </h2>
          <div className="prose prose-lg max-w-2xl text-[color:var(--text-muted)] leading-relaxed">
            <p>
              I co-founded the{' '}
              <span className="text-[color:var(--teal)] font-medium">Neurafinity Club</span>{' '}
              at IUB, ran four online Python bootcamps for juniors and students,
              and served as teaching assistant for the second batch of a
              10-month AI certificate course — the same course I had just
              completed in the first batch.
            </p>
            <p>
              You can&apos;t explain what you don&apos;t know. So I went deep on
              the parts I needed to teach: classical ML, deep learning,
              computer vision, then later automation and agentic AI. The
              bootcamps had no marketing — students kept signing up because the
              previous cohorts told them to.
            </p>
            <p>
              I&apos;m still teaching. Most of the writing on{' '}
              <a className="accent-link" href="/blog">/blog</a> is the stuff I
              wish someone had explained to me when I was figuring it out.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--border)]"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[color:var(--bg-alt)] p-6 text-center"
            >
              <p className="font-serif text-3xl sm:text-4xl text-[color:var(--accent)] mb-1">
                {h.value}
              </p>
              <p className="text-xs sm:text-sm text-[color:var(--text-muted)] leading-tight">
                {h.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
