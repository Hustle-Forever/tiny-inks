export default function Marquee({ items }) {
  const row = (
    <span aria-hidden="true">
      {items.map((t, i) => (
        <span key={i}>{t} <span className="spark">✦</span></span>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <span className="sr-only">{items.join(' · ')}</span>
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}
