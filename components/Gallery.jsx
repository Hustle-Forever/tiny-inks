'use client';
import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [idx, setIdx] = useState(0);
  const list = images && images.length ? images : [{ url: null, alt: title }];
  return (
    <div className="pdp-gallery">
      <div className="pdp-main">
        {list[idx]?.url ? <img src={list[idx].url} alt={list[idx].alt || title} /> : null}
      </div>
      {list.length > 1 && (
        <div className="pdp-thumbs">
          {list.map((img, i) => (
            <button key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`}>
              <img src={img.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
