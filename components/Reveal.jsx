'use client';
import FadeContent from './reactbits/FadeContent/FadeContent';
import useReducedMotion from './reactbits/useReducedMotion';

/* Scroll entrance for sections — now driven by React Bits FadeContent
   (gsap ScrollTrigger) with the site's paper-soft timing. Renders plain
   content under prefers-reduced-motion. Same API as the old Reveal. */
export default function Reveal({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced !== false) {
    return <div className={className}>{children}</div>;
  }
  return (
    <FadeContent
      className={className}
      slide={30}
      duration={0.85}
      ease="power3.out"
      delay={delay}
      threshold={0.12}
    >
      {children}
    </FadeContent>
  );
}
