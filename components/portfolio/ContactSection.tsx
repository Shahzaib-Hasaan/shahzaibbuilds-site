'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const socials = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/shahzaib_builds',
    icon: Twitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://pk.linkedin.com/in/shahzaib-hassan-ai',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Shahzaib-Hasaan',
    icon: Github,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/shahzaib_builds',
    icon: Instagram,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@shahzaib_builds',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#F0ECE3]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1C1C] mb-6">
            Say hello
          </h2>
          <p className="text-[#6B7280] font-sans text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10">
            Open to scholarship recommendations, research collaboration,
            freelance projects, or just a hello. I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Email — prominent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-12"
        >
          <a
            href="mailto:contact@shahzaibbuilds.me"
            className="inline-flex items-center gap-3 group"
          >
            <span className="w-11 h-11 rounded-full bg-[#D97706]/10 flex items-center justify-center group-hover:bg-[#D97706]/20 transition-colors">
              <Mail className="w-5 h-5 text-[#D97706]" />
            </span>
            <span className="font-mono text-lg sm:text-xl text-[#1C1C1C] group-hover:text-[#D97706] transition-colors">
              contact@shahzaibbuilds.me
            </span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <p className="text-sm text-[#6B7280] font-sans mb-5">
            Find me elsewhere
          </p>
          <div className="flex items-center justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-white border border-[#E5E1D8] flex items-center justify-center text-[#6B7280] hover:text-[#D97706] hover:border-[#D97706]/40 hover:shadow-sm transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
