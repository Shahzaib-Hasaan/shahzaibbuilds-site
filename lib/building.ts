export interface BuildPost {
  title: string;
  type: 'carousel' | 'post';
  /** Where the card links to: a LinkedIn post URL, or a local PDF/asset. */
  href: string;
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
    href: '/building/youtubification-carousel.pdf',
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
