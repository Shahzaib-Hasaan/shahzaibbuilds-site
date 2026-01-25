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
    alternateName: 'Shahzaib Hassan',
    description: 'AI Automation Engineer deploying autonomous AI employees for lean teams. Specializing in Voice Agents, n8n Workflow Automation, Python AI, and Custom AI Consulting. Saving businesses 20+ hours per week.',
    url: 'https://www.shahzaibbuilds.me',
    logo: 'https://www.shahzaibbuilds.me/me.jpg',
    image: 'https://www.shahzaibbuilds.me/og-image.jpg',
    founder: {
      '@type': 'Person',
      name: 'Shahzaib Hassan',
      alternateName: 'Shahzaib Builds',
      jobTitle: 'AI Automation Engineer',
      description: 'AI Automation Engineer specializing in Voice Agents, n8n automation, and Python AI solutions',
      worksFor: {
        '@type': 'Organization',
        name: 'Automaxion',
      },
      url: 'https://www.shahzaibbuilds.me',
      sameAs: [
        'https://twitter.com/shahzaib_builds',
        'https://instagram.com/shahzaib_builds',
        'https://linkedin.com/in/shahzaib-hassan',
        'https://tiktok.com/@shahzaib_builds',
      ],
    },
    areaServed: 'Worldwide',
    serviceType: ['AI Voice Agents', 'Workflow Automation with n8n', 'Python AI Development', 'Custom AI Consulting', 'Business Process Automation'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'Pakistan',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@shahzaibbuilds.me',
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
