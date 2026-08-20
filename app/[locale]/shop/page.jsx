import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import ShopClient from '@/components/ShopClient';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';

export async function generateMetadata({ params }) {
  const dict = getDict(params.locale);
  return { title: dict.shop.title };
}

export default async function ShopPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const products = await getProducts(locale);

  return (
    <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 70px)' }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">Tiny Inks</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>{dict.shop.title}</h1>
          <p className="lede" style={{ marginBottom: 44 }}>{dict.shop.lede}</p>
        </Reveal>
        <Suspense>
          <ShopClient products={products} dict={dict} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
