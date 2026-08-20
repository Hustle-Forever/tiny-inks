'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { COLOR_SWATCHES, COLOR_NAMES } from '@/lib/mock-data';

export default function ShopClient({ products, dict, locale }) {
  const t = dict.shop;
  // read ?type= on the client: the page is statically prerendered, so the
  // server never sees the query string in production
  const searchParams = useSearchParams();
  const [type, setType] = useState(() => searchParams.get('type') || 'all');
  const [color, setColor] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('featured');
  const [panelOpen, setPanelOpen] = useState(false);

  const typeOf = (p) => p.typeKey || p.productType;

  const types = useMemo(() => {
    const seen = new Map();
    products.forEach((p) => {
      const key = typeOf(p);
      if (key && !seen.has(key)) seen.set(key, p.productType || key);
    });
    return [...seen.entries()].map(([key, label]) => ({ key, label }));
  }, [products]);

  const colors = useMemo(
    () => [...new Set(products.map((p) => p.color).filter(Boolean))],
    [products]
  );
  const colorLabel = (c) => (COLOR_NAMES[locale] && COLOR_NAMES[locale][c]) || c;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (type !== 'all' && typeOf(p) !== type) return false;
      if (color !== 'all' && p.color !== color) return false;
      if (price === 'under50' && p.price >= 50) return false;
      if (price === 'to100' && (p.price < 50 || p.price > 100)) return false;
      if (price === 'over100' && p.price <= 100) return false;
      return true;
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'new') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'featured') {
      list = [...list].sort(
        (a, b) => (b.tags?.includes('bestseller') ? 1 : 0) - (a.tags?.includes('bestseller') ? 1 : 0)
      );
    }
    return list;
  }, [products, type, color, price, sort]);

  const activeCount = (type !== 'all' ? 1 : 0) + (color !== 'all' ? 1 : 0) + (price !== 'all' ? 1 : 0);
  const hasFilters = activeCount > 0;
  const clear = () => { setType('all'); setColor('all'); setPrice('all'); };

  /* mobile bottom sheet: lock body scroll + close on Escape while open */
  useEffect(() => {
    if (!panelOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setPanelOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [panelOpen]);

  return (
    <div className="shop-layout">
      <div
        className={`sheet-veil ${panelOpen ? 'open' : ''}`}
        onClick={() => setPanelOpen(false)}
      />
      <aside className={`filters ${panelOpen ? 'open' : ''}`} aria-label={t.filters}>
        <div className="filter-group">
          <h4>{t.type}</h4>
          <div className="chips">
            <button className={`chip ${type === 'all' ? 'on' : ''}`} onClick={() => setType('all')}>{t.all}</button>
            {types.map((x) => (
              <button key={x.key} className={`chip ${type === x.key ? 'on' : ''}`} onClick={() => setType(x.key)}>{x.label}</button>
            ))}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="filter-group">
            <h4>{t.color}</h4>
            <div className="chips">
              <button className={`chip ${color === 'all' ? 'on' : ''}`} onClick={() => setColor('all')}>{t.all}</button>
              {colors.map((c) => (
                <button key={c} className={`chip color ${color === c ? 'on' : ''}`} onClick={() => setColor(c)}>
                  <span className="swatch" style={{ background: COLOR_SWATCHES[c] || '#ccc' }} />
                  {colorLabel(c)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="filter-group">
          <h4>{t.price}</h4>
          <div className="chips">
            {[['all', t.all], ['under50', t.under50], ['to100', t.to100], ['over100', t.over100]].map(([k, label]) => (
              <button key={k} className={`chip ${price === k ? 'on' : ''}`} onClick={() => setPrice(k)}>{label}</button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clear}>{t.clear}</button>
        )}
        <button className="btn btn-primary sheet-apply" onClick={() => setPanelOpen(false)}>
          {t.show} {filtered.length} {t.results} ✦
        </button>
      </aside>

      <div>
        <div className="shop-toolbar">
          <span className="result-count" aria-live="polite">{filtered.length} {t.results}</span>
          <div className="toolbar-actions">
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={t.sort}>
              <option value="featured">{t.sortFeatured}</option>
              <option value="new">{t.sortNew}</option>
              <option value="low">{t.sortLow}</option>
              <option value="high">{t.sortHigh}</option>
            </select>
            <button
              className={`filters-toggle chip ${hasFilters ? 'on' : ''}`}
              onClick={() => setPanelOpen(true)}
              aria-expanded={panelOpen}
            >
              {t.filters}{hasFilters ? ` · ${activeCount}` : ''}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-glyph" aria-hidden="true">✦</div>
            <h3>{t.emptyTitle}</h3>
            <p className="lede" style={{ margin: '0 auto 20px' }}>{t.emptyLede}</p>
            <button className="btn" onClick={clear}>{t.clear}</button>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
