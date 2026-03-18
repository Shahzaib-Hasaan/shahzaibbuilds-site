import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Coming-soon mode — block all indexing
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
