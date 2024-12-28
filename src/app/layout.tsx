import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
const m = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Khyaati Khanna',
  description: 'I am Khushi :)',
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
