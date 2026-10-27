import { ArrowUp } from './Icon';
import { site, ui } from '@/content/site';
export function Footer() {
  return <footer className="footer minimal-footer"><div className="container footer-bottom"><p>{site.name}</p><p>{site.role}<span className="separator" aria-hidden="true">/</span>{site.location}</p><a className="text-link" href="#main">{ui.backToTop}<ArrowUp/></a></div></footer>;
}
