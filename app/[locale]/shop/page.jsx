import { Suspense } from 'react';
import ShopClient from '@/components/ShopClient';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';

export async function generateMetadata({ params }) {
  const dict = getDict(params.locale);
  return { title: dict.shop.title, description: dict.shop.lede };
}

export default async function ShopPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const products = await getProducts(locale);

  return (
    <section className="section" style={{ paddingTop: 'clamp(18px, 3vw, 34px)' }}>
      <div className="wrap">
        <h1 className="shop-h1">{dict.shop.title}</h1>
        <Suspense>
          <ShopClient products={products} dict={dict} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
