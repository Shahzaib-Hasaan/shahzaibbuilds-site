'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMagnetic } from '../_hooks/useMagnetic';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => <HeroPoster />,
});

function HeroPoster() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-full text-[color:var(--accent)]/70"
      aria-hidden
    >
      <defs>
        <radialGradient id="hp-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* left cluster (biology motif — circular node) */}
      <g opacity="0.55">
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const r = 70 + Math.sin(i) * 16;
          const cx = 220 + Math.cos(a) * r;
          const cy = 300 + Math.sin(a) * r;
          return <circle key={`l-${i}`} cx={cx} cy={cy} r={2.2} fill="currentColor" />;
        })}
      </g>
      {/* right cluster (AI motif — neural grid) */}
      <g>
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <circle
              key={`r-${row}-${col}`}
              cx={360 + col * 28}
              cy={210 + row * 28}
              r={2.6}
              fill="currentColor"
            />
          )),
        )}
      </g>
      {/* connecting threads */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.25">
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`c-${i}`}
            x1={220 + Math.cos(i) * 60}
            y1={300 + Math.sin(i * 1.4) * 60}
            x2={360 + (i % 6) * 28}
            y2={210 + Math.floor(i / 6) * 28}
          />
        ))}
      </g>
      <rect width="600" height="600" fill="url(#hp-fade)" />
    </svg>
  );
}

export default function HeroSection() {
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.4, radius: 130 });

  return (
    <section className="relative min-h-[100svh] grain overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs sm:text-sm text-[color:var(--text-muted)] tracking-[0.18em] uppercase mb-6"
          >
            <span className="text-[color:var(--accent)]">●</span>{' '}
            Pre-med → AI · Lahore, Pakistan
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif text-[clamp(2.8rem,6.4vw,5.4rem)] leading-[1.02] tracking-tight text-[color:var(--text)] mb-6"
          >
            I was supposed to be{' '}
            <span className="line-through decoration-[color:var(--text-muted)]/60 decoration-[0.08em] underline-offset-[0.15em] text-[color:var(--text-muted)]">
              a doctor
            </span>
            .
            <br />
            <span className="text-[color:var(--accent)]">Instead I build AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-[color:var(--text-muted)] text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
          >
            I&apos;m Shahzaib — AI automation engineer at Automaxion, educator,
            and self-taught Linux convert. Four Python bootcamps. A co-founded AI
            club. A BS in AI from IUB. Now shipping production agents, voice
            bots, and pipelines for clients across three continents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#path" ref={ctaRef} className="btn-ink">
              See the pivot →
            </a>
            <a
              href="#work"
              className="font-mono text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors underline underline-offset-[6px] decoration-[color:var(--border-strong)]"
            >
              or jump to what I&apos;ve built
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-square w-full max-w-md mx-auto">
            {/* 3D scene only on >= md */}
            <div className="absolute inset-0 hidden md:block">
              <Hero3DScene />
            </div>
            {/* SVG poster — visible on small screens, also fallback */}
            <div className="absolute inset-0 md:hidden">
              <HeroPoster />
            </div>
            {/* portrait disc */}
            <div className="absolute bottom-0 right-0 sm:right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[color:var(--bg)] glow-rim">
              <Image
                src="/me.jpg"
                alt="Shahzaib Hassan"
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-[color:var(--text-muted)] font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">
        scroll
        <span className="w-px h-8 bg-[color:var(--border-strong)] origin-top animate-[grow_1.6s_ease-in-out_infinite_alternate]" />
      </div>
      <style jsx>{`
        @keyframes grow {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
