# Blog Design Spec — shahzaibbuilds.me

**Date:** 2026-03-16
**Status:** Approved
**Author:** Shahzaib Hassan + Claude

---

## Overview

Add a blog to shahzaibbuilds.me to serve three goals: attract potential clients, engage fellow engineers, and rank for target keywords in both Google and AI search engines. Posts are authored as local Markdown files, AI-assisted for high volume (2-3/week), with tone varying by content type.

## Audience

| Segment | What they want | Content type |
|---------|---------------|--------------|
| Potential clients | Understand what automation can do for them | Insights, comparisons, use cases |
| Engineers/developers | Technical depth, tutorials, tool comparisons | Tutorials, how-to guides |
| Search engines (Google + AI) | Structured, keyword-rich, fresh content | All types, optimized per post |

## Infrastructure

### Content Storage

- Markdown files in `/content/blog/` directory
- One `.md` file per post
- Filename matches slug: `n8n-vs-makecom-comparison.md`
- No MDX (unnecessary complexity for text + code content)
- No external CMS (git push is the fastest publish path)

### Frontmatter Schema (Zod-validated)

```yaml
---
title: "n8n vs Make.com: Which Should You Use in 2026?"
slug: "n8n-vs-makecom-comparison"
description: "A hands-on comparison from someone who uses both daily."
category: "insights"
tags: ["n8n", "make.com", "automation", "comparison"]
publishedAt: "2026-03-20"
updatedAt: "2026-03-20"
readingTime: 8
featured: false
ogImage: "/blog/images/n8n-vs-makecom.jpg"
---
```

**Required fields:** title, slug, description, category, publishedAt
**Optional fields:** tags, updatedAt, readingTime, featured, ogImage (defaults: [], null, auto-calculated via `Math.ceil(wordCount / 200)`, false, null)
**Category enum:** `tutorials` | `insights` | `building`

### Dependencies to Add

- `gray-matter` — frontmatter parsing
- `rehype-highlight` — code syntax highlighting
- `@tailwindcss/typography` — prose styling for blog posts (scoped to blog content container only)

Note: `react-markdown` (10.1.0) and `remark-gfm` (4.0.1) are already installed.

### Configuration Changes (`next.config.js`)

```js
const nextConfig = {
  transpilePackages: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
};
module.exports = nextConfig;
```

Required because `react-markdown` v10, `remark-gfm` v4, and `rehype-highlight` are ESM-only packages. Next.js 13.5 needs `transpilePackages` to handle them in server components.

## URL Structure

| URL | Page | Purpose |
|-----|------|---------|
| `/blog` | Listing page | All posts, filterable by category |
| `/blog/[slug]` | Post page | Individual blog post |
| `/blog/rss.xml` | RSS feed | Syndication |

No dates in URLs. Clean, evergreen, better for SEO.

## Categories

| Category | Slug | Audience | Tone | Example Posts |
|----------|------|----------|------|---------------|
| Tutorials | `tutorials` | Engineers | Professional, technical | "How to Connect OpenAI to n8n", "Building a WhatsApp Bot with n8n" |
| Insights | `insights` | Clients + SEO | Mix | "n8n vs Make.com vs Zapier", "AI Automation for Real Estate" |
| Building | `building` | Everyone | Personal, first-person | "I Automated 50+ Workflows", "How I Got Hired Before Graduating" |

## Pages & Components

### Blog Listing Page (`/app/blog/page.tsx`)

- Category filter tabs: All / Tutorials / Insights / Building
- Posts sorted by publishedAt descending
- Featured posts pinned at top when `featured: true`
- Each post card shows: title, description, category tag, date, reading time
- Warm design consistent with portfolio (same colors, fonts, spacing)
- Fully static (`generateStaticParams` not needed here, just default static rendering)

### Blog Post Page (`/app/blog/[slug]/page.tsx`)

- Server component with `generateStaticParams` for SSG
- Renders markdown body with `react-markdown` + `remark-gfm` + `rehype-highlight`
- Custom components for: headings (with anchor links), code blocks (with copy button), images, blockquotes, tables
- Post header: title, category, date, reading time, tags
- Back link to `/blog`
- "More posts" section at bottom (2-3 related posts by category)
- ChatAssistant available on blog pages
- Both `/blog` and `/blog/[slug]` are fully static (no ISR/SSR needed since content is local files)

### Blog Layout (`/app/blog/layout.tsx`)

- Shared Navbar + Footer (same as portfolio)
- Slightly narrower max-width for readability (max-w-3xl for post content)
- Blog-specific metadata defaults

### Homepage Integration

- New "Latest from the blog" section between Skills and Services
- Shows 2-3 most recent posts as cards
- "View all posts" link to `/blog`

### Navbar Update

- Add "Blog" link between "Services" and "Contact" pointing to `/blog`
- **Critical:** All existing hash links (`#work`, `#about`, `#services`, `#contact`) must become fully qualified (`/#work`, `/#about`, `/#services`, `/#contact`) so they navigate to the homepage first when clicked from `/blog` routes
- Mobile menu close logic must handle both `hashchange` events AND `pathname` changes (via `next/navigation` `usePathname`) for proper behavior on blog pages
- "Get in Touch" CTA should also use `/#contact`

## Content Utilities

### `/lib/blog.ts`

Single utility file handling all blog operations:

```typescript
// Core functions:
getAllPosts()        // Returns all posts sorted by date, validates frontmatter
getPostBySlug(slug) // Returns single post with parsed content
getPostsByCategory(category) // Filtered posts
getFeaturedPosts()  // Posts where featured: true
getRecentPosts(n)   // Latest n posts (for homepage)
```

- Uses `fs.readFileSync` + `gray-matter` for parsing (server-only)
- Zod schema validates frontmatter at build time
- Reading time auto-calculated: `Math.ceil(wordCount / 200)` minutes (if not provided in frontmatter)
- Errors at build time if frontmatter is invalid (fail fast)

## SEO Per Post

### Meta Tags (via generateMetadata)

- `<title>`: `{post.title} | Shahzaib Builds`
- `<meta description>`: `{post.description}`
- `<meta keywords>`: `{post.tags.join(', ')}`
- Open Graph: title, description, type "article", publishedTime, modifiedTime, author
- Open Graph image: `post.ogImage` if set, otherwise falls back to site-wide `/og-image.jpg`
- Twitter card: summary_large_image

### JSON-LD Article Schema

```json
{
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "author": { "@id": "https://www.shahzaibbuilds.me/#person" },
  "datePublished": "...",
  "dateModified": "...",
  "publisher": { "@id": "https://www.shahzaibbuilds.me/#person" },
  "mainEntityOfPage": "https://www.shahzaibbuilds.me/blog/..."
}
```

### Sitemap

- Update `app/sitemap.ts` to dynamically include all blog posts
- Each post gets its own sitemap entry with lastModified from updatedAt/publishedAt
- Remove existing hash-fragment entries (`/#work`, `/#about`, etc.) as search engines strip hash fragments, making them duplicate homepage entries
- Keep only the homepage URL plus individual blog post URLs

### RSS Feed

- Route handler at `/app/blog/rss.xml/route.ts`
- Must return `Response` with `Content-Type: application/xml; charset=utf-8` header
- Standard RSS 2.0 format with XML declaration
- Includes all posts with title, description, link, pubDate

### llms.txt Update

- Add blog section to `public/llms.txt` listing recent posts

## Styling

### Typography for Blog Posts

- Headings: Instrument Serif (same as portfolio)
- Body: Inter (same as portfolio)
- Code: JetBrains Mono (same as portfolio)
- Use `@tailwindcss/typography` plugin with custom configuration matching the warm palette
- Scope prose classes to the blog post content container only (e.g., `<article className="prose ...">`)
- Customize: `prose-headings:font-serif`, amber accent for links, warm background for code blocks

### Code Blocks

- `rehype-highlight` for syntax highlighting
- Dark background code blocks (contrast against warm bg)
- Language label in top-right corner
- Copy button

### Design Consistency

- Same warm color palette (#FAFAF5 background, amber/teal accents)
- Same card styling (.warm-card)
- Same animation patterns (fade-up on scroll)
- Category tags use amber for tutorials, teal for insights, ink for building

## File Structure (New/Modified)

```
content/
  blog/
    (markdown files go here)

app/
  blog/
    page.tsx              (listing page)
    layout.tsx            (blog layout)
    [slug]/
      page.tsx            (post page)
    rss.xml/
      route.ts            (RSS feed)

lib/
  blog.ts                 (content utilities)

components/
  blog/
    BlogCard.tsx          (post card for listing + homepage)
    BlogPost.tsx          (post renderer with custom markdown components)
    CategoryFilter.tsx    (category tab filter)
    LatestPosts.tsx       (homepage section)

(modified files)
next.config.js            (add transpilePackages)
app/sitemap.ts            (add blog posts, clean up hash entries)
app/page.tsx              (add LatestPosts section)
components/portfolio/Navbar.tsx  (add Blog link, fix hash→full URLs)
public/llms.txt           (add blog section)
```

## Dependencies to Install

- `gray-matter` (frontmatter parsing)
- `rehype-highlight` (code syntax highlighting)
- `@tailwindcss/typography` (prose styling, scoped to blog)

## Out of Scope

- Comments system (not needed yet)
- Newsletter signup (can add later)
- Search (category filter is enough for now)
- Pagination (not needed until 50+ posts)
- Draft/preview mode (just don't commit unpublished posts)
- Image optimization pipeline (use Next.js Image component with public/ images)
- Dynamic OG image generation per post (future enhancement, use optional ogImage frontmatter field for now)
