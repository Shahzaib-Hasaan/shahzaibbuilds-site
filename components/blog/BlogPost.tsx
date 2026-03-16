'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Post } from '@/lib/blog';

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  tutorials: { bg: 'bg-amber-subtle', text: 'text-amber-accent' },
  insights: { bg: 'bg-teal-subtle', text: 'text-teal-accent' },
  building: { bg: 'bg-ink/5', text: 'text-ink' },
};

export default function BlogPost({ post }: { post: Post }) {
  const colors = categoryColors[post.category] ?? categoryColors.building;

  return (
    <article>
      {/* Post header */}
      <header className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-mono ${colors.bg} ${colors.text}`}
          >
            {post.category}
          </span>
          <span className="text-sm text-ink-muted font-sans">
            {formatDate(post.publishedAt)}
          </span>
          {post.readingTime && (
            <span className="text-sm text-ink-muted font-sans">
              {post.readingTime} min read
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-ink-muted text-lg leading-relaxed max-w-2xl">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono text-ink-muted bg-warm-alt rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post body */}
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/85 prose-p:leading-relaxed prose-a:text-amber-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:font-mono prose-code:text-sm prose-pre:bg-[#1C1C1C] prose-pre:text-sm prose-blockquote:border-amber-accent prose-blockquote:text-ink-muted prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
