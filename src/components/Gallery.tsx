'use client';
import { ArrowLeft, ArrowRight } from './Icon';
import { useState } from 'react';
import { type Project, ui } from '@/content/site';
export function Gallery({ shots, note }: { shots: NonNullable<Project['shots']>; note?: string }) {
  const [active, setActive] = useState(0);
  const shot = shots[active];
  const move = (delta: number) => setActive(index => (index + delta + shots.length) % shots.length);
  return <div className="gallery" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}><figure><div className="media-frame"><img src={shot.src} alt={shot.alt} width={1440} height={900} loading="lazy" decoding="async"/></div><figcaption aria-live="polite">{shot.caption}</figcaption></figure><div className="gallery-controls"><button className="icon-button" aria-label={ui.previousScreenshot} onClick={() => move(-1)}><ArrowLeft/></button><div className="thumbnails">{shots.map((item, index) => <button key={item.src} aria-label={item.caption} aria-pressed={index === active} onClick={() => setActive(index)}><img src={item.src} alt={item.alt} width={1440} height={900} loading="lazy" decoding="async"/></button>)}</div><button className="icon-button" aria-label={ui.nextScreenshot} onClick={() => move(1)}><ArrowRight/></button></div><p className="muted small">{note}</p></div>;
}
