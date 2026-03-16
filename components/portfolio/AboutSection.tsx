'use client';

import { motion } from 'framer-motion';

const highlights = [
  { value: '3.65', label: 'CGPA' },
  { value: '4', label: 'Python bootcamps taught' },
  { value: '1', label: 'Club co-founded' },
  { value: '7th', label: 'Semester hired' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 bg-warm-bg">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight mb-16 sm:mb-20">
            The story so far
          </h2>
        </motion.div>

        {/* Story paragraphs */}
        <div className="space-y-8 text-ink/90 text-lg sm:text-xl leading-relaxed font-sans">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={1}
          >
            I grew up in Ahmadpur East, a small town in southern Punjab. No career
            counseling, no tech scene, no one around who worked in tech. Where I come
            from, every kid grows up dreaming of becoming a doctor. That was my dream
            too. So I studied Biology all the way through intermediate. Dissecting frogs,
            memorizing organic reactions, the whole deal.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={2}
          >
            But I&apos;d been obsessed with computers since I was a kid. I convinced my
            family to buy one during my school years. It started with gaming, then I
            taught myself everything about how computers and the internet actually work.
            After finishing FSc, I spent 5-6 months researching what to do next. Every
            path I explored pointed to one thing: Artificial Intelligence.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={3}
          >
            So I made the switch. Enrolled in BS Artificial Intelligence at Islamia
            University of Bahawalpur. Coming from a pre-medical background with no
            programming experience, starting from zero while my classmates had been
            coding for years.
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={4}
            className="relative my-12 sm:my-16 pl-6 border-l-[3px] border-amber-accent"
          >
            <p className="font-serif text-2xl sm:text-3xl text-ink leading-snug italic">
              A senior recommended I use Ubuntu as my daily OS. So I did. For two
              full years. It broke things, I fixed them, and somewhere in that process
              I stopped being afraid of the terminal.
            </p>
          </motion.blockquote>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={5}
          >
            It worked. I graduated with a{' '}
            <span className="font-semibold text-ink">3.65 CGPA</span>, outperforming
            classmates who had been writing code since high school. But grades were only
            part of it. I wanted to teach what I was learning.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={6}
          >
            I co-founded the{' '}
            <span className="font-semibold text-teal-accent">Neurafinity Club</span>,
            ran four Python bootcamps, and served as a teaching assistant for our AI
            course. Teaching forced me to really understand things. You can&apos;t
            explain what you don&apos;t know.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={7}
          >
            By my 7th semester,{' '}
            <span className="font-semibold text-ink">
              Automaxion hired me before I even graduated
            </span>
            . Now I&apos;m shipping production systems for real clients. Autonomous
            agents, data pipelines, AI tools that people actually use every day.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={8}
            className="text-ink-muted text-base sm:text-lg"
          >
            This is just the beginning.
          </motion.p>
        </div>

        {/* Highlight callouts */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              custom={i + 1}
              className="warm-card rounded-xl p-5 sm:p-6 text-center"
            >
              <span className="block font-serif text-3xl sm:text-4xl text-amber-accent mb-1">
                {item.value}
              </span>
              <span className="block text-ink-muted text-sm leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
