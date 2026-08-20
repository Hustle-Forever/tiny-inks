import Link from 'next/link';

export default function Footer({ dict, locale }) {
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@tinyinks.ae';
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img src="/logo-icon.png" alt="Tiny Inks" />
          <p>{dict.footer.blurb}</p>
          <p style={{ fontFamily: 'var(--f-plexar), sans-serif', opacity: 0.85 }}>{dict.footer.arabicName}</p>
        </div>
        <div>
          <h3>{dict.footer.shop}</h3>
          <Link href={`/${locale}/shop`}>{dict.nav.shop}</Link>
          <Link href={`/${locale}/drops`}>{dict.nav.drops}</Link>
          <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
        </div>
        <div>
          <h3>{dict.footer.help}</h3>
          <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
          <Link href={`/${locale}/faq`}>{dict.policies.faq}</Link>
          <a href={`mailto:${email}`}>{email}</a>
          {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a>}
        </div>
        <div>
          <h3>{dict.policies.title}</h3>
          <Link href={`/${locale}/policies/shipping`}>{dict.policies.shipping}</Link>
          <Link href={`/${locale}/policies/returns`}>{dict.policies.returns}</Link>
          <Link href={`/${locale}/policies/privacy`}>{dict.policies.privacy}</Link>
          <Link href={`/${locale}/policies/terms`}>{dict.policies.terms}</Link>
        </div>
        <div>
          <h3>{dict.footer.follow}</h3>
          <a href={ig} target="_blank" rel="noreferrer">Instagram</a>
          {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a>}
          <div className="payment-row">
            <span className="label">{dict.payment.accept}</span>
          </div>
          <div className="payment-row" style={{ marginTop: 6 }}>
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
