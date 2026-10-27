import { ArrowUpRight, ArrowDown, ArrowRight, Github, Linkedin, Mail } from '../Icon';
import { hero, site, ui } from '@/content/site';
import { Button } from '../Button';
import { Reveal } from '../Reveal';
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-mesh" aria-hidden="true"/>
    <div className="container hero-content">
      <div className="hero-layout">
        <Reveal className="hero-copy">
          <p className="status-pill"><span className="status-dot" aria-hidden="true"/>{hero.status}</p>
          <h1 id="hero-title">{site.name}</h1>
          <p className="hero-role">{hero.role}</p>
          <p className="hero-sub">{hero.value}</p>
          <div className="hero-actions">
            <Button href="#work" variant="primary">{ui.work}<ArrowRight/></Button>
            <Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}<ArrowDown/></Button>
          </div>
          <ul className="hero-links" aria-label="Profiles">
            <li><a href={site.github} target="_blank" rel="noopener noreferrer"><Github/>{ui.github}</a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin/>{ui.linkedin}</a></li>
            <li><a href={`mailto:${site.email}`}><Mail/>{ui.email}</a></li>
          </ul>
        </Reveal>
        <Reveal className="hero-side" delay={80}>
          <aside className="featured-card" aria-labelledby="featured-title">
            <p id="featured-title" className="eyebrow featured-title">{hero.featuredTitle}</p>
            <ol className="featured-list">
              {hero.featured.map(item => <li key={item.id}><a href={`#${item.id}`} className="featured-item"><span className="featured-text"><span className="featured-name">{item.name}</span><span className="featured-line">{item.line}</span></span><ArrowUpRight className="row-arrow"/></a></li>)}
            </ol>
          </aside>
        </Reveal>
      </div>
    </div>
    <div className="proof">
      <div className="container">
        <ul className="proof-strip">
          {hero.stats.map(stat => <li key={stat.value} className="proof-item"><span className="proof-value">{stat.value}</span><span className="proof-label">{stat.label}</span></li>)}
        </ul>
        <div className="trust-row">
          <p className="current-line"><span className="current-label">{hero.current.label}</span><span>{hero.current.text}</span><span className="current-when">{hero.current.when}</span></p>
          <ul className="stack-chips" aria-label={hero.stackLabel}>
            {hero.stack.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
