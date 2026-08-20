const ICONS = [
  /* truck */
  <svg key="t" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h13v11H1z" /><path d="M14 9h4l4 4v3h-8" /><circle cx="6" cy="18.5" r="1.8" /><circle cx="18" cy="18.5" r="1.8" />
  </svg>,
  /* chat */
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-8 8H4l2.5-3A8 8 0 1 1 21 12z" /><path d="M8.5 11.5h7M8.5 14.5h4" />
  </svg>,
  /* returns */
  <svg key="r" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l4-4M3 9l4 4M3 9h13a5 5 0 0 1 0 10h-6" />
  </svg>,
  /* gift */
  <svg key="g" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="9" width="18" height="12" rx="1.5" /><path d="M12 9v12M3 13h18" /><path d="M12 9c-2 0-5-.8-5-3a2.4 2.4 0 0 1 5-.8A2.4 2.4 0 0 1 17 6c0 2.2-3 3-5 3z" />
  </svg>,
];

const BGS = ['var(--blue)', 'var(--sage)', 'var(--mustard)', 'var(--blush)'];

export default function UspBar({ dict }) {
  return (
    <div className="usp-bar">
      <div className="wrap usp-inner">
        {dict.usp.map((item, i) => (
          <div className="usp-item" key={i}>
            <span className="usp-icon" style={{ background: BGS[i % BGS.length] }}>{ICONS[i % ICONS.length]}</span>
            <span>
              <strong>{item.t}</strong>
              <small>{item.d}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
