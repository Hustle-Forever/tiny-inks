'use client';
import { useEffect, useState } from 'react';
import TiltedCard from './reactbits/TiltedCard/TiltedCard';
import useReducedMotion from './reactbits/useReducedMotion';
import { IMAGES, imgAlt } from '@/lib/images';

/* Editorial photo in its cream mat, with a very gentle React Bits tilt
   on pointer — plain image on touch devices and under reduced motion. */
export default function EditorialPhoto({ locale }) {
  const reduced = useReducedMotion();
  // tilt only on wide pointer devices: never on touch, never on phones
  const [tiltOk, setTiltOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (min-width: 769px)');
    const update = () => setTiltOk(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const photo = IMAGES.editorial;
  const tilt = reduced === false && tiltOk;

  return (
    <figure className="pframe pframe-mat pframe-tape">
      <div className="pframe-media" style={{ aspectRatio: '4 / 3', overflow: tilt ? 'visible' : 'hidden' }}>
        {tilt ? (
          <TiltedCard
            imageSrc={photo.url}
            altText={imgAlt(photo, locale)}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={4}
            scaleOnHover={1.03}
            showMobileWarning={false}
            showTooltip={false}
          />
        ) : (
          <img
            src={photo.url}
            alt={imgAlt(photo, locale)}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
          />
        )}
      </div>
    </figure>
  );
}
