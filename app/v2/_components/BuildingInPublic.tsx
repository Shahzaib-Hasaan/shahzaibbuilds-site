'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { posts, products } from '@/lib/building';

const statusStyles: Record<string, string> = {
  live: 'text-[color:var(--bg)] bg-[color:var(--accent)]',
  building: 'text-[color:var(--accent)] border border-[color:var(--accent)]/40',
  planned: 'text-[color:var(--text-faint)] border border-[color:var(--border-strong)]',
};

export default function BuildingInPublic() {
  return (
    <section id="building" className="relative py-24 sm:py-32 bg-[color:var(--bg-alt)] border-t border-[color:var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-3">
            Building in public
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[color:var(--text)] tracking-tight leading-tight">
            I build it, then I show you how.
          </h2>
          <p className="mt-3 text-[color:var(--text-muted)]">
            Live products I ship on the side, and the breakdowns I post as I go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)] mb-16">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="bg-[color:var(--bg)] p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-2xl text-[color:var(--text)]">{p.name}</h3>
                <span className={`text-[10px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-sm text-[color:var(--text-muted)] leading-relaxed flex-1">{p.blurb}</p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--accent)] hover:gap-2 transition-all"
                >
                  Visit <ArrowUpRight size={15} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {posts.length > 0 && (
          <>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-6">
              Latest, in public
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <a
                  key={post.title}
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--bg)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[color:var(--accent)]">{post.type}</span>
                    <h4 className="font-serif text-lg text-[color:var(--text)] mt-1 leading-snug group-hover:text-[color:var(--accent)] transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        <a
          href="https://www.linkedin.com/in/shahzaibbuilds/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-[color:var(--text)] border border-[color:var(--border-strong)] hover:border-[color:var(--accent)] rounded-full px-5 py-3 transition-colors"
        >
          I post every build on LinkedIn. Follow along <ArrowUpRight size={16} className="text-[color:var(--accent)]" />
        </a>
      </div>
    </section>
  );
}
