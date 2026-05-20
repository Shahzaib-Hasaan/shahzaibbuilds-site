import type { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: 'v1 — Shahzaib Hassan | AI Automation Engineer',
  description:
    'Archived v1 of shahzaibbuilds.me. The current site lives at /. Personal presence hub for Shahzaib Hassan — AI Automation Engineer and educator.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default Home;
