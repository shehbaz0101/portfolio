'use client';
import { ArrowUpRight } from './Icon';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { site, ui } from '@/content/site';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const links = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useEffect(() => {
    const targets = ui.nav.map(link => document.querySelector(link.href)).filter((node): node is Element => node !== null);
    let ticking = false;
    const spy = () => {
      ticking = false;
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const target of targets) if (target.getBoundingClientRect().top <= line) current = `#${target.id}`;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atEnd && targets.length) current = `#${targets[targets.length - 1].id}`;
      setActive(prev => prev === current ? prev : current);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } };
    spy();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  const measure = useCallback(() => {
    const box = links.current;
    const el = box?.querySelector<HTMLElement>('a[aria-current]');
    setPill(el ? { x: el.offsetLeft - 10, w: el.offsetWidth + 20 } : null);
  }, [active]);
  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="nav-shell" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <svg className="goo-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id="goo" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"/></filter></defs></svg>
    <nav className="container nav" aria-label={site.name}>
      <a href="#main" className="brand"><span className="monogram" aria-hidden="true">{site.name.split(' ').map(word => word[0]).join('')}</span><span>{site.name}</span></a>
      <div className="desktop-links" ref={links} style={pill ? { '--pill-x': `${pill.x}px`, '--pill-w': `${pill.w}px` } as CSSProperties : undefined}>
        <span className="nav-pill" data-on={pill ? 'true' : 'false'} aria-hidden="true"><span className="goo"><i className="blob-lead"/><i className="blob-trail"/></span></span>
        {ui.nav.map(link => <a className="text-link" key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}
      </div>
      <div className="nav-actions"><ThemeToggle/><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf" className="nav-resume">{ui.resume}<ArrowUpRight/></Button><button ref={toggle} className="icon-button menu-toggle" aria-label={ui.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 8h16M4 16h16'}/></svg></button></div>
      <div id="mobile-nav" className="mobile-links" hidden={!open}>{ui.nav.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}</a>)}</div>
    </nav>
  </header>;
}
