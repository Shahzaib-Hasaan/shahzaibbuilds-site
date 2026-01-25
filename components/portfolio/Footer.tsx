'use client';

import { Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-surface border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-mono text-xl font-bold text-white mb-4">
              shahzaib<span className="text-code-green">.</span>builds
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Deploying AI employees for lean teams. Automating operations with intelligent agents.
            </p>
          </div>

          {/* Contact */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-mono text-sm font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@shahzaibbuilds.me"
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
            </ul>
          </div>

          {/* Social */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-mono text-sm font-semibold text-white mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: 'https://twitter.com/shahzaib_builds', label: 'Twitter' },
                { icon: Instagram, href: 'https://instagram.com/shahzaib_builds', label: 'Instagram' },
                { icon: Linkedin, href: 'https://linkedin.com/in/shahxeebhassan', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-bg border border-white/10 flex items-center justify-center text-gray-400 hover:text-electric-blue hover:border-electric-blue transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-400 font-mono text-center">
              <span className="text-code-green">$</span> {currentYear} Shahzaib Builds. Shahzaib Hassan - AI Automation Engineer & n8n Expert based in Lahore, Pakistan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
