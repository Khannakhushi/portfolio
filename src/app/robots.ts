import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/Khanna_Resume.pdf'],
      },
    ],
    sitemap: `https://khyaatikhanna.com/sitemap.xml`,
  };
}
