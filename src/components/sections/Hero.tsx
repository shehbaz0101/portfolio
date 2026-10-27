import { ArrowUpRight, ArrowDown } from '../Icon';
import { hero, site, ui } from '@/content/site';
import { Button, TextLink } from '../Button';
import { Reveal } from '../Reveal';
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="hero-mesh" aria-hidden="true"/><div className="container hero-content"><div className="hero-grid"><Reveal><p className="eyebrow hero-eyebrow"><span className="status-dot"/>{hero.eyebrow}</p><h1 id="hero-title">{hero.headline}</h1><p className="hero-sub">{hero.sub}</p><div className="hero-actions"><Button href="#work" variant="primary">{ui.work}<ArrowUpRight/></Button><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}<ArrowDown/></Button><div className="social-links"><TextLink href={site.github}>{ui.github}</TextLink><TextLink href={site.linkedin}>{ui.linkedin}</TextLink><TextLink href={`mailto:${site.email}`}>{ui.email}</TextLink></div></div></Reveal></div><div className="stats">{hero.stats.map((stat, index) => <Reveal key={stat.value} delay={index * 80}><div className="stat-card"><p className="stat-value">{stat.value}</p><p>{stat.label}</p></div></Reveal>)}</div></div></section>;
}
