import LenisProvider from './v2/_components/LenisProvider';
import Navbar from './v2/_components/Navbar';
import HeroSection from './v2/_components/HeroSection';
import AboutTimeline from './v2/_components/AboutTimeline';
import ProjectGrid from './v2/_components/ProjectGrid';
import SkillsLens from './v2/_components/SkillsLens';
import TeachingSection from './v2/_components/TeachingSection';
import BlogTeaser from './v2/_components/BlogTeaser';
import ServicesStrip from './v2/_components/ServicesStrip';
import ContactSection from './v2/_components/ContactSection';
import Footer from './v2/_components/Footer';
import { buildSchemas } from '@/lib/seo-schemas';

export default function Home() {
  const schemas = buildSchemas('https://www.shahzaibbuilds.me');

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LenisProvider />
      <main className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
        <Navbar />
        <HeroSection />
        <AboutTimeline />
        <ProjectGrid />
        <SkillsLens />
        <TeachingSection />
        <BlogTeaser />
        <ServicesStrip />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
