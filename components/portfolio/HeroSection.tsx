'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/shahzaib_builds',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Shahzaib-Hasaan',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://pk.linkedin.com/in/shahzaib-hassan-ai',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:contact@shahzaibbuilds.me',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 w-full pt-28 sm:pt-32 pb-16 sm:pb-24">
        {/* SEO-optimized H1 (visually hidden) */}
        <h1 className="sr-only">
          Shahzaib Hassan - AI Automation Engineer | Shahzaib Builds
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content - takes more space for asymmetry */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Currently badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-full text-sm font-sans text-[#0F766E]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Currently @ Automaxion
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.h2
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1C1C] leading-[1.1] mb-3"
            >
              Hey, I&apos;m Shahzaib
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-lg sm:text-xl text-[#D97706] font-medium mb-6"
            >
              AI Automation Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl mb-8"
            >
              I build AI agents, voice bots, and automation systems. Currently
              shipping production AI at{' '}
              <span className="text-[#0F766E] font-medium">Automaxion</span> in
              Lahore. Before that: four Python bootcamps, co-founding the{' '}
              <span className="text-[#0F766E] font-medium">Neurafinity Club</span>,
              and trading a pre-med future for a degree in AI.
            </motion.p>

            {/* Social links */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  className="p-2.5 rounded-lg text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#D97706]/10 transition-all duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Photo - slightly smaller for asymmetry */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Warm decorative accent behind photo */}
              <div className="absolute -inset-4 bg-[#D97706]/10 rounded-3xl -rotate-3" />
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-[22rem] rounded-2xl overflow-hidden border-2 border-[#E5E1D8] shadow-lg">
                <Image
                  src="/me.jpg"
                  alt="Shahzaib Hassan - AI Automation Engineer"
                  fill
                  priority
                  quality={85}
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#D97706] transition-colors"
        >
          <span className="text-xs font-sans">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 border-2 border-current rounded-full flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-current rounded-full" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
