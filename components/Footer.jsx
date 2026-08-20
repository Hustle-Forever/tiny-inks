import Link from 'next/link';

export default function Footer({ dict, locale, collections = [] }) {
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@tinyinks.ae';
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971500000000';
  const suggestHref = `https://wa.me/${wa}?text=${encodeURIComponent(dict.footerUi.suggestMsg)}`;

  return (
    <footer className="footer">
      {/* prominent contact + suggest strip */}
      <div className="wrap footer-contact">
        <div className="footer-contact-line">
          <strong>{dict.footerUi.contactTitle}:</strong>
          <a href={`mailto:${email}`}>{email}</a>
          <span aria-hidden="true">·</span>
          <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp +{wa}</a>
        </div>
        <a className="btn btn-primary btn-sm" href={suggestHref} target="_blank" rel="noreferrer">
          {dict.footerUi.suggest}
        </a>
      </div>

      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img src="/logo-icon.png" alt="Tiny Inks" />
          <p>{dict.footer.blurb}</p>
          <p style={{ fontFamily: 'var(--f-plexar), sans-serif', opacity: 0.85 }}>{dict.footer.arabicName}</p>
        </div>
        <div>
          <h3>{dict.footerUi.company}</h3>
          <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
          <a href={`https://wa.me/${wa}?text=${encodeURIComponent(dict.footerUi.bulkMsg)}`} target="_blank" rel="noreferrer">{dict.nav.bulk}</a>
        </div>
        <div>
          <h3>{dict.footer.shop}</h3>
          <Link href={`/${locale}/shop`}>{dict.nav.allProducts}</Link>
          {collections.slice(0, 4).map((c) => (
            <Link key={c.handle} href={`/${locale}/shop/${c.handle}`}>
              {c.title}
            </Link>
          ))}
          <Link href={`/${locale}/bundles`}>{dict.nav.drops}</Link>
        </div>
        <div>
          <h3>{dict.footer.help}</h3>
          <Link href={`/${locale}/faq`}>{dict.policies.faq}</Link>
          <Link href={`/${locale}/policies/shipping`}>{dict.policies.shipping}</Link>
          <Link href={`/${locale}/policies/returns`}>{dict.policies.returns}</Link>
          <Link href={`/${locale}/wishlist`}>{dict.nav.wishlist}</Link>
        </div>
        <div>
          <h3>{dict.policies.title}</h3>
          <Link href={`/${locale}/policies/privacy`}>{dict.policies.privacy}</Link>
          <Link href={`/${locale}/policies/terms`}>{dict.policies.terms}</Link>
          <h3 style={{ marginTop: 18 }}>{dict.footer.follow}</h3>
          <a href={ig} target="_blank" rel="noreferrer">Instagram</a>
          <div className="payment-row" style={{ marginTop: 10 }}>
            {dict.payment.methods.map((m) => (
              <span className="payment-pill" key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Tiny Inks · Abu Dhabi</span>
        <span>{dict.footer.rights}</span>
      </div>
    </footer>
  );
}
