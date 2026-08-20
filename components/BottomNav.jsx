'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';

/* Phone-only bottom tab bar: Home / Shop / Gift Sets / Cart.
   Hidden on product pages, where the sticky buy bar takes the slot. */
export default function BottomNav({ dict, locale }) {
  const pathname = usePathname();
  const cart = useCart();

  const tabs = [
    {
      href: `/${locale}`,
      label: dict.nav.home,
      active: pathname === `/${locale}`,
      icon: (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" />
        </svg>
      ),
    },
    {
      href: `/${locale}/shop`,
      label: dict.nav.shop,
      active: pathname.startsWith(`/${locale}/shop`),
      icon: (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7h16l-1.5 14h-13z" /><path d="M8 10V6a4 4 0 0 1 8 0v4" />
        </svg>
      ),
    },
    {
      href: `/${locale}/bundles`,
      label: dict.nav.drops,
      active: pathname === `/${locale}/bundles`,
      icon: (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="9" width="18" height="12" rx="1.5" /><path d="M12 9v12M3 13h18" /><path d="M12 9c-2 0-5-.8-5-3a2.4 2.4 0 0 1 5-.8A2.4 2.4 0 0 1 17 6c0 2.2-3 3-5 3z" />
        </svg>
      ),
    },
    {
      href: `/${locale}/cart`,
      label: dict.cart,
      active: pathname === `/${locale}/cart`,
      badge: cart.count,
      icon: (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" />
          <path d="M3 4h2l2.5 12h10L20 8H6" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav" aria-label={dict.nav.shop}>
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={`bottom-tab ${t.active ? 'active' : ''}`}>
          <span className="bottom-tab-icon">
            {t.icon}
            {t.badge > 0 && <span className="bottom-tab-badge">{t.badge}</span>}
          </span>
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
