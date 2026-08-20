'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/products';

export default function ProductCard({ product, locale, dict }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const imgA = product.images?.[0]?.url;
  const imgB = product.images?.[1]?.url || imgA;
  const isDrop = product.tags?.includes('drop-01');
  const isBest = product.tags?.includes('bestseller');
  const href = `/${locale}/product/${product.handle}`;

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
        ) : isDrop ? (
          <span className="badge drop">{dict.product.dropBadge}</span>
        ) : isBest ? (
          <span className="badge">{dict.product.bestseller}</span>
        ) : null}
        {product.available && product.variantId && (
          <div className="quick-add">
            <button
              className="btn btn-ink btn-sm"
              onClick={() => {
                cart.add(product, 1);
                setAdded(true);
                setTimeout(() => setAdded(false), 1600);
              }}
            >
              {added ? dict.product.added : dict.product.add}
            </button>
          </div>
        )}
      </div>
      <Link href={href} className="card-info">
        <div className="card-type">{product.productType}</div>
        <div className="card-title">{product.title}</div>
        <div className="card-price">{formatPrice(product.price, product.currency, locale)}</div>
      </Link>
    </div>
  );
}
