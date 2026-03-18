import './globals.css';
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
  title: 'Shahzaib Builds — Coming Soon',
  description: 'Something new is brewing. Shahzaib Builds will be back shortly.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
        {/* GA disabled during coming-soon mode */}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
