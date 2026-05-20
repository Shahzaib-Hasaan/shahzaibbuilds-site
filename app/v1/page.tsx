import type { Metadata } from 'next';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import LatestPosts from '@/components/blog/LatestPosts';

export const metadata: Metadata = {
  title: 'v1 — Shahzaib Hassan | AI Automation Engineer',
  description:
    'Archived v1 of shahzaibbuilds.me. The current site lives at /. Personal presence hub for Shahzaib Hassan — AI Automation Engineer and educator.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function V1Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <LatestPosts />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
