import './globals.css';
import CustomChatbot from '@/components/CustomChatbot';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shahzaibbuilds.me'),
  title: 'Shahzaib Hassan | AI Automation Engineer (Shahzaib Builds)',
  description: 'AI Automation Engineer in Lahore deploying Voice Agents, n8n automation, and Python AI solutions. Saving businesses 20+ hours/week.',
  keywords: [
    'Shahzaib Hassan',
    'Shahzaib Builds',
    'AI Automation Engineer',
    'Voice Agents',
    'Workflow Automation',
    'AI Consulting',
    'n8n automation',
    'Python AI',
    'AI employees',
    'Business automation',
    'Automaxion',
    'Lahore Pakistan'
  ],
  authors: [{ name: 'Shahzaib Hassan' }],
  creator: 'Shahzaib Hassan',
  publisher: 'Shahzaib Builds',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'owwbL11jdDB44_EtB0LitpPX31aO5yPqQss-eK35ozE',
  },
  openGraph: {
    title: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer',
    description: 'AI Automation Engineer deploying autonomous AI employees. Voice Agents, n8n automation, Python AI. Save 20+ hours/week.',
    url: 'https://www.shahzaibbuilds.me',
    siteName: 'Shahzaib Builds',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.shahzaibbuilds.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer saving businesses 20+ hours/week',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer',
    description: 'AI Automation Engineer deploying autonomous AI employees. Voice Agents, n8n automation, Python AI. Saving businesses 20+ hours/week.',
    creator: '@shahzaib_builds',
    images: ['https://www.shahzaibbuilds.me/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <CustomChatbot />
      </body>
    </html>
  );
}
