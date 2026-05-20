'use client';

import { motion } from 'framer-motion';

interface TimelineRow {
  year: string;
  medical: { title: string; note?: string };
  ai: { title: string; note?: string };
}

const rows: TimelineRow[] = [
  {
    year: '2018',
    medical: { title: 'Move to Bahawalpur', note: 'FSc pre-medical · biology, chemistry, physics' },
    ai: { title: '—' },
  },
  {
    year: '2020',
    medical: { title: 'FSc complete', note: 'Pre-med track. Frogs dissected, organic reactions memorized.' },
    ai: { title: '5–6 months of research', note: 'Reading everything I could find about what to do next.' },
  },
  {
    year: '2021',
    medical: { title: 'The fork', note: 'Pre-med future vs a degree no one in my town had heard of.' },
    ai: { title: 'BS Artificial Intelligence, IUB', note: 'Started from zero. Classmates had been coding since high school.' },
  },
  {
    year: '2022',
    medical: { title: '—' },
    ai: { title: 'Ubuntu, daily, for 2 years', note: 'A senior recommended it. It broke things; I fixed them. Stopped fearing the terminal.' },
  },
  {
    year: '2023',
    medical: { title: '—' },
    ai: { title: 'Neurafinity Club, co-founded', note: 'Plus the first of four Python bootcamps. Teaching forced understanding.' },
  },
  {
    year: '2024',
    medical: { title: '—' },
    ai: { title: 'TA for the AI certificate course', note: 'Taught the second batch of the same course I’d just finished — ML, deep learning, computer vision.' },
  },
  {
    year: '2025',
    medical: { title: '—' },
    ai: { title: 'Hired by Automaxion · 7th semester', note: 'Before I’d graduated. Production AI for real clients.' },
  },
  {
    year: '2026',
    medical: { title: '—' },
    ai: { title: 'Graduated · CGPA 3.65', note: 'Outperformed peers who’d been coding since school. Still rebuilding LinkedIn from zero.' },
  },
];

export default function AboutTimeline() {
  return (
    <section id="path" className="relative py-24 sm:py-32 md:py-40 bg-[color:var(--bg-alt)] grain">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-4">
            The Path Not Taken
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[color:var(--text)] tracking-tight leading-tight">
            Two careers.
            <br />
            One person.
            <br />
            <span className="text-[color:var(--text-muted)]">A five-month decision in between.</span>
          </h2>
        </motion.div>

        {/* legend */}
        <div className="grid grid-cols-12 gap-4 sm:gap-8 mb-10 text-xs font-mono uppercase tracking-[0.18em]">
          <div className="col-span-5 text-[color:var(--text-faint)] text-right">
            ◌ if I had stayed
          </div>
          <div className="col-span-2 text-center text-[color:var(--text-faint)]">year</div>
          <div className="col-span-5 text-[color:var(--accent)]">
            ● what actually happened
          </div>
        </div>

        <ol className="relative">
          {/* center spine */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[color:var(--border-strong)]"
          />
          {rows.map((row, i) => {
            const isFork = row.year === '2021';
            return (
              <motion.li
                key={row.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
                className="grid grid-cols-12 gap-4 sm:gap-8 items-start py-7"
              >
                {/* medical side */}
                <div className="col-span-5 text-right">
                  <div
                    className={`inline-block ${
                      row.medical.title === '—'
                        ? 'text-[color:var(--text-faint)]/40'
                        : 'text-[color:var(--text-faint)] line-through decoration-[color:var(--text-faint)]/40'
                    }`}
                  >
                    <p className="font-serif text-lg sm:text-xl leading-snug">
                      {row.medical.title}
                    </p>
                    {row.medical.note && (
                      <p className="text-xs sm:text-sm font-sans mt-1 max-w-xs ml-auto no-underline">
                        {row.medical.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* year + node */}
                <div className="col-span-2 flex flex-col items-center relative">
                  <span
                    className={`relative z-10 grid place-items-center w-10 h-10 rounded-full text-[10px] font-mono tracking-[0.14em] ${
                      isFork
                        ? 'bg-[color:var(--accent)] text-[color:var(--bg)] shadow-[0_0_0_6px_rgba(217,119,6,0.12)]'
                        : 'bg-[color:var(--bg)] text-[color:var(--text-muted)] border border-[color:var(--border-strong)]'
                    }`}
                  >
                    {row.year.slice(-2)}
                  </span>
                  <span className="block mt-2 text-[10px] font-mono text-[color:var(--text-faint)]">
                    {row.year}
                  </span>
                </div>

                {/* AI side */}
                <div className="col-span-5">
                  <div
                    className={
                      row.ai.title === '—'
                        ? 'text-[color:var(--text-faint)]/30'
                        : 'text-[color:var(--text)]'
                    }
                  >
                    <p className="font-serif text-lg sm:text-xl leading-snug">
                      {row.ai.title}
                    </p>
                    {row.ai.note && (
                      <p className="text-xs sm:text-sm font-sans text-[color:var(--text-muted)] mt-1 max-w-xs">
                        {row.ai.note}
                      </p>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* coda */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 sm:mt-24 pl-6 border-l-[3px] border-[color:var(--accent)] max-w-2xl mx-auto"
        >
          <p className="font-serif text-2xl sm:text-3xl text-[color:var(--text)] leading-snug">
            I didn&apos;t inherit this path. I researched it for five months
            and chose it.
          </p>
          <footer className="mt-3 text-sm font-mono text-[color:var(--text-muted)]">
            — written from Ahmadpur East to Lahore, target: Gulf or Europe
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
