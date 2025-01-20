import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jobly - The Future of Recruitment',
  description: 'Where talent meets opportunity through human-centric AI matchmaking. Join the recruitment revolution.',
  keywords: 'recruitment, AI matchmaking, job search, hiring platform, career opportunities',
  openGraph: {
    title: 'Jobly - The Future of Recruitment',
    description: 'Where talent meets opportunity through human-centric AI matchmaking. Join the recruitment revolution.',
    url: 'https://jobly.ai',
    siteName: 'Jobly',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jobly - The Future of Recruitment'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobly - The Future of Recruitment',
    description: 'Where talent meets opportunity through human-centric AI matchmaking. Join the recruitment revolution.',
    images: ['/og-image.png'],
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
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
