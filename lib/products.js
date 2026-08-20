import { MOCK_PRODUCTS } from './mock-data';
import {
  isLive,
  shopifyFetch,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  normalizeProduct,
  toShopifyLanguage,
} from './shopify';

function localizeMock(p, locale) {
  const l = locale === 'ar' ? 'ar' : 'en';
  return {
    ...p,
    title: p.title[l],
    productType: p.productType[l],
    typeKey: p.productType.en,
    description: p.description[l],
  };
}

export async function getProducts(locale = 'en') {
  if (!isLive()) {
    return MOCK_PRODUCTS.map((p) => localizeMock(p, locale));
  }
  try {
    const data = await shopifyFetch(PRODUCTS_QUERY, {
      language: toShopifyLanguage(locale),
      country: 'AE',
      first: 100,
    });
    return data.products.edges.map((e) => normalizeProduct(e.node));
  } catch (e) {
    console.error('Falling back to demo products:', e.message);
    return MOCK_PRODUCTS.map((p) => localizeMock(p, locale));
  }
}

export async function getProduct(handle, locale = 'en') {
  if (!isLive()) {
    const p = MOCK_PRODUCTS.find((x) => x.handle === handle);
    return p ? localizeMock(p, locale) : null;
  }
  try {
    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, {
      language: toShopifyLanguage(locale),
      country: 'AE',
      handle,
    });
    return normalizeProduct(data.product);
  } catch (e) {
    console.error('Product fetch failed:', e.message);
    return null;
  }
}

export function formatPrice(amount, currency = 'AED', locale = 'en') {
  try {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}
