import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { pagePaths } from '@/lib/content';

const now = new Date();

// Priority map: homepage and key pages get higher priority
const priorityMap: Record<string, number> = {
  '/': 1.0,
  '/features': 0.9,
  '/solutions': 0.9,
  '/pricing': 0.8,
  '/book-a-demo': 0.8,
  '/about': 0.7,
  '/contact': 0.7,
  '/help': 0.6,
};

const changeFreqMap: Record<string, 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'> = {
  '/': 'weekly',
  '/features': 'monthly',
  '/solutions': 'monthly',
  '/pricing': 'monthly',
  '/book-a-demo': 'monthly',
  '/about': 'yearly',
  '/contact': 'yearly',
  '/help': 'weekly',
};

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const allPaths = ['/', ...pagePaths.filter(path => !['/privacy', '/terms', '/blog'].includes(path))];
  return allPaths.map(path => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: changeFreqMap[path] || 'monthly',
    priority: priorityMap[path] || (path.startsWith('/features/') ? 0.7 : path.startsWith('/solutions/') ? 0.7 : 0.5),
  }));
}
