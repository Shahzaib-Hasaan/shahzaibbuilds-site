import type { Metadata } from 'next';
import Navbar from '../v2/_components/Navbar';
import Footer from '../v2/_components/Footer';
import YtdmProduct from './_components/YtdmProduct';

export const metadata: Metadata = {
  title: 'YTDM — YouTube Download Manager for Windows & Linux | Shahzaib Builds',
  description:
    'YTDM is a free, open-source download manager for YouTube. Queue, playlists, subtitles, pause and resume — for Windows and Linux. Built by Shahzaib Hassan.',
  keywords: [
    'YTDM',
    'YouTube download manager',
    'YouTube downloader Windows',
    'YouTube downloader Linux',
    'open source downloader',
    'yt-dlp GUI',
    'Shahzaib Hassan',
  ],
  openGraph: {
    title: 'YTDM — YouTube Download Manager',
    description:
      'Free, open-source download manager for YouTube. Queue, playlists, subtitles, pause & resume. Windows + Linux.',
    images: ['/ytdm/screenshot.png'],
  },
};

export default function YtdmPage() {
  return (
    <main className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <Navbar />
      <YtdmProduct />
      <Footer />
    </main>
  );
}
