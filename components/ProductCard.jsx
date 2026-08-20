'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { formatPrice } from '@/lib/products';
import { COLOR_SWATCHES } from '@/lib/mock-data';

export default function ProductCard({ product, locale, dict }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const [added, setAdded] = useState(false);
  const imgA = product.images?.[0]?.url;
  const imgB = product.images?.[1]?.url || imgA;
  const isBundle = product.tags?.includes('bundle');
  const isBest = product.tags?.includes('bestseller');
  const href = `/${locale}/product/${product.handle}`;
  const saved = wishlist?.has(product.handle);

  return (
    <div className="card">
      <div className="card-media">
        <Link href={href} className="card-media-link" aria-label={product.title} tabIndex={-1}>
          {imgA ? (
            <img className="main" src={imgA} alt={product.title} loading="lazy" />
          ) : (
            <span className="card-noimg" aria-hidden="true">✦</span>
          )}
          {imgA && imgB && <img className="alt" src={imgB} alt="" loading="lazy" aria-hidden="true" />}
        </Link>
        {!product.available ? (
          <span className="badge soldout">{dict.product.soldout}</span>
        ) : isBundle ? (
          <span className="badge drop">{dict.product.dropBadge}</span>
        ) : isBest ? (
          <span className="badge">{dict.product.bestseller}</span>
        ) : null}
        <button
          className={`wish-btn ${saved ? 'on' : ''}`}
          onClick={() => wishlist?.toggle(product.handle)}
          aria-label={saved ? dict.product.wishlistRemove : dict.product.wishlistAdd}
          aria-pressed={!!saved}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21C7 16.5 3 13.2 3 9.3 3 6.9 4.9 5 7.3 5c1.7 0 3.3.9 4.7 2.8C13.4 5.9 15 5 16.7 5 19.1 5 21 6.9 21 9.3c0 3.9-4 7.2-9 11.7z" />
          </svg>
        </button>
      </div>
      <Link href={href} className="card-info">
        <div className="card-type">{product.productType}</div>
        <div className="card-title">{product.title}</div>
        <div className="card-price-row">
          <span className="card-price">{formatPrice(product.price, product.currency, locale)}</span>
          {product.color && COLOR_SWATCHES[product.color] && (
            <span className="card-swatch" style={{ background: COLOR_SWATCHES[product.color] }} aria-hidden="true" />
          )}
        </div>
        <div className={`card-stock ${product.available ? 'in' : 'out'}`}>
          <span className="stock-dot" aria-hidden="true" />
          {product.available ? dict.product.instock : dict.product.soldout}
        </div>
      </Link>
      {product.available && product.variantId ? (
        <button
          className="btn btn-ink btn-sm card-add"
          onClick={() => {
            cart.add(product, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1600);
          }}
        >
          {added ? dict.product.added : dict.product.add}
        </button>
      ) : (
        <button className="btn btn-ghost btn-sm card-add" disabled style={{ opacity: 0.5 }}>
          {dict.product.soldout}
        </button>
      )}
    </div>
  );
}
