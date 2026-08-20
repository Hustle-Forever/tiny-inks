'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SplitText from './reactbits/SplitText/SplitText';
import EditorialPhoto from './EditorialPhoto';
import PhotoFrame from './PhotoFrame';
import useReducedMotion from './reactbits/useReducedMotion';
import { IMAGES } from '@/lib/images';

/* Product-led hero: headline + CTAs + one strong flat-lay photo.
   Only 3 small brand shapes remain as light accents (m: mobile position). */
const SHAPES = [
  { cls: 'q br', color: 'var(--mustard)', size: 110, top: '6%', left: '-3%', depth: 0.5, delay: 0.05, fx: '-60px', fy: '40px', fr: '-20deg', m: { top: '2%', left: '-7%' } },
  { cls: 'tri', color: 'var(--sand)', size: 84, top: '8%', left: '88%', depth: 0.6, delay: 0.15, fx: '50px', fy: '-40px', fr: '30deg', m: { top: '3%', left: '84%' } },
  { cls: 'round', color: 'var(--blush)', size: 64, top: '78%', left: '4%', depth: 0.9, delay: 0.25, fx: '-30px', fy: '50px', fr: '0deg', m: { top: '88%', left: '-5%' } },
];

export default function HeroAssembly({ dict, locale }) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
          className="shape"
          data-depth={s.depth}
          style={{
            '--top': s.top,
            '--left': s.left,
            '--m-top': s.m.top,
            '--m-left': s.m.left,
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

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">{dict.hero.eyebrow}</div>
          {reduced === false ? (
            <SplitText
              tag="h1"
              className="hero-title"
              text={`${dict.hero.titleA} ${dict.hero.titleB} ${dict.hero.titleC}`}
              splitType="words"
              delay={70}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="0px"
              textAlign="start"
            />
          ) : (
            <h1 className="hero-title">
              {dict.hero.titleA} {dict.hero.titleB} <em>{dict.hero.titleC}</em>
            </h1>
          )}
          <p className="hero-sub">{dict.hero.lede}</p>
          <div className="hero-ctas">
            <Link href={`/${locale}/shop`} className="btn btn-primary">{dict.hero.ctaShop}</Link>
            <a href="#best-sellers" className="btn">{dict.hero.ctaDrop}</a>
          </div>
        </div>
        <div className="hero-photo">
          <EditorialPhoto locale={locale} photo={IMAGES.heroMain} />
          <div className="hero-photo-small">
            <PhotoFrame photo={IMAGES.heroSmall} locale={locale} variant="polaroid" />
          </div>
        </div>
      </div>
    </section>
  );
}
