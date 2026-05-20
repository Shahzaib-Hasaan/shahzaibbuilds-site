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

const categoryAccent: Record<string, string> = {
  tutorials: 'var(--accent)',
  insights: 'var(--teal)',
  building: 'var(--charcoal)',
};

export default function BlogPost({ post }: { post: Post }) {
  const accent = categoryAccent[post.category] ?? categoryAccent.building;

  return (
    <article>
      <header className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-5 text-xs font-mono uppercase tracking-[0.18em]">
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

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[color:var(--text)] tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-[color:var(--text-muted)] text-lg leading-relaxed max-w-2xl">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono text-[color:var(--text-muted)] bg-[color:var(--bg-alt)] border border-[color:var(--border)] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[color:var(--text)] prose-p:text-[color:var(--text)]/85 prose-p:leading-relaxed prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[color:var(--text)] prose-code:font-mono prose-code:text-sm prose-pre:bg-[#1C1C1C] prose-pre:text-sm prose-blockquote:border-[color:var(--accent)] prose-blockquote:text-[color:var(--text-muted)] prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
