/* Full-width torn-paper divider. `color` is the paper side tearing into
   the `bg` surface below it. Used sparingly — once or twice on the site. */
export default function TornEdge({ color = 'var(--paper)', bg = 'var(--ink)' }) {
  return (
    <div className="torn" style={{ color, background: bg }} aria-hidden="true">
      <svg viewBox="0 0 1200 26" preserveAspectRatio="none">
        <path
          d="M0 0 L1200 0 L1200 10 L1154 16 L1108 7 L1060 18 L1012 9 L964 20 L916 8 L868 17 L820 6 L772 19 L724 10 L676 21 L628 8 L580 16 L532 6 L484 18 L436 9 L388 20 L340 7 L292 17 L244 9 L196 19 L148 6 L100 16 L52 8 L0 14 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
