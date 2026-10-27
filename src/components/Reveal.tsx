'use client';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only hide elements below the viewport, keeping initial content and no JS visible.
    if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.reveal = 'waiting';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.reveal = 'visible'; observer.disconnect(); }
    }, { threshold: 0, rootMargin: '0px 0px 14% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}
