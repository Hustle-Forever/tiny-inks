import { SITE_URL } from '@/lib/site';
import { getProducts } from '@/lib/products';
import { POLICY_SLUGS } from '@/content/policies';
import { LOCALES } from '@/lib/dictionaries';

const STATIC_PATHS = ['', '/shop', '/drops', '/about', '/contact', '/faq', '/cart'];

export default async function sitemap() {
  const now = new Date();
  const entries = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' || path === '/shop' || path === '/drops' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/shop' ? 0.9 : 0.6,
      });
    }
    for (const slug of POLICY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/policies/${slug}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
  }

  try {
    const products = await getProducts('en');
    for (const p of products) {
      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}/product/${p.handle}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch {
    /* live-store fetch failed at build time — static routes still listed */
  }

  return entries;
}
