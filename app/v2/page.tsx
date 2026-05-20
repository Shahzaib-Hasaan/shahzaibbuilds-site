import Navbar from './_components/Navbar';
import HeroSection from './_components/HeroSection';
import AboutTimeline from './_components/AboutTimeline';
import ProjectGrid from './_components/ProjectGrid';
import SkillsLens from './_components/SkillsLens';
import TeachingSection from './_components/TeachingSection';
import BlogTeaser from './_components/BlogTeaser';
import ServicesStrip from './_components/ServicesStrip';
import ContactSection from './_components/ContactSection';
import Footer from './_components/Footer';

export default function V2Page() {
  return (
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
  );
}
