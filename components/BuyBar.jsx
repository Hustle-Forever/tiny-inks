'use client';
import { useState } from 'react';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/products';

/* Mobile-only sticky bottom bar on product pages: price + add to cart.
   Hidden ≥768px (the sticky buy box handles desktop). */
export default function BuyBar({ product, dict, locale }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="buy-bar">
      <div className="buy-bar-price">
        <span>{formatPrice(product.price, product.currency, locale)}</span>
        <small>{product.productType}</small>
      </div>
      {product.available && product.variantId ? (
        <button
          className="btn btn-primary"
          onClick={async () => {
            await cart.add(product, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1600);
          }}
        >
          {added ? dict.product.added : dict.product.add}
        </button>
      ) : (
        <button className="btn" disabled style={{ opacity: 0.5 }}>{dict.product.soldout}</button>
      )}
    </div>
  );
}
