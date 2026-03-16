import { Suspense } from 'react';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import type { Category } from '@/lib/blog';

function BlogList({ category }: { category?: string }) {
  const allPosts = getAllPosts();
  const featured = getFeaturedPosts();

  const filtered = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  // Pin featured posts at top only when showing "All"
  const pinnedSlugs = !category ? new Set(featured.map((p) => p.slug)) : new Set();
  const pinned = filtered.filter((p) => pinnedSlugs.has(p.slug));
  const rest = filtered.filter((p) => !pinnedSlugs.has(p.slug));
  const ordered = [...pinned, ...rest];

  if (ordered.length === 0) {
    return (
      <p className="text-ink-muted text-center py-16 font-sans">
        No posts yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {ordered.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category as Category | undefined;

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <h1 className="font-serif text-4xl sm:text-5xl text-ink tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-ink-muted text-lg font-sans leading-relaxed max-w-xl">
          Tutorials, insights, and build logs from shipping AI automation in production.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Posts */}
      <BlogList category={category} />
    </div>
  );
}
