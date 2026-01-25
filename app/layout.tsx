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
  title: 'Shahzaib Builds | AI Automation Engineer',
  description: 'Deploying AI employees for lean teams. I replace manual operations with intelligent agents, saving businesses 20+ hours/week.',
  keywords: ['AI Automation', 'Voice Agents', 'Workflow Automation', 'AI Consulting', 'Shahzaib Hassan'],
  authors: [{ name: 'Shahzaib Hassan' }],
  openGraph: {
    title: 'Shahzaib Builds | AI Automation Engineer',
    description: 'Deploying AI employees for lean teams. I replace manual operations with intelligent agents.',
    url: 'https://shahzaibai.site',
    siteName: 'Shahzaib Builds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahzaib Builds | AI Automation Engineer',
    description: 'Deploying AI employees for lean teams.',
    creator: '@shahzaib_builds',
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
