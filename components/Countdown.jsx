'use client';
import { useCallback, useEffect, useState } from 'react';
import CountUp from './reactbits/CountUp/CountUp';
import useReducedMotion from './reactbits/useReducedMotion';

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export default function Countdown({ target, labels, locale = 'en' }) {
  const [t, setT] = useState(null);
  const reduced = useReducedMotion();

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

  /* memoized: CountUp resets its display whenever the formatter's identity
     changes, and this component re-renders every second */
  const fmt = useCallback(
    (n) => {
      const s = String(Math.max(0, n)).padStart(2, '0');
      return locale === 'ar' ? s.replace(/\d/g, (d) => AR_DIGITS[d]) : s;
    },
    [locale]
  );

  const cells = [
    [t ? t.d : null, labels.days],
    [t ? t.h : null, labels.hours],
    [t ? t.m : null, labels.mins],
    [t ? t.s : null, labels.secs],
  ];

  return (
    <div className="countdown" role="timer">
      {cells.map(([num, label]) => (
        <div className="count-cell" key={label}>
          <div className="count-num">
            {num === null ? (
              '––'
            ) : reduced === false ? (
              /* React Bits CountUp — digits spring-roll into place (localized
                 via the custom format: zero-padded, Arabic-Indic on /ar) */
              <CountUp to={num} duration={1} format={fmt} />
            ) : (
              fmt(num)
            )}
          </div>
          <div className="count-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
