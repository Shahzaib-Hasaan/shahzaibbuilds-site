import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import PortfolioSection from '@/components/portfolio/PortfolioSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import SocialProofSection from '@/components/portfolio/SocialProofSection';
import Footer from '@/components/portfolio/Footer';
import StickyCTA from '@/components/portfolio/StickyCTA';

export default function Home() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shahzaib Builds',
    description: 'AI Automation Engineer deploying AI employees for lean teams. Specializing in Voice Agents, Workflow Automation, and Custom Consulting.',
    url: 'https://shahzaibai.site',
    logo: 'https://shahzaibai.site/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Shahzaib Hassan',
      jobTitle: 'AI Automation Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Automaxion',
      },
    },
    areaServed: 'Worldwide',
    serviceType: ['AI Voice Agents', 'Workflow Automation', 'Custom AI Consulting'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'Pakistan',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@shahzaibai.site',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://twitter.com/shahzaib_builds',
      'https://instagram.com/shahzaib_builds',
      'https://linkedin.com/in/shahzaib-hassan',
      'https://tiktok.com/@shahzaib_builds',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-dark-bg">
        <Navbar />
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <SocialProofSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
