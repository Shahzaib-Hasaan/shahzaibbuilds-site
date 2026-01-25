'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

const socials = [
  {
    platform: 'X (Twitter)',
    handle: '@shahzaib_builds',
    url: 'https://twitter.com/shahzaib_builds',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    handle: '@shahzaib_builds',
    url: 'https://instagram.com/shahzaib_builds',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    handle: 'Shahzaib Hassan',
    url: 'https://linkedin.com/in/shahzaib-hassan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    handle: '@shahzaib_builds',
    url: 'https://tiktok.com/@shahzaib_builds',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const testimonial = {
  quote:
    "Shahzaib transformed our entire lead qualification process. The AI voice agent he built handles over 200 calls daily and the quality of leads coming through has significantly improved. Highly recommend his work.",
  author: 'Automaxion Team',
  role: 'AI Automation Agency',
  rating: 5,
};

export default function SocialProofSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Better mobile spacing with px-6 to px-8 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-sm text-code-green mb-4">
            {'// FOLLOW THE BUILD'}
          </span>
          {/* H2 with text-white for maximum contrast */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Connect With Me
          </h2>
          {/* Body text with text-gray-400 */}
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Building in public. Follow the journey on social.
          </p>
        </motion.div>

        {/* FIX: Testimonial with proper quote styling - removed decorative quote icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          {/* Enhanced glass card without decorative quote mark */}
          <div className="relative glass-card rounded-2xl p-8 sm:p-12 premium-border overflow-hidden">
            {/* Subtle decorative element in corner instead of large quote */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-electric-blue/10 to-transparent rounded-bl-full" />

            <blockquote className="relative z-10">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-code-green fill-code-green" />
                ))}
              </div>
              {/* Quote text with proper opening quote character */}
              <p className="text-lg sm:text-xl text-white leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-code-green flex items-center justify-center text-white font-mono font-bold glow-blue">
                  A
                </div>
                <div>
                  {/* Author with text-white */}
                  <p className="font-mono font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Social links with enhanced glass cards and spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-xl p-4 sm:p-6 premium-border interactive-card text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-lg bg-white/5 text-gray-400 group-hover:bg-electric-blue/10 group-hover:text-electric-blue transition-all">
                {social.icon}
              </div>
              {/* Platform name with text-white */}
              <p className="font-mono text-sm font-medium text-white group-hover:text-electric-blue transition-colors">
                {social.platform}
              </p>
              <p className="text-xs text-gray-400 mt-1">{social.handle}</p>
              <ExternalLink className="w-4 h-4 mx-auto mt-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
