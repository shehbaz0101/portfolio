'use client';
import { useEffect, useRef } from 'react';

const esc = (s: string) => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string));
// Numbers count up; the word "versus" is set small. Pure function of the final text, so the server render is the final value.
const NUM = /\d+(?:\.\d+)?/g;
function build(text: string, k: number) {
  return text.split(/(\s+versus\s+)/).map(part => /^\s+versus\s+$/.test(part)
    ? '<span class="vs"> versus </span>'
    : esc(part).replace(NUM, m => { const dec = (m.split('.')[1] ?? '').length; return (Number(m) * k).toFixed(dec); })).join('');
}
export function CountUp({ text }: { text: string }) {
  const live = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = live.current, host = root.current;
    if (!el || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    el.innerHTML = build(text, 0); host.dataset.run = 'true';
    let raf = 0, timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      timer = window.setTimeout(() => {
        const start = performance.now(), dur = 1500;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur), k = 1 - Math.pow(1 - t, 4);
          el.innerHTML = build(text, t === 1 ? 1 : k);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, 350);
    }, { threshold: 0.4 });
    io.observe(host);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [text]);
  const parts = text.split(/(\s+versus\s+)/);
  return <span ref={root} className="count"><span className="count-ghost">{parts.map((p, i) => /^\s+versus\s+$/.test(p) ? <span className="vs" key={i}> versus </span> : p)}</span><span ref={live} className="count-live" aria-hidden="true"/></span>;
}
