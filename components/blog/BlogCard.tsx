import Link from 'next/link';
import type { PostFrontmatter } from '@/lib/blog';

const categoryColors: Record<string, { bg: string; text: string }> = {
  tutorials: { bg: 'bg-amber-subtle', text: 'text-amber-accent' },
  insights: { bg: 'bg-teal-subtle', text: 'text-teal-accent' },
  building: { bg: 'bg-ink/5', text: 'text-ink' },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogCard({ post }: { post: PostFrontmatter }) {
  const colors = categoryColors[post.category] ?? categoryColors.building;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="warm-card rounded-xl p-6 sm:p-8 transition-all duration-200 group-hover:shadow-md group-hover:border-amber-accent/30">
        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-mono ${colors.bg} ${colors.text}`}
          >
            {post.category}
          </span>
          <span className="text-xs text-ink-muted font-sans">
            {formatDate(post.publishedAt)}
          </span>
          {post.readingTime && (
            <span className="text-xs text-ink-muted font-sans">
              {post.readingTime} min read
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-ink mb-2 group-hover:text-amber-accent transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-ink-muted text-sm sm:text-base leading-relaxed line-clamp-2">
          {post.description}
        </p>
      </article>
    </Link>
  );
}
