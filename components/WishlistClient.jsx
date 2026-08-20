'use client';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useWishlist } from './WishlistContext';

export default function WishlistClient({ products, dict, locale }) {
  const wishlist = useWishlist();
  const saved = products.filter((p) => wishlist?.has(p.handle));

  if (saved.length === 0) {
    return (
      <div className="empty" style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="empty-glyph" aria-hidden="true">✦</div>
        <h3>{dict.cartUi.empty}</h3>
        <Link href={`/${locale}/shop`} className="btn btn-primary" style={{ marginTop: 10 }}>
          {dict.cartUi.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid">
      {saved.map((p) => (
        <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
