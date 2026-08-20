#!/usr/bin/env node
/**
 * Catalog health check — run with:  node scripts/catalog-check.mjs
 *
 * Fetches every product from the live Shopify store and reports items that
 * are missing images, price, product type, collection membership, or an
 * Arabic translation — so the owner fixes DATA in Shopify admin, not code.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* load .env.local / .env without extra deps */
for (const file of ['.env.local', '.env']) {
  const p = resolve(root, file);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2026-01';

if (!DOMAIN || !TOKEN) {
  console.log('✦ Demo mode (no Shopify credentials in .env.local).');
  console.log('  Fill NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN, then rerun.');
  process.exit(0);
}

async function gql(query, variables) {
  const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const QUERY = `
  query Check($language: LanguageCode!, $cursor: String)
  @inContext(language: $language, country: AE) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          title
          description
          productType
          priceRange { minVariantPrice { amount } }
          images(first: 1) { edges { node { url } } }
          collections(first: 5) { edges { node { handle } } }
        }
      }
    }
  }
`;

async function fetchAll(language) {
  const out = [];
  let cursor = null;
  do {
    const data = await gql(QUERY, { language, cursor });
    out.push(...data.products.edges.map((e) => e.node));
    const info = data.products.pageInfo;
    cursor = info.hasNextPage ? info.endCursor : null;
  } while (cursor);
  return out;
}

const en = await fetchAll('EN');
const ar = await fetchAll('AR');
const arByHandle = new Map(ar.map((p) => [p.handle, p]));

const issues = {
  noImage: [],
  noPrice: [],
  noType: [],
  noCollection: [],
  noArabic: [],
};

for (const p of en) {
  if (!p.images.edges.length) issues.noImage.push(p.handle);
  if (!Number(p.priceRange?.minVariantPrice?.amount)) issues.noPrice.push(p.handle);
  if (!p.productType) issues.noType.push(p.handle);
  if (!p.collections.edges.length) issues.noCollection.push(p.handle);
  const arP = arByHandle.get(p.handle);
  /* heuristic: if the AR title equals the EN title, Translate & Adapt has no
     Arabic translation for it yet */
  if (!arP || arP.title === p.title) issues.noArabic.push(p.handle);
}

const label = {
  noImage: 'Missing images (add at least 2 per product)',
  noPrice: 'Missing/zero price',
  noType: 'Missing product type (Notebooks · Journals · Planners · Pens & Tools · Desk & Notes · Gift Sets)',
  noCollection: 'In NO collection (still visible in All Products, but hidden from category pages)',
  noArabic: 'No Arabic translation yet (Translate & Adapt)',
};

console.log(`\n✦ Tiny Inks catalog check — ${en.length} products on ${DOMAIN}\n`);
let total = 0;
for (const [key, handles] of Object.entries(issues)) {
  if (!handles.length) continue;
  total += handles.length;
  console.log(`● ${label[key]} — ${handles.length}:`);
  for (const h of handles) console.log(`   - ${h}`);
  console.log('');
}
if (total === 0) {
  console.log('✓ All good: every product has images, a price, a product type, a collection, and an Arabic translation.\n');
} else {
  console.log(`${total} issue(s) found. Fix them in Shopify admin — no code changes needed.\n`);
}
