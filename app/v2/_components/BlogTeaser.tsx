import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getRecentPosts } from '@/lib/blog';

export default function BlogTeaser() {
  const posts = getRecentPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-[color:var(--bg)] border-t border-[color:var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-3">
              Writing
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[color:var(--text)] leading-tight">
              What I&apos;ve been figuring out.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors"
          >
            all writing <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)]">
          {posts.map((p) => (
            <li key={p.slug} className="bg-[color:var(--bg)] hover:bg-[color:var(--bg-alt)] transition-colors">
              <Link href={`/blog/${p.slug}`} className="block p-8 h-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
                  {p.category} · {p.readingTime ?? 1} min
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[color:var(--text)] mt-3 mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-[color:var(--text-muted)] leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="sm:hidden mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]"
        >
          all writing <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}
