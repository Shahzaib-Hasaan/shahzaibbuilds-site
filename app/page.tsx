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

  const neurafinitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#neurafinity`,
    name: 'Neurafinity Club',
    description:
      'A student-led AI learning community at Islamia University of Bahawalpur, co-founded by Shahzaib Hassan. Runs Python bootcamps, AI workshops, and peer-taught courses in collaboration with the IUB Skills and Career Development Society.',
    foundingDate: '2023',
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Islamia University of Bahawalpur',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Shahzaib Hassan',
    alternateName: ['Shahzaib Builds', 'Shahxeeb Hassan'],
    jobTitle: 'AI Automation Engineer',
    description:
      'AI Automation Engineer at Automaxion and educator based in Lahore, Pakistan. BS in Artificial Intelligence from Islamia University of Bahawalpur (3.65 CGPA). Co-founded the Neurafinity Club, taught four Python bootcamps, and served as a teaching assistant for a 10-month AI certificate course. Builds production AI agents, voice bots, and workflow automations.',
    url: siteUrl,
    sameAs: [
      'https://x.com/shahzaib_builds',
      'https://pk.linkedin.com/in/shahzaib-hassan-ai',
      'https://instagram.com/shahzaib_builds',
      'https://github.com/Shahzaib-Hasaan',
      'https://tiktok.com/@shahzaib_builds',
      'https://www.youtube.com/@shahxeebhassan',
    ],
    image: `${siteUrl}/me.jpg`,
    email: 'contact@shahzaibbuilds.me',
    nationality: {
      '@type': 'Country',
      name: 'Pakistan',
    },
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
      sameAs: 'https://www.iub.edu.pk/',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Bachelor',
        name: 'BS in Artificial Intelligence',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Islamia University of Bahawalpur',
        },
        dateCreated: '2026-01',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certificate',
        name: 'Certificate in Artificial Intelligence (10-month course)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Islamia University of Bahawalpur',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certificate',
        name: 'NAVTTC Certification (AI/ML)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'National Vocational and Technical Training Commission of Pakistan',
        },
      },
    ],
    award: [
      "Prime Minister's Laptop Scheme (Pakistan), merit-based national award",
    ],
    memberOf: { '@id': `${siteUrl}/#neurafinity` },
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'AI Automation Engineer',
        occupationalCategory: 'Software Engineering',
        skills:
          'n8n, Make.com, Zapier, Python, Next.js, AI Agents, Voice AI, Workflow Automation, LLM Integration',
      },
      {
        '@type': 'Occupation',
        name: 'Educator and Teaching Assistant',
        occupationalCategory: 'Education',
        skills:
          'Python instruction, AI/ML fundamentals, classical ML, deep learning, computer vision, practical AI engineering',
      },
    ],
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
      'Claude',
      'Mistral',
      'CrewAI',
      'LLM Integration',
      'Next.js',
      'Linux',
      'Docker',
      'Self-hosted infrastructure',
      'Teaching Python',
      'AI education',
      'Cold Email Automation',
      'Data Enrichment',
      'Airtable',
    ],
    knowsLanguage: ['English', 'Urdu', 'Saraiki', 'Punjabi'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Shahzaib Builds',
    url: siteUrl,
    description:
      'Personal website of Shahzaib Hassan. AI Automation Engineer at Automaxion, educator, and Neurafinity Club co-founder. Covers his work, writing, and background.',
    author: { '@id': `${siteUrl}/#person` },
    inLanguage: 'en',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    name: 'Shahzaib Hassan',
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
        name: 'Who is Shahzaib Hassan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib Hassan is an AI Automation Engineer at Automaxion in Lahore, Pakistan, and an educator. He holds a BS in Artificial Intelligence from Islamia University of Bahawalpur (3.65 CGPA), co-founded the Neurafinity Club, taught four Python bootcamps, and served as a teaching assistant for a 10-month AI certificate course.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where did Shahzaib Hassan study?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib completed his BS in Artificial Intelligence at Islamia University of Bahawalpur in January 2026 with a 3.65 CGPA. He previously completed FSc Pre-Medical at Government Sadiq Edgerton College, Bahawalpur, before switching to computer science. He was a recipient of the Prime Minister\u2019s Laptop Scheme (Pakistan), a merit-based national award.',
        },
      },
      {
        '@type': 'Question',
        name: 'What has Shahzaib Hassan taught?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shahzaib has taught four online Python bootcamps for university students and juniors, served as teaching assistant and instructor in the second batch of a 10-month AI certificate course (covering ML, deep learning, and computer vision), and co-founded the Neurafinity Club at IUB which runs AI workshops in collaboration with the IUB Skills and Career Development Society.',
        },
      },
      {
        '@type': 'Question',
        name: 'What projects has Shahzaib Hassan built?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Client and production work includes an autonomous social media system on Make.com and Airtable, a cold outreach pipeline using Airtable, Make.com, and Instantly, a custom data enrichment dashboard built in Next.js with bespoke APIs, a psychological assessment platform with custom scoring and PDF report generation, and an AI teaching assistant that turns long-form documents into interactive slides with ElevenLabs voice narration.',
        },
      },
      {
        '@type': 'Question',
        name: 'What tools does Shahzaib Hassan use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For automation Shahzaib is an expert in self-hosted n8n, Make.com, Zapier, and Airtable. For AI and LLMs he uses OpenAI, Claude, Mistral, and CrewAI. For voice AI he works with VAPI, Retell, and ElevenLabs. For web he builds with Next.js and Python. He runs production infrastructure on self-hosted Linux (Docker, Nginx).',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I reach Shahzaib Hassan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Email is best: contact@shahzaibbuilds.me. He is open to scholarship recommendations, research collaboration, and freelance automation or AI projects. You can also reach him on X (Twitter) at @shahzaib_builds or through GitHub at Shahzaib-Hasaan.',
        },
      },
    ],
  };

  const allSchemas = [
    personSchema,
    neurafinitySchema,
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
