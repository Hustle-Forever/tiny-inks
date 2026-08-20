'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SplitText from './reactbits/SplitText/SplitText';
import useReducedMotion from './reactbits/useReducedMotion';
import { IMAGES } from '@/lib/images';

/* small framed photos drifting among the shapes — brand mark meets real paper */
const FLOATS = [
  { photo: IMAGES.heroFloats[0], top: '15%', left: '15%', w: 120, depth: 0.7, delay: 0.55, rot: -6 },
  { photo: IMAGES.heroFloats[1], top: '60%', left: '81%', w: 130, depth: 0.9, delay: 0.68, rot: 5 },
  { photo: IMAGES.heroFloats[2], top: '73%', left: '7%', w: 112, depth: 0.5, delay: 0.8, rot: 4, hideMobile: true },
];

/* m: mobile corner position (≤768px) — shapes without one are hidden on
   phones so nothing crowds or sits behind the headline */
const SHAPES = [
  { cls: 'q br', color: 'var(--mustard)', size: 150, top: '14%', left: '7%', depth: 0.5, delay: 0.05, fx: '-80px', fy: '60px', fr: '-30deg', m: { top: '2%', left: '-7%' } },
  { cls: 'q tl', color: 'var(--blue)', size: 120, top: '58%', left: '12%', depth: 0.9, delay: 0.18, fx: '-60px', fy: '90px', fr: '25deg' },
  { cls: 'round', color: 'var(--blush)', size: 90, top: '30%', left: '20%', depth: 0.7, delay: 0.3, fx: '-40px', fy: '-70px', fr: '0deg' },
  { cls: 'tri', color: 'var(--sand)', size: 100, top: '10%', left: '78%', depth: 0.6, delay: 0.12, fx: '70px', fy: '-60px', fr: '35deg', m: { top: '3%', left: '82%' } },
  { cls: 'q bl', color: 'var(--terracotta)', size: 140, top: '52%', left: '84%', depth: 1, delay: 0.24, fx: '90px', fy: '70px', fr: '-20deg', m: { top: '88%', left: '84%' } },
  { cls: 'half-top', color: 'var(--sage)', size: 110, top: '76%', left: '74%', depth: 0.45, delay: 0.36, fx: '50px', fy: '90px', fr: '15deg' },
  { cls: 'round', color: 'var(--slate)', size: 46, top: '80%', left: '26%', depth: 1.1, delay: 0.4, fx: '-30px', fy: '60px', fr: '0deg' },
  { cls: 'q tr', color: 'var(--cream)', size: 95, top: '68%', left: '90%', depth: 0.8, delay: 0.44, fx: '60px', fy: '40px', fr: '40deg' },
];

export default function HeroAssembly({ dict, locale }) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // phones: no scroll-parallax loop — static corners, save the main thread
    if (window.matchMedia('(max-width: 768px)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.querySelectorAll('.shape').forEach((s) => {
          const depth = Number(s.dataset.depth || 0.5);
          s.style.transform = `translateY(${y * depth * -0.22}px)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={wrapRef}>
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className={`shape ${s.m ? '' : 'shape-m-hide'}`}
          data-depth={s.depth}
          style={{
            '--top': s.top,
            '--left': s.left,
            ...(s.m ? { '--m-top': s.m.top, '--m-left': s.m.left } : {}),
            width: `calc(${s.size}px * var(--shape-scale))`,
            height: `calc(${s.size}px * var(--shape-scale))`,
          }}
        >
          <div
            className={`shape-inner ${s.cls}`}
            style={{ background: s.color, animationDelay: `${s.delay}s`, '--fx': s.fx, '--fy': s.fy, '--fr': s.fr }}
          />
        </div>
      ))}
      {FLOATS.map((f, i) => (
        <div
          key={`f${i}`}
          className="shape hero-float shape-m-hide"
          data-depth={f.depth}
          style={{ '--top': f.top, '--left': f.left, width: `calc(${f.w}px * var(--shape-scale))` }}
        >
          <div
            className="hero-float-inner"
            style={{ animationDelay: `${f.delay}s`, '--rot': `${f.rot}deg` }}
          >
            <img src={f.photo.sm || f.photo.url} alt="" loading="eager" />
          </div>
        </div>
      ))}
      <div className="shape sparkle shape-m-hide" style={{ '--top': '22%', '--left': '32%' }} aria-hidden="true">✦</div>
      <div className="shape sparkle shape-m-hide" style={{ '--top': '30%', '--left': '74%', animationDelay: '1.2s' }} aria-hidden="true">✦</div>

      <div className="wrap hero-inner">
        <img src="/logo-icon.png" alt="Tiny Inks" className="hero-icon" />
        <div className="eyebrow">{dict.hero.eyebrow}</div>
        {reduced === false ? (
          /* React Bits SplitText — per-letter in English; whole WORDS in Arabic
             (connected script must never be split into letters) */
          <SplitText
            tag="h1"
            className="hero-title"
            text={`${dict.hero.titleA} ${dict.hero.titleB} ${dict.hero.titleC}`}
            splitType={locale === 'ar' ? 'words' : 'words,chars'}
            delay={locale === 'ar' ? 90 : 26}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 36 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="0px"
            textAlign="center"
          />
        ) : (
          <h1 className="hero-title">
            {dict.hero.titleA} {dict.hero.titleB} <em>{dict.hero.titleC}</em>
          </h1>
        )}
        <p className="lede">{dict.hero.lede}</p>
        <div className="hero-ctas">
          <Link href={`/${locale}/shop`} className="btn btn-primary">{dict.hero.ctaShop}</Link>
          <Link href={`/${locale}/drops`} className="btn">{dict.hero.ctaDrop}</Link>
        </div>
      </div>
    </section>
  );
}
