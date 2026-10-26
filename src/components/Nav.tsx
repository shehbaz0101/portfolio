'use client';
import { useRef, useState } from 'react';
import { site, ui } from '@/content/site';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
export function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="nav-shell" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <nav className="container nav" aria-label={site.name}>
      <a href="#main" className="brand"><span className="monogram" aria-hidden="true">{site.name.split(' ').map(word => word[0]).join('')}</span><span>{site.name}</span></a>
      <div className="desktop-links">{ui.nav.map(link => <a className="text-link" key={link.href} href={link.href}>{link.label}</a>)}</div>
      <div className="nav-actions"><ThemeToggle/><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf" className="nav-resume">{ui.resume}<span aria-hidden="true">↗</span></Button><button ref={toggle} className="icon-button menu-toggle" aria-label={ui.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 8h16M4 16h16'}/></svg></button></div>
      <div id="mobile-nav" className="mobile-links" hidden={!open}>{ui.nav.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</div>
    </nav>
  </header>;
}
