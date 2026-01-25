import './globals.css';
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
  metadataBase: new URL('https://shahzaibai.site'),
  title: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer | Voice Agents & Workflow Automation',
  description: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer deploying autonomous AI employees for lean teams. Specializing in Voice Agents, n8n automation, and Python AI solutions that save businesses 20+ hours/week.',
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
  openGraph: {
    title: 'Shahzaib Hassan (Shahzaib Builds) - AI Automation Engineer',
    description: 'AI Automation Engineer deploying autonomous AI employees that save lean teams 20+ hours/week. Specializing in Voice Agents, workflow automation with n8n, and custom Python AI solutions.',
    url: 'https://shahzaibai.site',
    siteName: 'Shahzaib Builds',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://shahzaibai.site/og-image.jpg',
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
    images: ['https://shahzaibai.site/og-image.jpg'],
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
      </body>
    </html>
  );
}
