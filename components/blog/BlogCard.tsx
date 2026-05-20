import Link from 'next/link';
import type { PostFrontmatter } from '@/lib/blog';

const categoryAccent: Record<string, string> = {
  tutorials: 'var(--accent)',
  insights: 'var(--teal)',
  building: 'var(--charcoal)',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogCard({ post }: { post: PostFrontmatter }) {
  const accent = categoryAccent[post.category] ?? categoryAccent.building;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className="rounded-2xl p-6 sm:p-8 bg-[color:var(--bg-alt)] border border-[color:var(--border)] transition-all duration-200 group-hover:border-[color:var(--accent)]/40 group-hover:bg-[color:var(--bg)]"
        style={{ ['--card-accent' as string]: accent }}
      >
        <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-[0.18em]">
          <span
            className="inline-flex px-2.5 py-1 rounded-full border"
            style={{ color: accent, borderColor: accent + '55' }}
          >
            {post.category}
          </span>
          <span className="text-[color:var(--text-faint)]">
            {formatDate(post.publishedAt)}
          </span>
          {post.readingTime && (
            <span className="text-[color:var(--text-faint)]">
              {post.readingTime} min
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[color:var(--text)] mb-2 group-hover:text-[color:var(--accent)] transition-colors leading-tight">
          {post.title}
        </h3>

        <p className="text-[color:var(--text-muted)] text-sm sm:text-base leading-relaxed line-clamp-2">
          {post.description}
        </p>
      </article>
    </Link>
  );
}
