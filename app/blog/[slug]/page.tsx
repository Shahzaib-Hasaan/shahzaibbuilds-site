import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts, getPostBySlug, getPostsByCategory } from '@/lib/blog';
import BlogPost from '@/components/blog/BlogPost';
import BlogCard from '@/components/blog/BlogCard';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const siteUrl = 'https://www.shahzaibbuilds.me';
  const ogImage = post.ogImage ?? '/og-image.jpg';

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ['Shahzaib Hassan'],
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@shahzaib_builds',
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const siteUrl = 'https://www.shahzaibbuilds.me';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@id': `${siteUrl}/#person` },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    publisher: { '@id': `${siteUrl}/#person` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  };

  // Related posts: same category, excluding current, max 3
  const related = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-sans text-ink-muted hover:text-amber-accent transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        All posts
      </Link>

      <BlogPost post={post} />

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16 sm:mt-20 pt-10 border-t border-warm-border">
          <h2 className="font-serif text-2xl text-ink mb-6">More posts</h2>
          <div className="grid gap-4">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
