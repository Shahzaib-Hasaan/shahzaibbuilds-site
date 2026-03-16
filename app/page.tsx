import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahzaib Hassan',
    alternateName: ['Shahzaib Builds'],
    jobTitle: 'AI Automation Engineer',
    description: 'AI Automation Engineer building agents, voice bots, and workflow automation systems.',
    url: 'https://www.shahzaibbuilds.me',
    sameAs: [
      'https://twitter.com/shahzaib_builds',
      'https://instagram.com/shahzaib_builds',
      'https://github.com/Shahzaib-Hasaan',
      'https://tiktok.com/@shahzaib_builds',
    ],
    image: 'https://www.shahzaibbuilds.me/me.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Automaxion',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Islamia University of Bahawalpur',
    },
    knowsAbout: ['AI Agents', 'n8n', 'Make.com', 'Python', 'Voice AI', 'Workflow Automation'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="min-h-screen bg-[#FAFAF5]">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
