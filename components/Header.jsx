'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';

export default function Header({ dict, locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenu(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const rest = pathname.replace(/^\/(en|ar)/, '') || '';
  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    { href: `/${locale}/drops`, label: dict.nav.drops, dot: '01' },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap header-inner">
        <Link href={`/${locale}`} className="brand" aria-label={dict.brand}>
          <img src="/logo-icon.png" alt="" />
          <span className="brand-name">Tiny Inks</span>
        </Link>

        <nav className={`nav ${menu ? 'open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
              {l.label}
              {l.dot ? <span className="dot">{l.dot}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href={`/${otherLocale}${rest}`} className="locale-btn" aria-label="Switch language">
            {otherLocale === 'ar' ? 'العربية' : 'EN'}
          </Link>
          <button className="cart-btn" onClick={() => cart.setOpen(true)} aria-label={`${dict.cart}${cart.count > 0 ? ` (${cart.count})` : ''}`}>
            <span className="cart-label">{dict.cart}</span>
            <svg className="cart-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l1.2 13H4.8L6 7z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            {cart.count > 0 && <span className="cart-count" aria-hidden="true">{cart.count}</span>}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
            aria-expanded={menu}
          >
            {menu ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
