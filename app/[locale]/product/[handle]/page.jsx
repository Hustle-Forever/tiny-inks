import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Gallery from '@/components/Gallery';
import AddToCart from '@/components/AddToCart';
import ProductCard from '@/components/ProductCard';
import { getDict } from '@/lib/dictionaries';
import { getProduct, getProducts, formatPrice } from '@/lib/products';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle, params.locale);
  return { title: product ? product.title : 'Product' };
}

export default async function ProductPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const product = await getProduct(params.handle, locale);
  if (!product) notFound();

  const all = await getProducts(locale);
  const related = all
    .filter((p) => p.handle !== product.handle && p.productType === product.productType)
    .slice(0, 4);
  const relatedList = related.length ? related : all.filter((p) => p.handle !== product.handle).slice(0, 4);

  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(30px, 5vw, 60px)' }}>
        <div className="wrap pdp">
          <Gallery images={product.images} title={product.title} />
          <div className="pdp-buy">
            <div className="card-type">{product.productType}</div>
            <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}>{product.title}</h1>
            <div className="pdp-price">{formatPrice(product.price, product.currency, locale)}</div>
            <AddToCart product={product} dict={dict} />
            <p className="lede" style={{ fontSize: '1.02rem' }}>{product.description}</p>
            <div className="pdp-meta">
              <div><strong>{dict.product.shipping}:</strong> {dict.product.shippingText}</div>
              <div><strong>{dict.product.wrap}:</strong> {dict.product.wrapText}</div>
            </div>
          </div>
        </div>
      </section>

      {relatedList.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal><h2>{dict.product.related}</h2></Reveal>
            <div className="shelf" style={{ marginTop: 26 }}>
              {relatedList.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
