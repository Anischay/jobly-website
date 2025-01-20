import React from 'react';
import { Inter } from 'next/font/google';
import Navigation from '../components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jobly - Revolutionizing Tech Recruitment',
  description: 'Find your perfect tech job match with Jobly\'s innovative platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
} 