import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRecentPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

export default function LatestPosts() {
  const posts = getRecentPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28 bg-warm-bg">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight mb-2">
              Latest from the blog
            </h2>
            <p className="text-ink-muted text-base sm:text-lg font-sans">
              Tutorials, insights, and build logs.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-sans text-amber-accent hover:text-amber-hover transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <Link
          href="/blog"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-sans text-amber-accent hover:text-amber-hover transition-colors mt-8"
        >
          View all posts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
