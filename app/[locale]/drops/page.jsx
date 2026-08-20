import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Countdown from '@/components/Countdown';
import ProductCard from '@/components/ProductCard';
import { NewsletterForm } from '@/components/Forms';
import { getDict } from '@/lib/dictionaries';
import { getProducts } from '@/lib/products';

export async function generateMetadata({ params }) {
  const dict = getDict(params.locale);
  return { title: dict.nav.drops, description: dict.drops.lede };
}

export default async function DropsPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);
  const t = dict.drops;
  const products = await getProducts(locale);
  const dropProducts = products.filter((p) => p.tags?.includes('drop-01'));
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE || '2026-09-01T18:00:00+04:00';

  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 70px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="block ink" style={{ textAlign: 'center' }}>
              <div className="eyebrow" style={{ color: 'var(--sand)' }}>{t.eyebrow}</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>{t.title}</h1>
              <p className="lede" style={{ color: 'var(--cream)', margin: '0 auto 14px' }}>{t.lede}</p>
              <p style={{ fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--mustard)', marginBottom: 16 }}>
                {t.current}: {dict.home.dropTitle}
              </p>
              <p style={{ opacity: 0.75, margin: '0 0 12px', fontWeight: 700, fontSize: '0.85rem' }}>{t.closes}</p>
              <Countdown target={dropDate} labels={t} locale={locale} />
              <div style={{ marginTop: 32 }}>
                <a href="#drop-items" className="btn btn-primary">{t.shopDrop}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="drop-items" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{t.current}</div>
            <h2>{dict.home.dropTitle}</h2>
          </Reveal>
          <div className="grid" style={{ marginTop: 30, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {dropProducts.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2>{t.how}</h2></Reveal>
          <div className="cards-3" style={{ marginTop: 26 }}>
            {[
              { bg: 'var(--blue)', n: '01', title: t.step1t, d: t.step1d },
              { bg: 'var(--mustard)', n: '02', title: t.step2t, d: t.step2d },
              { bg: 'var(--blush)', n: '03', title: t.step3t, d: t.step3d },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="block" style={{ background: s.bg, padding: '34px 30px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', opacity: 0.5, marginBottom: 8 }}>{s.n}</div>
                  <h3>{s.title}</h3>
                  <p style={{ margin: 0 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="block sage" style={{ textAlign: 'center' }}>
              <h2>{t.notifyTitle}</h2>
              <p className="lede" style={{ margin: '0 auto 26px', color: '#10312c' }}>{t.notifyLede}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NewsletterForm dict={dict} />
              </div>
              <p style={{ marginTop: 30, marginBottom: 0, fontWeight: 700, opacity: 0.75 }}>
                ✦ {t.archive} {t.archiveNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
