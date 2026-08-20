/*
 * Framed photo treatments — the site's photographic language.
 * variants: mat (cream mounted-print), arch (arched top), polaroid
 * (white frame + italic caption), plain (18px radius + hover zoom).
 */
export default function PhotoFrame({
  photo,
  locale = 'en',
  variant = 'plain',
  caption,
  tape = false,
  className = '',
  style,
  imgStyle,
}) {
  if (!photo?.url) return null;
  const alt = (photo.alt && (photo.alt[locale] || photo.alt.en)) || photo.alt || '';
  return (
    <figure className={`pframe pframe-${variant} ${tape ? 'pframe-tape' : ''} ${className}`} style={style}>
      <div className="pframe-media">
        <img src={photo.url} alt={typeof alt === 'string' ? alt : ''} loading="lazy" style={imgStyle} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
