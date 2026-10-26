import { site, contact, ui } from '@/content/site';
import { TextLink } from './Button';
export function Footer() {
  return <footer id="contact" className="footer"><div className="container"><div className="footer-top"><div><p className="eyebrow">{site.name}</p><h2>{contact.title}</h2></div><a className="contact-email text-link" href={`mailto:${site.email}`}>{site.email}<span aria-hidden="true">↗</span></a></div><div className="footer-bottom"><p>{site.role}<span className="separator" aria-hidden="true">/</span>{site.location}</p><div className="footer-links"><TextLink href={site.linkedin}>{ui.linkedin}</TextLink><TextLink href={site.github}>{ui.github}</TextLink><TextLink href={`mailto:${site.email}`}>{ui.email}</TextLink><TextLink href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}</TextLink></div></div></div></footer>;
}
