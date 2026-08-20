'use client';
import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [idx, setIdx] = useState(0);
  const list = images && images.length ? images : [{ url: null, alt: title }];
  return (
    <div className="pdp-gallery">
      {/* desktop: main image + thumbnails */}
      <div className="pdp-main">
        {list[idx]?.url ? (
          <img src={list[idx].url} alt={list[idx].alt || title} loading="eager" fetchPriority="high" />
        ) : (
          <span className="card-noimg" aria-hidden="true">✦</span>
        )}
      </div>
      {list.length > 1 && (
        <div className="pdp-thumbs">
          {list.map((img, i) => (
            <button key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`}>
              <img src={img.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {/* phones: swipeable scroll-snap strip */}
      <div className="pdp-strip" aria-label={title}>
        {list.map((img, i) =>
          img.url ? (
            <img
              key={i}
              src={img.url}
              alt={img.alt || title}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
