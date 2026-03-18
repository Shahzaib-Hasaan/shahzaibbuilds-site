import './globals.css';
import ChatAssistant from '@/components/ChatAssistant';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';

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

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shahzaibbuilds.me'),
  title: 'Shahzaib Hassan | AI Automation Engineer',
  description: 'AI Automation Engineer building agents, voice bots, and workflow automation. From pre-med to shipping production AI systems.',
  keywords: [
    'Shahzaib Hassan',
    'Shahzaib Builds',
    'AI Automation Engineer',
    'n8n automation',
    'Make.com',
    'Voice AI',
    'Python',
    'Automaxion',
    'Lahore Pakistan'
  ],
  authors: [{ name: 'Shahzaib Hassan' }],
  creator: 'Shahzaib Hassan',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'owwbL11jdDB44_EtB0LitpPX31aO5yPqQss-eK35ozE',
  },
  openGraph: {
    title: 'Shahzaib Hassan — AI Automation Engineer',
    description: 'AI Automation Engineer building agents, voice bots, and workflow automation. From pre-med to shipping production AI systems.',
    url: 'https://www.shahzaibbuilds.me',
    siteName: 'Shahzaib Builds',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.shahzaibbuilds.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shahzaib Hassan — AI Automation Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahzaib Hassan — AI Automation Engineer',
    description: 'AI Automation Engineer building agents, voice bots, and workflow automation. From pre-med to shipping production AI systems.',
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BPJFLR0JE9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BPJFLR0JE9');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
        <ChatAssistant />
        <Analytics />
      </body>
    </html>
  );
}
