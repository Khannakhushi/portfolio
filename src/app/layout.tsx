import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Khyaati Khanna | Software Engineer',
  description:
    'Software Engineer at JPMorgan Chase & Co. Previously Amazon, USAA. Building scalable systems and elegant interfaces.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'JPMorgan Chase',
    'Amazon',
    'Web Development',
    'Portfolio',
    'Khyaati Khanna',
  ],
  authors: [{ name: 'Khyaati Khanna' }],
  creator: 'Khyaati Khanna',
  publisher: 'Khyaati Khanna',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://khyaatikhanna.com',
    siteName: 'Khyaati Khanna',
    title: 'Khyaati Khanna | Software Engineer',
    description:
      'Software Engineer at JPMorgan Chase & Co. Previously Amazon, USAA. Building scalable systems and elegant interfaces.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} ${instrumentSerif.variable} overflow-x-hidden`}>
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute -top-[30%] -left-[15%] h-[700px] w-[700px] rounded-full opacity-[0.025] blur-[120px]"
            style={{ backgroundColor: 'hsl(var(--warm))' }}
          />
          <div
            className="absolute top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full opacity-[0.02] blur-[100px]"
            style={{ backgroundColor: 'hsl(var(--warm))' }}
          />
          <div
            className="absolute -bottom-[20%] left-[30%] h-[500px] w-[500px] rounded-full opacity-[0.015] blur-[100px]"
            style={{ backgroundColor: 'hsl(var(--warm))' }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
