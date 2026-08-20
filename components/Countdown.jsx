'use client';
import { useEffect, useState } from 'react';

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export default function Countdown({ target, labels, locale = 'en' }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const fmt = (n) => {
    const s = String(n).padStart(2, '0');
    return locale === 'ar' ? s.replace(/\d/g, (d) => AR_DIGITS[d]) : s;
  };

  const cells = [
    [t ? fmt(t.d) : '––', labels.days],
    [t ? fmt(t.h) : '––', labels.hours],
    [t ? fmt(t.m) : '––', labels.mins],
    [t ? fmt(t.s) : '––', labels.secs],
  ];
  return (
    <div className="countdown" role="timer">
      {cells.map(([num, label]) => (
        <div className="count-cell" key={label}>
          <div className="count-num">{num}</div>
          <div className="count-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
