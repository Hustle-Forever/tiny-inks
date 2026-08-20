'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const SHAPES = [
  { cls: 'q br', color: 'var(--mustard)', size: 150, top: '14%', left: '7%', depth: 0.5, delay: 0.05, fx: '-80px', fy: '60px', fr: '-30deg' },
  { cls: 'q tl', color: 'var(--blue)', size: 120, top: '58%', left: '12%', depth: 0.9, delay: 0.18, fx: '-60px', fy: '90px', fr: '25deg' },
  { cls: 'round', color: 'var(--blush)', size: 90, top: '30%', left: '20%', depth: 0.7, delay: 0.3, fx: '-40px', fy: '-70px', fr: '0deg' },
  { cls: 'tri', color: 'var(--sand)', size: 100, top: '10%', left: '78%', depth: 0.6, delay: 0.12, fx: '70px', fy: '-60px', fr: '35deg' },
  { cls: 'q bl', color: 'var(--terracotta)', size: 140, top: '52%', left: '84%', depth: 1, delay: 0.24, fx: '90px', fy: '70px', fr: '-20deg' },
  { cls: 'half-top', color: 'var(--sage)', size: 110, top: '76%', left: '74%', depth: 0.45, delay: 0.36, fx: '50px', fy: '90px', fr: '15deg' },
  { cls: 'round', color: 'var(--slate)', size: 46, top: '80%', left: '26%', depth: 1.1, delay: 0.4, fx: '-30px', fy: '60px', fr: '0deg' },
  { cls: 'q tr', color: 'var(--cream)', size: 95, top: '68%', left: '90%', depth: 0.8, delay: 0.44, fx: '60px', fy: '40px', fr: '40deg' },
];

export default function HeroAssembly({ dict, locale }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
            top: s.top,
            left: s.left,
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
      <div className="shape sparkle" style={{ top: '22%', left: '32%' }} aria-hidden="true">✦</div>
      <div className="shape sparkle" style={{ top: '30%', left: '74%', animationDelay: '1.2s' }} aria-hidden="true">✦</div>

      <div className="wrap hero-inner">
        <img src="/logo-icon.png" alt="Tiny Inks" className="hero-icon" />
        <div className="eyebrow">{dict.hero.eyebrow}</div>
        <h1>
          {dict.hero.titleA} {dict.hero.titleB} <em>{dict.hero.titleC}</em>
        </h1>
        <p className="lede">{dict.hero.lede}</p>
        <div className="hero-ctas">
          <Link href={`/${locale}/shop`} className="btn btn-primary">{dict.hero.ctaShop}</Link>
          <Link href={`/${locale}/drops`} className="btn">{dict.hero.ctaDrop}</Link>
        </div>
      </div>
    </section>
  );
}
