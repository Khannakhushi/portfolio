import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
const m = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Khyaati Khanna',
  description: `Hello! I'm Khyaati Khanna, a passionate software engineer and a junior at the University of Houston,
                    pursuing a major in Computer Science with minors in Business Administration and
                    Mathematics. Set to graduate in December 2025, I'm on a journey to become a
                    versatile full-stack developer.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={m.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
