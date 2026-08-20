const ICONS = [
  /* truck */
  <svg key="t" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h13v11H1z" /><path d="M14 9h4l4 4v3h-8" /><circle cx="6" cy="18.5" r="1.8" /><circle cx="18" cy="18.5" r="1.8" />
  </svg>,
  /* gift */
  <svg key="g" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="9" width="18" height="12" rx="1.5" /><path d="M12 9v12M3 13h18" /><path d="M12 9c-2 0-5-.8-5-3a2.4 2.4 0 0 1 5-.8A2.4 2.4 0 0 1 17 6c0 2.2-3 3-5 3z" />
  </svg>,
  /* calendar-sparkle */
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M12 13.6l.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8z" fill="currentColor" stroke="none" />
  </svg>,
];

const BGS = ['var(--blue)', 'var(--blush)', 'var(--mustard)'];

export default function UspBar({ dict }) {
  return (
    <div className="usp-bar">
      <div className="wrap usp-inner">
        {dict.usp.map((item, i) => (
          <div className="usp-item" key={i}>
            <span className="usp-icon" style={{ background: BGS[i] }}>{ICONS[i]}</span>
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
