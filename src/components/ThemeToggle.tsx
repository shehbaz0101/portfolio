'use client';
import { useEffect, useState } from 'react';
import { ui } from '@/content/site';
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains('dark'));
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const change = () => {
      let chosen = false;
      try { const value = localStorage.getItem('theme'); chosen = value === 'dark' || value === 'light'; } catch {}
      if (!chosen) { document.documentElement.classList.toggle('dark', media.matches); document.documentElement.style.colorScheme = media.matches ? 'dark' : 'light'; }
      sync();
    };
    sync(); media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return <button className="icon-button" aria-label={ui.theme} aria-pressed={dark} onClick={() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    setDark(next);
  }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{dark ? <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/> : <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>}</svg></button>;
}
