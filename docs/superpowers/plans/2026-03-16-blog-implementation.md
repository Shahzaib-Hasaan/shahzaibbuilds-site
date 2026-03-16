# Blog Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a blog to shahzaibbuilds.me with markdown-based posts, category filtering, RSS feed, and full SEO optimization.

**Architecture:** Local `.md` files in `/content/blog/` parsed at build time with gray-matter + Zod. Next.js App Router dynamic routes for `/blog` and `/blog/[slug]`. Fully static generation (SSG) on Netlify.

**Tech Stack:** Next.js 13.5 (App Router), gray-matter, react-markdown, remark-gfm, rehype-highlight, @tailwindcss/typography, Zod, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-16-blog-design.md`

---

## Chunk 1: Foundation (Dependencies, Config, Content Utilities)

### Task 1: Install dependencies and update config

**Files:**
- Modify: `package.json`
- Modify: `next.config.js`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Install new dependencies**

Run:
```bash
cd d:/Projects/shahzaibbuilds-site && npm install gray-matter rehype-highlight @tailwindcss/typography
```

- [ ] **Step 2: Update next.config.js with transpilePackages**

Replace the contents of `next.config.js` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
};

module.exports = nextConfig;
```

This is required because react-markdown v10, remark-gfm v4, and rehype-highlight are ESM-only. Next.js 13.5 needs `transpilePackages` to handle them in server components.

- [ ] **Step 3: Add typography plugin to tailwind.config.ts**

In `tailwind.config.ts`, change the plugins line from:

```ts
plugins: [require('tailwindcss-animate')],
```

to:

```ts
plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
```

- [ ] **Step 4: Verify build still passes**

Run:
```bash
cd d:/Projects/shahzaibbuilds-site && npx next build
```
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.js tailwind.config.ts
git commit -m "chore: add blog dependencies and config (gray-matter, rehype-highlight, typography)"
```

---

### Task 2: Create blog content utility library

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/.gitkeep`

- [ ] **Step 1: Create the content directory**

```bash
mkdir -p d:/Projects/shahzaibbuilds-site/content/blog
touch d:/Projects/shahzaibbuilds-site/content/blog/.gitkeep
```

- [ ] **Step 2: Create lib/blog.ts**

Create `lib/blog.ts` with:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const categoryEnum = z.enum(['tutorials', 'insights', 'building']);

export type Category = z.infer<typeof categoryEnum>;

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: categoryEnum,
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).default([]),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null),
  readingTime: z.number().positive().nullable().default(null),
  featured: z.boolean().default(false),
  ogImage: z.string().nullable().default(null),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface Post extends PostFrontmatter {
  content: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function parsePost(filename: string): Post {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.parse(data);

  return {
    ...parsed,
    readingTime: parsed.readingTime ?? calculateReadingTime(content),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) return [];

  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getRecentPosts(n: number): Post[] {
  return getAllPosts().slice(0, n);
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd d:/Projects/shahzaibbuilds-site && npx next build
```
Expected: Build succeeds (lib/blog.ts is only imported server-side, no errors).

- [ ] **Step 4: Commit**

```bash
git add lib/blog.ts content/blog/.gitkeep
git commit -m "feat: add blog content utility library with Zod-validated frontmatter"
```

---

### Task 3: Create a sample blog post for testing

**Files:**
- Create: `content/blog/getting-started-with-n8n.md`

- [ ] **Step 1: Create sample post**

Create `content/blog/getting-started-with-n8n.md`:

```markdown
---
title: "Getting Started with n8n: A Practical Guide"
slug: "getting-started-with-n8n"
description: "Everything you need to know to set up n8n and build your first workflow automation."
category: "tutorials"
tags: ["n8n", "automation", "workflow", "getting-started"]
publishedAt: "2026-03-16"
featured: true
---

If you have ever wished you could connect your tools together without writing a full application, n8n is where you start.

I have been using n8n daily for over a year now, both self-hosted on my own server and through the cloud version. It is the tool that got me hired. Here is everything I wish someone had told me when I was starting out.

## What is n8n?

n8n is an open-source workflow automation tool. Think of it as Zapier, but you can self-host it, see the code, and extend it however you want. It connects to hundreds of services through nodes, and you build workflows by wiring them together visually.

## Why I prefer n8n over Zapier and Make.com

I have used all three professionally. Here is the honest breakdown:

- **n8n** gives you the most control. Self-hosting means no per-execution pricing, and you can run it on a $5/month server.
- **Make.com** has a better visual editor for complex branching logic. I use it for client projects where the client needs to understand the workflow.
- **Zapier** is the simplest but also the most expensive and least flexible.

## Setting up n8n

The fastest way to get started is Docker:

```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

Open `localhost:5678` and you are in.

For production, I run n8n behind Nginx with SSL on a Hetzner VPS. That setup costs about $4/month and handles everything I throw at it.

## Your first workflow

Start simple. Here is a workflow that watches a Google Sheet and sends a Slack message when a new row is added:

1. Add a **Google Sheets Trigger** node
2. Connect it to a **Slack** node
3. Map the sheet columns to Slack message fields
4. Activate the workflow

That is it. You just automated something that would have taken manual checking every few minutes.

## Common mistakes to avoid

1. **Not using error handling nodes.** Your workflows will fail. Add error triggers from day one.
2. **Storing credentials in workflow data.** Use n8n's built-in credential manager.
3. **Building everything in one massive workflow.** Split complex processes into sub-workflows.

## What to build next

Once you have the basics, try connecting an AI API. Add an OpenAI node after your trigger and you have an AI-powered automation. That is how I built most of the systems I ship at Automaxion.

If you want to see the kinds of production systems you can build with n8n, check out my [projects page](https://shahzaibbuilds.me/#work).
```

- [ ] **Step 2: Commit**

```bash
git add content/blog/getting-started-with-n8n.md
git commit -m "content: add first blog post - getting started with n8n"
```

---

## Chunk 2: Blog Components and Pages

### Task 4: Create BlogCard component

**Files:**
- Create: `components/blog/BlogCard.tsx`

- [ ] **Step 1: Create BlogCard.tsx**

Create `components/blog/BlogCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/BlogCard.tsx
git commit -m "feat: add BlogCard component"
```

---

### Task 5: Create CategoryFilter component

**Files:**
- Create: `components/blog/CategoryFilter.tsx`

- [ ] **Step 1: Create CategoryFilter.tsx**

Create `components/blog/CategoryFilter.tsx`:

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { slug: '', label: 'All' },
  { slug: 'tutorials', label: 'Tutorials' },
  { slug: 'insights', label: 'Insights' },
  { slug: 'building', label: 'Building' },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? '';

  function handleFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => handleFilter(cat.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-sans transition-all duration-200 ${
              isActive
                ? 'bg-amber-accent text-white'
                : 'bg-white border border-warm-border text-ink-muted hover:text-ink hover:border-amber-accent/40'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/CategoryFilter.tsx
git commit -m "feat: add CategoryFilter component with URL-based state"
```

---

### Task 6: Create BlogPost renderer component

**Files:**
- Create: `components/blog/BlogPost.tsx`

- [ ] **Step 1: Create BlogPost.tsx**

Create `components/blog/BlogPost.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/BlogPost.tsx
git commit -m "feat: add BlogPost renderer with markdown, syntax highlighting, and prose styling"
```

---

### Task 7: Create blog layout and listing page

**Files:**
- Create: `app/blog/layout.tsx`
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Create app/blog/layout.tsx**

Create `app/blog/layout.tsx`:

```tsx
import Navbar from '@/components/portfolio/Navbar';
import Footer from '@/components/portfolio/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Shahzaib Builds',
    default: 'Blog | Shahzaib Builds',
  },
  description:
    'Tutorials, insights, and build logs on AI automation, n8n workflows, and building production systems.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-warm-bg pt-24 sm:pt-28">
        {children}
      </div>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create app/blog/page.tsx**

Create `app/blog/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd d:/Projects/shahzaibbuilds-site && npx next build
```
Expected: Build succeeds. `/blog` page renders statically.

- [ ] **Step 4: Commit**

```bash
git add app/blog/layout.tsx app/blog/page.tsx
git commit -m "feat: add blog layout and listing page with category filtering"
```

---

### Task 8: Create blog post page (dynamic route)

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/blog/[slug]/page.tsx**

Create `app/blog/[slug]/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify build and test**

Run:
```bash
cd d:/Projects/shahzaibbuilds-site && npx next build
```
Expected: Build succeeds. Route `/blog/getting-started-with-n8n` is statically generated.

- [ ] **Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: add dynamic blog post page with SEO, Article schema, and related posts"
```

---

## Chunk 3: Integration and SEO

### Task 9: Update Navbar with Blog link and fix hash navigation

**Files:**
- Modify: `components/portfolio/Navbar.tsx`

- [ ] **Step 1: Update Navbar.tsx**

In `components/portfolio/Navbar.tsx`, make these changes:

1. Add `usePathname` import from `next/navigation`
2. Change navLinks to use `/#` prefixed hrefs and add Blog link
3. Add pathname-based mobile menu close logic

The full updated navLinks array:

```ts
const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];
```

Add `usePathname` to the imports and add a useEffect that closes the mobile menu on pathname change:

```ts
import { usePathname } from 'next/navigation';

// Inside the component:
const pathname = usePathname();

useEffect(() => {
  setIsMobileMenuOpen(false);
}, [pathname]);
```

Also change the "Get in Touch" CTA href from `#contact` to `/#contact` (both desktop and mobile).

- [ ] **Step 2: Verify navigation works**

Run dev server: `cd d:/Projects/shahzaibbuilds-site && npx next dev`
- Visit `/blog` and click "Work" in nav -> should navigate to homepage and scroll to work section
- Visit `/blog` and click "Blog" -> should stay on blog page
- Visit homepage and click "Blog" -> should navigate to `/blog`
- Mobile menu should close on all navigations

- [ ] **Step 3: Commit**

```bash
git add components/portfolio/Navbar.tsx
git commit -m "fix: update Navbar with Blog link and fully-qualified hash URLs for cross-page navigation"
```

---

### Task 10: Update sitemap with blog posts

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Rewrite app/sitemap.ts**

Replace the contents of `app/sitemap.ts` with:

```ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.shahzaibbuilds.me';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}
```

This removes the old hash-fragment entries (they were ignored by search engines anyway) and dynamically includes all blog posts.

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: update sitemap with dynamic blog posts, remove hash-fragment entries"
```

---

### Task 11: Create RSS feed

**Files:**
- Create: `app/blog/rss.xml/route.ts`

- [ ] **Step 1: Create RSS route handler**

Create `app/blog/rss.xml/route.ts`:

```ts
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const siteUrl = 'https://www.shahzaibbuilds.me';
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt + 'T00:00:00Z').toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shahzaib Builds - Blog</title>
    <description>Tutorials, insights, and build logs on AI automation, n8n workflows, and building production systems.</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/rss.xml/route.ts
git commit -m "feat: add RSS feed at /blog/rss.xml"
```

---

### Task 12: Add LatestPosts section to homepage

**Files:**
- Create: `components/blog/LatestPosts.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create LatestPosts.tsx**

Create `components/blog/LatestPosts.tsx`:

```tsx
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
```

- [ ] **Step 2: Add LatestPosts to app/page.tsx**

In `app/page.tsx`, add the import:

```ts
import LatestPosts from '@/components/blog/LatestPosts';
```

Then add the component between `<SkillsSection />` and `<ServicesSection />`:

```tsx
<SkillsSection />
<LatestPosts />
<ServicesSection />
```

- [ ] **Step 3: Commit**

```bash
git add components/blog/LatestPosts.tsx app/page.tsx
git commit -m "feat: add latest blog posts section to homepage"
```

---

### Task 13: Update llms.txt with blog section

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Add blog section to llms.txt**

Add the following section before `## Contact` in `public/llms.txt`:

```markdown
## Blog
Technical articles on AI automation, n8n workflows, and building production systems.
- [Getting Started with n8n](https://shahzaibbuilds.me/blog/getting-started-with-n8n): Practical guide to setting up n8n and building your first automation
- [Blog Home](https://shahzaibbuilds.me/blog): All posts
- [RSS Feed](https://shahzaibbuilds.me/blog/rss.xml): Subscribe to new posts
```

Note: Update this section as new posts are published.

- [ ] **Step 2: Commit**

```bash
git add public/llms.txt
git commit -m "feat: add blog section to llms.txt"
```

---

### Task 14: Final build verification and push

- [ ] **Step 1: Full build**

```bash
cd d:/Projects/shahzaibbuilds-site && npx next build
```

Expected: Build succeeds with:
- `/blog` static page
- `/blog/getting-started-with-n8n` static page
- `/blog/rss.xml` route handler
- `/sitemap.xml` with blog post entries
- `/robots.txt` unchanged

- [ ] **Step 2: Smoke test**

Start the production server:
```bash
cd d:/Projects/shahzaibbuilds-site && npx next start -p 3336
```

Check:
- `http://localhost:3336/blog` - listing page loads, shows the sample post
- `http://localhost:3336/blog/getting-started-with-n8n` - post renders with syntax highlighting
- `http://localhost:3336/blog/rss.xml` - returns XML feed
- `http://localhost:3336/sitemap.xml` - includes blog post URLs
- `http://localhost:3336/llms.txt` - includes blog section
- Homepage shows "Latest from the blog" section
- Navbar has "Blog" link that works from both homepage and blog pages

- [ ] **Step 3: Push to remote**

```bash
cd d:/Projects/shahzaibbuilds-site && git push origin main
```
