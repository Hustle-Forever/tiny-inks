import WishlistClient from '@/components/WishlistClient';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';

export async function generateMetadata({ params }) {
  const dict = getDict(params.locale);
  return { title: dict.nav.wishlist };
}

export default async function WishlistPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const products = await getProducts(locale);

  return (
    <section className="section" style={{ paddingTop: 'clamp(24px, 4vw, 44px)' }}>
      <div className="wrap">
        <h1 className="shop-h1" style={{ marginBottom: 22 }}>{dict.nav.wishlist}</h1>
        <WishlistClient products={products} dict={dict} locale={locale} />
      </div>
    </section>
  );
}
