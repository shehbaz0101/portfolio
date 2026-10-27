'use client';
import { useEffect, useRef, type CSSProperties } from 'react';

type Tone = 'canvas' | 'surface';
const A = 'M0 96V58C240 40 480 70 720 56C980 42 1210 40 1440 56V96Z';
const B = 'M0 96V46C250 64 480 42 720 54C970 66 1200 62 1440 44V96Z';
const C = 'M0 96V62C250 50 470 38 720 50C980 62 1210 70 1440 52V96Z';
const SETS: string[][] = [[A, B, C, A], [B, C, A, B], [C, A, B, C]];

export function Wave({ from, to, seed = 0 }: { from: Tone; to: Tone; seed?: number }) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const node = svg.current;
    if (!node || !('pauseAnimations' in node)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.pauseAnimations(); return; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) node.unpauseAnimations(); else node.pauseAnimations(); }, { rootMargin: '60px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  const values = SETS[seed % SETS.length];
  return <div className="wave" aria-hidden="true" style={{ '--from': `var(--${from})`, '--to': `var(--${to})` } as CSSProperties}>
    <svg ref={svg} viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
      <path fill="var(--to)" d={values[0]}>
        <animate attributeName="d" dur={`${30 + seed * 4}s`} begin={`-${seed * 5}s`} repeatCount="indefinite" calcMode="spline" values={values.join(';')} keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"/>
      </path>
    </svg>
  </div>;
}
