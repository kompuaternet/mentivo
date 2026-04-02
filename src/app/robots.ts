import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/career/test'],
      },
    ],
    sitemap: 'https://www.mentivo.net/sitemap.xml',
    host: 'https://www.mentivo.net',
  }
}
