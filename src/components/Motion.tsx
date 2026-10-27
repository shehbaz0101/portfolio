'use client';
import { useEffect, useRef } from 'react';

const TILT = '.stat-card,.repo-card,.education-card,.featured-card,.bento-tile,.skill-tile';
const MAGNET = '.button-primary';

export function Motion() {
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let ticking = false;
    const paint = () => {
      ticking = false;
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (!reduce) for (const el of parallax) {
        const r = el.parentElement?.getBoundingClientRect();
        if (r && (r.bottom < -200 || r.top > window.innerHeight + 200)) continue;
        el.style.transform = `translate3d(0,${(y * Number(el.dataset.parallax)).toFixed(1)}px,0)`;
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let cleanupPointer = () => {};
    if (fine && !reduce) {
      let tilted: HTMLElement | null = null;
      const magnets = Array.from(document.querySelectorAll<HTMLElement>(MAGNET));
      const magnetOn = new Set<HTMLElement>();
      let pending: PointerEvent | null = null, queued = false;
      const reset = (el: HTMLElement) => { el.style.transform = ''; el.style.removeProperty('--mx'); el.style.removeProperty('--my'); el.removeAttribute('data-hot'); };
      const apply = () => {
        queued = false;
        const e = pending; if (!e) return;
        const card = (e.target as Element | null)?.closest?.(TILT) as HTMLElement | null;
        if (tilted && tilted !== card) { reset(tilted); tilted = null; }
        if (card) {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          const big = r.width > 700 ? 0.35 : 1;
          card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`); card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
          card.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * 2.2 * big).toFixed(2)}deg) rotateY(${((px - 0.5) * 2.8 * big).toFixed(2)}deg) translateY(-2px)`;
          card.dataset.hot = 'true'; tilted = card;
        }
        for (const el of magnets) {
          const r = el.getBoundingClientRect(), pad = 56;
          const inside = e.clientX > r.left - pad && e.clientX < r.right + pad && e.clientY > r.top - pad && e.clientY < r.bottom + pad;
          if (inside) {
            const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
            el.style.setProperty('--tx', `${(dx * 0.22).toFixed(1)}px`); el.style.setProperty('--ty', `${(dy * 0.32).toFixed(1)}px`);
            el.dataset.magnet = 'true'; magnetOn.add(el);
          } else if (magnetOn.has(el)) { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); el.removeAttribute('data-magnet'); magnetOn.delete(el); }
        }
      };
      const onMove = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; pending = e; if (!queued) { queued = true; requestAnimationFrame(apply); } };
      const onLeave = () => { if (tilted) { reset(tilted); tilted = null; } magnetOn.forEach(el => { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); el.removeAttribute('data-magnet'); }); magnetOn.clear(); };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      cleanupPointer = () => { document.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('pointerleave', onLeave); };
    }
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cleanupPointer(); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span ref={bar}/></div>;
}
