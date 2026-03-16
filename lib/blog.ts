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
