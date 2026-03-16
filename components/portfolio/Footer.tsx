'use client';

import { Twitter, Github, Instagram, Mail, MapPin } from 'lucide-react';

const socialLinks = [
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com/shahzaib_builds',
    icon: Twitter,
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
];

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF5] border-t border-[#E5E1D8]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Branding */}
          <a href="/" className="font-serif text-xl text-[#1C1C1C]">
            shahzaib<span className="text-[#D97706]">.</span>builds
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-[#E5E1D8] flex items-center justify-center text-[#6B7280] hover:text-[#D97706] hover:border-[#D97706]/40 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E1D8] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-sans text-[#6B7280]">
            {/* Copyright */}
            <p>&copy; 2026 Shahzaib Hassan</p>

            {/* Meta info */}
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Lahore, Pakistan
              </span>
              <a
                href="mailto:contact@shahzaibbuilds.me"
                className="inline-flex items-center gap-1.5 hover:text-[#D97706] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@shahzaibbuilds.me
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
