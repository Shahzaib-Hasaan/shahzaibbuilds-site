import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import LatestPosts from '@/components/blog/LatestPosts';

export default function Home() {
  const siteUrl = 'https://www.shahzaibbuilds.me';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Shahzaib Hassan',
    alternateName: ['Shahzaib Builds'],
    jobTitle: 'AI Automation Engineer',
    description:
      'AI Automation Engineer at Automaxion, based in Lahore, Pakistan. Builds workflow automations, AI agents, voice bots, and custom applications using n8n, Make.com, Python, and LLM APIs.',
    url: siteUrl,
    sameAs: [
      'https://x.com/shahzaib_builds',
      'https://instagram.com/shahzaib_builds',
      'https://github.com/Shahzaib-Hasaan',
      'https://tiktok.com/@shahzaib_builds',
    ],
    image: `${siteUrl}/me.jpg`,
    email: 'contact@shahzaibbuilds.me',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Automaxion',
      url: 'https://automaxion.io',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Islamia University of Bahawalpur',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI Automation Engineer',
      occupationalCategory: 'Software Engineering',
      skills:
        'n8n, Make.com, Zapier, Python, Next.js, AI Agents, Voice AI, Workflow Automation, LLM Integration',
    },
    knowsAbout: [
      'AI Agents',
      'Workflow Automation',
      'n8n',
      'Make.com',
      'Zapier',
      'Python',
      'Voice AI',
      'VAPI',
      'Retell',
      'ElevenLabs',
      'OpenAI',
      'LLM Integration',
      'Next.js',
      'Cold Email Automation',
      'Data Enrichment',
      'Airtable',
    ],
    knowsLanguage: ['English', 'Urdu'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Shahzaib Builds',
    url: siteUrl,
    description:
      'Portfolio of Shahzaib Hassan, AI Automation Engineer specializing in n8n workflows, AI agents, voice bots, and custom automation solutions.',
    author: { '@id': `${siteUrl}/#person` },
    inLanguage: 'en',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    name: 'Shahzaib Hassan - AI Automation Engineer',
    url: siteUrl,
    mainEntity: { '@id': `${siteUrl}/#person` },
    isPartOf: { '@id': `${siteUrl}/#website` },
    dateModified: new Date().toISOString().split('T')[0],
  };

  const serviceSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Workflow Automation',
      description:
        'End-to-end business process automation using n8n, Make.com, and Zapier. Connecting CRMs, email, Slack, and internal tools into automated pipelines.',
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: ['Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Worldwide'],
      serviceType: 'Workflow Automation',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Voice Agents',
      description:
        'Custom AI voice agents for inbound and outbound calls using VAPI, Retell, and ElevenLabs. Lead qualification, customer support, and appointment booking.',
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: ['Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Worldwide'],
      serviceType: 'AI Voice Agent Development',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom AI Applications',
      description:
        'Full-stack applications with AI integration. Data enrichment dashboards, autonomous content systems, and custom tools built with Next.js, Python, and LLM APIs.',
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: ['Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Worldwide'],
      serviceType: 'Custom AI Application Development',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does Shahzaib Hassan do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib Hassan is an AI Automation Engineer who builds workflow automations, AI voice agents, and custom AI applications for businesses. He specializes in n8n, Make.com, Python, and LLM integrations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What tools does Shahzaib use for automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib is an expert in n8n (self-hosted), Make.com, Zapier, and Airtable. For AI, he uses OpenAI, Claude, Mistral, CrewAI, and for voice AI he works with VAPI, Retell, and ElevenLabs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Shahzaib Hassan based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib is based in Lahore, Pakistan, and works at Automaxion as an AI Automation Engineer. He is available for freelance projects worldwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I hire Shahzaib for a project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reach Shahzaib at contact@shahzaibbuilds.me or DM him on X (Twitter) at @shahzaib_builds. He is open to freelance automation and AI projects.',
        },
      },
    ],
  };

  const allSchemas = [
    personSchema,
    websiteSchema,
    profilePageSchema,
    ...serviceSchemas,
    faqSchema,
  ];

  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
    </>
  );
}
