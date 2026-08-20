import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 640 }}>
        <div className="empty-glyph" aria-hidden="true">✦</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          This page stayed <em>tiny.</em>
        </h1>
        <p className="lede" style={{ margin: '0 auto 12px' }}>
          We couldn&rsquo;t find what you were looking for — but the shelves are full.
        </p>
        <p className="lede" style={{ margin: '0 auto 28px', direction: 'rtl' }}>
          لم نعثر على هذه الصفحة — لكن الرفوف مليئة بالأشياء الجميلة.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/en/shop" className="btn btn-primary">Shop the collection</Link>
          <Link href="/ar/shop" className="btn">تسوّق المجموعة</Link>
        </div>
      </div>
    </section>
  );
}
