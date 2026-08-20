'use client';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function AddToCart({ product, dict }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product.available) {
    return <button className="btn" disabled style={{ opacity: 0.5 }}>{dict.product.soldout}</button>;
  }

  return (
    <div className="buy-row">
      <div className="qty" aria-label={dict.product.qty}>
        <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="-">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)} aria-label="+">+</button>
      </div>
      <button
        className="btn btn-primary"
        style={{ flex: 1, minWidth: 180 }}
        onClick={async () => {
          await cart.add(product, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1600);
        }}
      >
        {added ? dict.product.added : dict.product.add}
      </button>
    </div>
  );
}
