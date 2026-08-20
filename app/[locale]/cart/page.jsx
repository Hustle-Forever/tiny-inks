import Reveal from '@/components/Reveal';
import CartPageClient from '@/components/CartPageClient';
import { getDict } from '@/lib/dictionaries';

export async function generateMetadata({ params }) {
  const dict = getDict(params.locale);
  return { title: dict.cartUi.title, description: dict.cartPage.lede };
}

export default function CartPage({ params }) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const dict = getDict(locale);

  return (
    <section className="section" style={{ paddingTop: 'clamp(40px, 6vw, 70px)' }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">Tiny Inks</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>{dict.cartUi.title}</h1>
          <p className="lede" style={{ marginBottom: 40 }}>{dict.cartPage.lede}</p>
        </Reveal>
        <CartPageClient dict={dict} locale={locale} />
      </div>
    </section>
  );
}
