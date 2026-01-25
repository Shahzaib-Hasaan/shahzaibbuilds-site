'use client';

import { motion } from 'framer-motion';
import { Terminal, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-dark-surface/50">
      {/* POLISH UPGRADE #1: Better mobile spacing with px-6 to px-8 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue to-code-green flex items-center justify-center glow-blue">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              {/* POLISH UPGRADE #3: Logo text with text-white */}
              <span className="font-mono text-lg font-semibold text-white">
                shahzaib<span className="text-code-green">.</span>builds
              </span>
            </a>
            {/* POLISH UPGRADE #3: Body text with text-gray-400 */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Deploying AI employees for lean teams. No fluff, just results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* POLISH UPGRADE #3: H3 with text-white */}
            <h3 className="font-mono text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '#work', label: 'Work' },
                { href: '#services', label: 'Services' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-code-green transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="text-code-green">./</span>
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* POLISH UPGRADE #3: H3 with text-white */}
            <h3 className="font-mono text-sm font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@shahzaibai.site"
                  className="text-gray-400 hover:text-electric-blue transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  contact@shahzaibbuilds.me
                </a>
              </li>
              <li className="text-gray-400 text-sm inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lahore, Pakistan
              </li>
              <li>
                <a
                  href="https://calendly.com/shahxeebhassan/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-blue hover:text-electric-blue-hover transition-colors text-sm mt-2 group"
                >
                  Book a Call
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-400 font-mono">
              <span className="text-code-green">$</span> {currentYear} Shahzaib
              Builds. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
