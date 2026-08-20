'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/products';

export default function CartDrawer({ dict, locale }) {
  const cart = useCart();
  const t = dict.cartUi;

  useEffect(() => {
    if (!cart.open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') cart.setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [cart.open]);

  return (
    <>
      <div className={`drawer-veil ${cart.open ? 'open' : ''}`} onClick={() => cart.setOpen(false)} />
      <aside className={`drawer ${cart.open ? 'open' : ''}`} aria-label={t.title} aria-hidden={!cart.open}>
        <div className="drawer-head">
          <h3>{t.title} ({cart.count})</h3>
          <button className="drawer-close" onClick={() => cart.setOpen(false)} aria-label="Close">✕</button>
        </div>

        <div className="drawer-body">
          {cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingBlock: 40 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{t.empty}</p>
              <Link href={`/${locale}/shop`} className="btn btn-sm" onClick={() => cart.setOpen(false)}>
                {t.emptyCta}
              </Link>
            </div>
          ) : (
            cart.items.map((item) => (
              <div className="line-item" key={item.lineId}>
                {item.image ? <img src={item.image} alt="" /> : <div style={{ width: 74, height: 92, borderRadius: 10, background: 'var(--cream)' }} />}
                <div>
                  <h4>{item.title}</h4>
                  <div className="qty">
                    <button onClick={() => cart.setQty(item, item.qty - 1)} aria-label="-">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => cart.setQty(item, item.qty + 1)} aria-label="+">+</button>
                  </div>
                  <button className="line-remove" onClick={() => cart.remove(item)}>{t.remove}</button>
                </div>
                <strong>{formatPrice(item.price * item.qty, 'AED', locale)}</strong>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal">
              <span>{t.subtotal}</span>
              <span>{formatPrice(cart.subtotal, 'AED', locale)}</span>
            </div>
            <Link
              href={`/${locale}/cart`}
              className="btn btn-ghost btn-sm"
              onClick={() => cart.setOpen(false)}
            >
              {t.viewCart}
            </Link>
            {cart.live ? (
              <button className="btn btn-primary" onClick={cart.checkout}>{t.checkout}</button>
            ) : (
              <>
                <button className="btn btn-primary" disabled style={{ opacity: 0.55, cursor: 'not-allowed' }}>{t.checkout}</button>
                <div className="drawer-note">✦ {t.demoNote}</div>
              </>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
