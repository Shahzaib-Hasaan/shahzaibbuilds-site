export interface BuildPost {
  title: string;
  type: 'carousel' | 'post';
  /** Primary link: the LinkedIn post. */
  href: string;
  /** Optional local PDF of the carousel, opened via a secondary link. */
  pdf?: string;
  cover: string;
  date: string; // ISO
}

export interface BuildProduct {
  name: string;
  status: 'live' | 'building' | 'planned';
  blurb: string;
  url?: string;
}

export const posts: BuildPost[] = [
  {
    title: 'The YouTubification of Software',
    type: 'carousel',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7469600612381286400/',
    pdf: '/building/youtubification-carousel.pdf',
    cover: '/building/youtubification.png',
    date: '2026-06-08',
  },
];

export const products: BuildProduct[] = [
  {
    name: 'Hisaab',
    status: 'live',
    blurb:
      'A personal finance tracker that answers the only question that matters: where does the money actually go?',
    url: 'https://hisaab.shahzaibbuilds.me/',
  },
  {
    name: 'Toolbelt',
    status: 'live',
    blurb:
      'Free, privacy-first browser utilities for PDF, image, and dev work that run entirely on your machine. No uploads, no sign-ups.',
    url: 'https://tools.shahzaibbuilds.me/',
  },
  {
    name: 'Promptly',
    status: 'building',
    blurb:
      'A faster way to run, organize, and reuse your best AI prompts. In progress.',
  },
];
