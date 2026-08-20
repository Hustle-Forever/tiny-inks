import Link from 'next/link';
import PromoCarousel from '@/components/PromoCarousel';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import UspBar from '@/components/UspBar';
import { NewsletterForm } from '@/components/Forms';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/mock-data';
import { IMAGES, PHOTOS, imgAlt } from '@/lib/images';

const REVIEWS = {
  en: [
    { q: 'The colors are even better in real life. My desk finally feels like mine.', a: 'Noor · Abu Dhabi' },
    { q: 'Ordered as a gift, kept it for myself. Ordering again. Sorry, Sara.', a: 'Maha · Dubai' },
    { q: 'Thick paper, zero ghosting, and the wrapping made me gasp.', a: 'Lina · Sharjah' },
  ],
  ar: [
    { q: 'الألوان أجمل على الحقيقة. مكتبي أخيرًا صار يشبهني.', a: 'نور · أبوظبي' },
    { q: 'طلبته كهدية واحتفظت به لنفسي. سأطلب مرة أخرى. آسفة يا سارة.', a: 'مها · دبي' },
    { q: 'ورق سميك، ولا يظهر الحبر من الخلف، والتغليف أدهشني.', a: 'لينا · الشارقة' },
  ],
};

const PROMO_META = [
  { bg: 'var(--sage)', href: '/shop', photo: PHOTOS.pensCase },
  { bg: 'var(--blush)', href: '/bundles', photo: PHOTOS.giftBlush },
];

function ProductRow({ id, eyebrow, title, cta, href, products, locale, dict }) {
  return (
    <section className="section row-section" id={id}>
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
            <h2 style={{ marginBottom: 0 }}>{title}</h2>
          </Reveal>
          <Link href={href} className="btn btn-ghost btn-sm">
            {cta} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="shelf">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const products = await getProducts(locale);
  const bestsellers = products.filter((p) => p.tags?.includes('bestseller')).slice(0, 8);
  const shelf = bestsellers.length >= 3 ? bestsellers : products.slice(0, 8);
  const newest = [...products]
    .filter((p) => p.available)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  const bundles = products.filter((p) => p.tags?.includes('bundle'));
  const reviews = REVIEWS[locale];

  return (
    <>
      <PromoCarousel dict={dict} locale={locale} />
      <UspBar dict={dict} />

      {/* two wide promo tiles */}
      <section className="section row-section">
        <div className="wrap promo-tiles">
          {dict.promos.map((promo, i) => {
            const meta = PROMO_META[i];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <Link href={`/${locale}${meta.href}`} className="promo-tile" style={{ background: meta.bg }}>
                  <span>
                    <h3>{promo.title}</h3>
                    <p>{promo.line}</p>
                    <span className="btn btn-ink btn-sm">{promo.cta}</span>
                  </span>
                  <img src={meta.photo.sm || meta.photo.url} alt={imgAlt(meta.photo, locale)} loading="lazy" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ProductRow
        id="best-sellers"
        eyebrow={dict.home.bestEyebrow}
        title={dict.home.bestTitle}
        cta={dict.home.viewAll}
        href={`/${locale}/shop`}
        products={shelf}
        locale={locale}
        dict={dict}
      />

      {/* category grid */}
      <section className="section row-section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{dict.home.categoriesEyebrow}</div>
            <h2>{dict.home.categoriesTitle}</h2>
          </Reveal>
          <div className="tiles tiles-5" style={{ marginTop: 22 }}>
            {CATEGORIES.map((c, i) => {
              const count = products.filter((p) => c.match.includes(p.typeKey || p.productType)).length;
              const photo = IMAGES.categories[c.key];
              return (
                <Reveal key={c.key} delay={i * 0.05}>
                  <Link href={`/${locale}/shop?type=${encodeURIComponent(c.match[0])}`} className="tile">
                    <div className="tile-media">
                      <img src={photo.sm || photo.url} alt={imgAlt(photo, locale)} loading="lazy" />
                      <div className="tile-tint" style={{ background: c.color }} />
                      <div className="tile-overlay">
                        <h3>{locale === 'ar' ? c.ar : c.en}</h3>
                        <p>{count} {dict.shop.results}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProductRow
        eyebrow={dict.home.newEyebrow}
        title={dict.home.newTitle}
        cta={dict.home.viewAll}
        href={`/${locale}/shop`}
        products={newest}
        locale={locale}
        dict={dict}
      />

      <ProductRow
        eyebrow={dict.home.bundlesEyebrow}
        title={dict.home.bundlesTitle}
        cta={dict.home.bundlesCta}
        href={`/${locale}/bundles`}
        products={bundles}
        locale={locale}
        dict={dict}
      />

      {/* reviews */}
      <section className="section row-section">
        <div className="wrap">
          <Reveal><h2>{dict.home.reviewsTitle}</h2></Reveal>
          <div className="cards-3" style={{ marginTop: 22 }}>
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="review">
                  <div className="stars">★★★★★</div>
                  <p>“{r.q}”</p>
                  <span>{r.a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* newsletter */}
      <section className="section row-section">
        <div className="wrap">
          <Reveal>
            <div className="block cream grain" style={{ textAlign: 'center' }}>
              <h2>{dict.home.newsTitle}</h2>
              <p className="lede" style={{ margin: '0 auto 26px' }}>{dict.home.newsLede}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NewsletterForm dict={dict} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
