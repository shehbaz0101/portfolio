'use client';
import { useState } from 'react';
import { pera } from '@/content/site';
export function Gallery() {
  const [active, setActive] = useState(0);
  const shot = pera.shots[active];
  const move = (delta: number) => setActive(index => (index + delta + pera.shots.length) % pera.shots.length);
  return <div className="gallery" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}><figure><div className="media-frame"><img src={shot.src} alt={shot.alt} width={1440} height={900} loading="lazy" decoding="async"/></div><figcaption aria-live="polite">{shot.caption}</figcaption></figure><div className="gallery-controls"><button className="icon-button" aria-label="Previous screenshot" onClick={() => move(-1)}>←</button><div className="thumbnails">{pera.shots.map((item, index) => <button key={item.src} aria-label={item.caption} aria-pressed={index === active} onClick={() => setActive(index)}><img src={item.src} alt={item.alt} width={1440} height={900} loading="lazy" decoding="async"/></button>)}</div><button className="icon-button" aria-label="Next screenshot" onClick={() => move(1)}>→</button></div><p className="muted small">{pera.shotNote}</p></div>;
}
