import Navbar from '@/app/v2/_components/Navbar';
import Footer from '@/app/v2/_components/Footer';
import LenisProvider from '@/app/v2/_components/LenisProvider';
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
      <LenisProvider />
      <Navbar />
      <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] pt-24 sm:pt-28">
        {children}
      </div>
      <Footer />
    </>
  );
}
