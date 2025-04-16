import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
const m = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Khyaati Khanna | Software Engineer & CS Student',
  description: `Hello! I'm Khyaati Khanna, a passionate software engineer and a junior at the University of Houston,
                    pursuing a major in Computer Science with minors in Business Administration and
                    Mathematics. Set to graduate in December 2025, I'm on a journey to become a
                    versatile full-stack developer.`,
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'Computer Science',
    'University of Houston',
    'Web Development',
    'Portfolio',
    'Khyaati Khanna',
  ],
  authors: [{ name: 'Khyaati Khanna' }],
  creator: 'Khyaati Khanna',
  publisher: 'Khyaati Khanna',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://khyaatikhanna.com',
    siteName: 'Khyaati Khanna Portfolio',
    title: 'Khyaati Khanna | Software Engineer & CS Student',
    description:
      'Software Engineer and Computer Science student at University of Houston specializing in full-stack development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${m.className} overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
