'use client';
import { useEffect, useState } from 'react';

/* Shared gate for the React Bits components: JS-driven animation (gsap/motion)
   ignores the CSS reduced-motion kill switch, so every integration renders a
   static fallback when this returns true. Starts true so the first paint is
   static until the media query is known. */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}
