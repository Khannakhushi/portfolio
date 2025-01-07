import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://khyaatikhanna.com/`,
      lastModified: new Date().toISOString(),
    },
  ];
}
