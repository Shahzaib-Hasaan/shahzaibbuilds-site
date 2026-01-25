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

  // Additional Person schema for better SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahzaib Hassan',
    alternateName: ['Shahzaib Builds', 'Shahzaib Hassan AI'],
    jobTitle: 'AI Automation Engineer',
    disambiguatingDescription: 'An AI Automation Engineer based in Lahore, specializing in n8n and Python agents. Not associated with cricket.',
    url: 'https://www.shahzaibbuilds.me',
    sameAs: [
      'https://twitter.com/shahzaib_builds',
      'https://instagram.com/shahzaib_builds',
      'https://www.linkedin.com/in/shahxeebhassan/',
      'https://tiktok.com/@shahzaib_builds',
    ],
    image: 'https://www.shahzaibbuilds.me/me.jpg',
    description: 'AI Automation Engineer specializing in n8n, Python, and Voice Agents to automate business operations.',
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
    knowsAbout: ['AI Agents', 'n8n', 'Python', 'Voice Automation', 'CRM Integration', 'Business Process Automation', 'Workflow Automation'],
  };

  // FAQ Schema for voice search and featured snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Shahzaib Hassan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib Hassan is an AI Automation Engineer based in Lahore, Pakistan, specializing in building Voice Agents, n8n workflows, and Python AI solutions for businesses. He is the founder of Shahzaib Builds and currently works at Automaxion.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Shahzaib Builds do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib Builds provides AI automation services including Voice Agents deployment, n8n workflow automation, and custom Python AI development. We help businesses save 20+ hours per week by automating manual operations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Shahzaib Hassan located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib Hassan is based in Lahore, Pakistan, and serves clients worldwide.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
