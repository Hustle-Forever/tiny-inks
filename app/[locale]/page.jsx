import Link from 'next/link';
import HeroAssembly from '@/components/HeroAssembly';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import PhotoFrame from '@/components/PhotoFrame';
import TornEdge from '@/components/TornEdge';
import UspBar from '@/components/UspBar';
import WhyStrip from '@/components/WhyStrip';
import { NewsletterForm } from '@/components/Forms';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/mock-data';
import { IMAGES, imgAlt } from '@/lib/images';

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

export default async function Home({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const products = await getProducts(locale);
  const bestsellers = products.filter((p) => p.tags?.includes('bestseller')).slice(0, 6);
  const shelf = bestsellers.length >= 3 ? bestsellers : products.slice(0, 6);
  const newest = [...products]
    .filter((p) => p.available)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const bundles = products.filter((p) => p.tags?.includes('bundle')).slice(0, 3);
  const reviews = REVIEWS[locale];

  return (
    <>
      <HeroAssembly dict={dict} locale={locale} />
      <TornEdge color="var(--paper)" />
      <Marquee items={dict.marquee} />
      <UspBar dict={dict} />

      {/* 1 — categories: every shelf one tap away */}
      <section className="section" style={{ paddingTop: 'clamp(44px, 6vw, 80px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{dict.home.categoriesEyebrow}</div>
            <h2>{dict.home.categoriesTitle}</h2>
          </Reveal>
          <div className="tiles tiles-5" style={{ marginTop: 26 }}>
            {CATEGORIES.map((c, i) => {
              const count = products.filter((p) => c.match.includes(p.typeKey || p.productType)).length;
              const photo = IMAGES.categories[c.key];
              return (
                <Reveal key={c.key} delay={i * 0.06}>
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

      {/* 2 — best sellers */}
      <section className="section" id="best-sellers" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <div className="eyebrow">{dict.home.bestEyebrow}</div>
              <h2 style={{ marginBottom: 0 }}>{dict.home.bestTitle}</h2>
            </Reveal>
            <Link href={`/${locale}/shop`} className="btn btn-ghost btn-sm">
              {dict.home.viewAll} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="shelf">
            {shelf.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — new arrivals */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <div className="eyebrow">{dict.home.newEyebrow}</div>
              <h2 style={{ marginBottom: 0 }}>{dict.home.newTitle}</h2>
            </Reveal>
            <Link href={`/${locale}/shop`} className="btn btn-ghost btn-sm">
              {dict.home.viewAll} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="shelf">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 — gift sets & bundles */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <div className="eyebrow">{dict.home.bundlesEyebrow}</div>
              <h2 style={{ marginBottom: 0 }}>{dict.home.bundlesTitle}</h2>
            </Reveal>
            <Link href={`/${locale}/bundles`} className="btn btn-ghost btn-sm">
              {dict.home.bundlesCta} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-3">
            {bundles.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 — why shop with us */}
      <WhyStrip dict={dict} />

      {/* 6 — reviews */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2>{dict.home.reviewsTitle}</h2></Reveal>
          <div className="cards-3" style={{ marginTop: 26 }}>
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
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

      {/* 7 — newsletter */}
      <section className="section" style={{ paddingTop: 0 }}>
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

      {/* 8 — instagram polaroids, last */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <Reveal><h2 style={{ marginBottom: 0 }}>{dict.home.igTitle}</h2></Reveal>
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
            >
              {dict.home.igHandle}
            </a>
          </div>
          <div className="ig-strip">
            {IMAGES.polaroids.map((photo, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <PhotoFrame
                  photo={photo}
                  locale={locale}
                  variant="polaroid"
                  caption={dict.home.polaroids[i]}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
