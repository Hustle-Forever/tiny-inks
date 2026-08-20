import Link from 'next/link';
import HeroAssembly from '@/components/HeroAssembly';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import Countdown from '@/components/Countdown';
import PhotoFrame from '@/components/PhotoFrame';
import TornEdge from '@/components/TornEdge';
import DeskGallery from '@/components/DeskGallery';
import EditorialPhoto from '@/components/EditorialPhoto';
import UspBar from '@/components/UspBar';
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
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE || '2026-09-01T18:00:00+04:00';
  const reviews = REVIEWS[locale];

  return (
    <>
      <HeroAssembly dict={dict} locale={locale} />
      <TornEdge color="var(--paper)" />
      <Marquee items={dict.marquee} />
      <UspBar dict={dict} />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{dict.home.categoriesEyebrow}</div>
            <h2>{dict.home.categoriesTitle}</h2>
          </Reveal>
          <div className="tiles" style={{ marginTop: 30 }}>
            {CATEGORIES.map((c, i) => {
              const count = products.filter((p) => c.match.includes(p.typeKey || p.productType)).length;
              const photo = IMAGES.categories[c.key];
              return (
                <Reveal key={c.key} delay={i * 0.08}>
                  <Link
                    href={`/${locale}/shop?type=${encodeURIComponent(c.match[0])}`}
                    className="tile"
                  >
                    <div className="tile-media">
                      <img src={photo.url} alt={imgAlt(photo, locale)} loading="lazy" />
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <Reveal>
              <div className="eyebrow">{dict.home.bestEyebrow}</div>
              <h2 style={{ marginBottom: 0 }}>{dict.home.bestTitle}</h2>
            </Reveal>
            <Link href={`/${locale}/shop`} className="btn btn-ghost btn-sm">{dict.home.viewAll} <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <div className="shelf">
            {shelf.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split wide-start">
          <Reveal>
            <EditorialPhoto locale={locale} />
          </Reveal>
          <Reveal delay={0.12}>
            <div className="eyebrow">{dict.home.editorialEyebrow}</div>
            <h2>{dict.home.editorialTitle}</h2>
            <p className="lede" style={{ marginBottom: 26 }}>{dict.home.editorialText}</p>
            <Link href={`/${locale}/about`} className="btn">{dict.home.editorialCta}</Link>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="block blush manifesto grain">
              <p>{dict.home.manifesto}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{dict.home.deskEyebrow}</div>
            <h2>{dict.home.deskTitle}</h2>
          </Reveal>
          <DeskGallery locale={locale} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="block ink" style={{ textAlign: 'center' }}>
              <div className="eyebrow" style={{ color: 'var(--sand)' }}>{dict.home.dropEyebrow}</div>
              <h2>{dict.home.dropTitle.split('—')[0]} — <em>{dict.home.dropTitle.split('—')[1]}</em></h2>
              <p className="lede" style={{ color: 'var(--cream)', margin: '0 auto 30px' }}>{dict.home.dropLede}</p>
              <Countdown target={dropDate} labels={dict.drops} locale={locale} />
              <div style={{ marginTop: 34 }}>
                <Link href={`/${locale}/drops`} className="btn btn-primary">{dict.home.dropCta}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
                <a
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  style={{ display: 'block' }}
                >
                  <PhotoFrame
                    photo={photo}
                    locale={locale}
                    variant="polaroid"
                    caption={dict.home.polaroids[i]}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
