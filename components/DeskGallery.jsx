'use client';
import Masonry from './reactbits/Masonry/Masonry';
import PhotoFrame from './PhotoFrame';
import useReducedMotion from './reactbits/useReducedMotion';
import { IMAGES, imgAlt } from '@/lib/images';

/* "From the desk" — React Bits Masonry over the manifest photos.
   Static CSS-columns masonry under prefers-reduced-motion. */
const HEIGHTS = [560, 440, 660, 520, 460, 620, 480, 540];
const STATIC_RATIOS = ['4/5', '1/1', '3/4'];

export default function DeskGallery({ locale }) {
  const reduced = useReducedMotion();

  if (reduced !== false) {
    return (
      <div className="masonry" style={{ marginTop: 26 }}>
        {IMAGES.gallery.map((photo, i) => (
          <PhotoFrame
            key={i}
            photo={photo}
            locale={locale}
            variant="plain"
            imgStyle={{ aspectRatio: STATIC_RATIOS[i % STATIC_RATIOS.length] }}
          />
        ))}
      </div>
    );
  }

  const items = IMAGES.gallery.map((photo, i) => ({
    id: `desk-${i}`,
    img: photo.url,
    height: HEIGHTS[i % HEIGHTS.length],
    alt: imgAlt(photo, locale),
  }));

  return (
    <div style={{ marginTop: 26 }}>
      <Masonry
        items={items}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.97}
        blurToFocus
        duration={0.7}
        stagger={0.06}
        ease="power3.out"
      />
    </div>
  );
}
