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
