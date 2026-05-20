'use client';

import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { useMagnetic } from '../_hooks/useMagnetic';

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com/shahzaib_builds', icon: Twitter },
  { label: 'LinkedIn', href: 'https://pk.linkedin.com/in/shahzaib-hassan-ai', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/Shahzaib-Hasaan', icon: Github },
  { label: 'Instagram', href: 'https://instagram.com/shahzaib_builds', icon: Instagram },
];

export default function ContactSection() {
  const emailRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3, radius: 140 });

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[color:var(--bg-alt)] grain border-t border-[color:var(--border)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-4">
            What I&apos;m open to
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[color:var(--text)] leading-tight mb-6">
            Scholarships.
            <br />
            Research collaboration.
            <br />
            Freelance.
            <br />
            <span className="text-[color:var(--text-muted)]">A good email.</span>
          </h2>
          <p className="text-[color:var(--text-muted)] text-lg leading-relaxed max-w-xl mx-auto mb-12">
            I read every message. Email is best. If you&apos;re a scholarship
            reviewer, recruiter, or want to teach together — say hi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <a
            ref={emailRef}
            href="mailto:contact@shahzaibbuilds.me"
            className="inline-flex items-center gap-3 group"
          >
            <span className="w-12 h-12 rounded-full bg-[color:var(--accent)]/10 grid place-items-center group-hover:bg-[color:var(--accent)]/20 transition-colors">
              <Mail className="w-5 h-5 text-[color:var(--accent)]" />
            </span>
            <span className="font-mono text-lg sm:text-xl text-[color:var(--text)] group-hover:text-[color:var(--accent)] transition-colors">
              contact@shahzaibbuilds.me
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-4">
            elsewhere
          </p>
          <div className="flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-full bg-[color:var(--bg)] border border-[color:var(--border)] grid place-items-center text-[color:var(--text-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
