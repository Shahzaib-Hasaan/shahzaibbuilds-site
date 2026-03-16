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
