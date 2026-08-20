'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { CATEGORIES } from '@/lib/mock-data';

export default function Header({ dict, locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [term, setTerm] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenu(false); setShopOpen(false); }, [pathname]);

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

  const submitSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    setMenu(false);
    router.push(`/${locale}/shop${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap header-inner">
        <Link href={`/${locale}`} className="brand" aria-label={dict.brand}>
          <img src="/logo-icon.png" alt="" />
          <span className="brand-name">Tiny Inks</span>
        </Link>

        <nav className={`nav ${menu ? 'open' : ''}`} aria-label="Main">
          <form className="nav-search" onSubmit={submitSearch} role="search">
            <input
              className="input"
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder={dict.search.placeholder}
              aria-label={dict.search.label}
            />
          </form>

          <Link href={`/${locale}`} className={pathname === `/${locale}` ? 'active' : ''}>
            {dict.nav.home}
          </Link>

          <div className={`dropdown-wrap ${shopOpen ? 'open' : ''}`}>
            <div className="nav-shop-row">
              <Link
                href={`/${locale}/shop`}
                className={`nav-shop ${pathname.startsWith(`/${locale}/shop`) ? 'active' : ''}`}
              >
                {dict.nav.shop}
              </Link>
              <button
                className="acc-toggle"
                onClick={() => setShopOpen((v) => !v)}
                aria-expanded={shopOpen}
                aria-label={dict.nav.shop}
              >
                ▾
              </button>
            </div>
            <div className="dropdown">
              <Link href={`/${locale}/shop`}>{dict.nav.allProducts}</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.key} href={`/${locale}/shop?type=${encodeURIComponent(c.match[0])}`}>
                  {locale === 'ar' ? c.ar : c.en}
                </Link>
              ))}
            </div>
          </div>

          <Link href={`/${locale}/bundles`} className={pathname === `/${locale}/bundles` ? 'active' : ''}>
            {dict.nav.drops}
          </Link>
          <Link href={`/${locale}/about`} className={pathname === `/${locale}/about` ? 'active' : ''}>
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} className={pathname === `/${locale}/contact` ? 'active' : ''}>
            {dict.nav.contact}
          </Link>
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
