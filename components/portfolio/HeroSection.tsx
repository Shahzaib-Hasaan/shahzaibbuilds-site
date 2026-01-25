'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Clock } from 'lucide-react';
import Image from 'next/image';

const phrases = [
  'Building AI Agents',
  'Automating Workflows',
  'Saving 20+ Hours/Week',
  'Deploying Voice Bots',
];

export default function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const speed = isDeleting ? 30 : 80;

    if (!isDeleting && displayText === phrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? phrase.substring(0, prev.length - 1)
          : phrase.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-8 sm:pb-12">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/80 to-dark-bg" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-code-green/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-8 py-4 sm:py-8 lg:py-6 pt-20 sm:pt-24 lg:pt-20">
        {/* SEO-optimized H1 (visually hidden but read by search engines) */}
        <h1 className="sr-only">
          Shahzaib Hassan - AI Automation Engineer | Shahzaib Builds | n8n & Python Expert in Lahore, Pakistan
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-3 mb-4 lg:mb-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative mx-auto w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-dark-bg shadow-[0_0_40px_rgba(59,130,246,0.3)] ring-2 ring-electric-blue/50 ring-offset-4 ring-offset-dark-bg mb-4 lg:mb-6 overflow-hidden">
                <Image
                  src="/me.jpg"
                  alt="Shahzaib Hassan - AI Automation Engineer"
                  width={192}
                  height={192}
                  priority
                  quality={85}
                  className="w-full h-full rounded-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center -4%',
                    transform: 'scale(1.15)'
                  }}
                />
              </div>
              <span className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 md:w-7 md:h-7 bg-emerald-500 rounded-full border-4 border-dark-bg"></span>
            </motion.div>

            <div className="inline-flex items-center gap-3 px-4 py-2.5 glass-card rounded-full">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-code-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-code-green"></span>
                </span>
                <span className="text-xs sm:text-sm text-white font-mono">
                  Currently @ <span className="text-code-green font-semibold">Automaxion</span>
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-mono font-bold mb-3 lg:mb-4 px-4 text-white">
            <span className="text-gray-400">{'>'}</span>{' '}
            <span>{displayText}</span>
            <span className="terminal-cursor" />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 lg:mb-7 leading-relaxed px-4"
          >
            I replace manual operations with intelligent agents, saving businesses{' '}
            <span className="text-code-green font-semibold">20+ hours/week</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <a
              href="https://calendly.com/shahxeebhassan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto btn-cta-primary inline-flex items-center justify-center gap-2"
            >
              <span className="text-sm sm:text-base font-semibold">Book a 15-Min Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto btn-secondary inline-flex items-center justify-center gap-2"
            >
              <span className="text-sm sm:text-base">View Recent Deploys</span>
            </a>
          </motion.div>

          <div className="mt-6 lg:mt-8 mb-4 lg:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-3xl mx-auto px-4">
            {[
              { icon: Bot, label: 'Voice Agents', value: 'Deployed' },
              { icon: Zap, label: 'Workflows', value: 'Automated' },
              { icon: Clock, label: 'Hours Saved', value: '500+' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 lg:p-5 hover:scale-[1.02] transition-transform duration-300 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <stat.icon className="w-6 h-6 text-electric-blue mb-3 mx-auto" />
                <span className="block text-2xl sm:text-3xl font-mono font-bold text-white">{stat.value}</span>
                <span className="block text-sm text-gray-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-code-green transition-colors"
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-current rounded-full flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-current rounded-full" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
