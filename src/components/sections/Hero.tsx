import { ArrowUpRight, ArrowDown, ArrowRight, Github, Linkedin, Mail } from '../Icon';
import { hero, site, ui } from '@/content/site';
import { Button } from '../Button';
import { Reveal } from '../Reveal';
import { LiquidBackground } from '../LiquidBackground';
import { CountUp } from '../CountUp';
import { Highlight } from '../Highlight';
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <LiquidBackground bg="canvas"/>
    <div className="container hero-content">
      <div className="hero-layout">
        <Reveal className="hero-copy">
          <p className="status-pill"><span className="status-dot" aria-hidden="true"/>{hero.status}</p>
          <h1 id="hero-title">{site.name}</h1>
          <p className="hero-role">{hero.role}</p>
          <p className="hero-sub"><Highlight text={hero.value} phrases={['get checked before they act', 'a simulator has verified']}/></p>
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
        <Reveal className="hero-side" delay={120}>
          <aside className="featured-card" aria-labelledby="featured-title">
            <p id="featured-title" className="eyebrow featured-title">{hero.featuredTitle}</p>
            <ol className="featured-list">
              {hero.featured.map((item, index) => <li key={item.id}><a href={`#${item.id}`} className="featured-item"><span className="featured-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="featured-text"><span className="featured-name">{item.name}</span><span className="featured-line">{item.line}</span></span><ArrowUpRight className="row-arrow"/></a></li>)}
            </ol>
          </aside>
        </Reveal>
      </div>
      <ul className="bento" aria-label="Highlights">
        {hero.stats.map((stat, index) => <li key={stat.value} className={`bento-tile bento-stat bento-s${index + 1}`}><span className="proof-value"><CountUp text={stat.value}/></span><span className="proof-label">{stat.label}</span></li>)}
        <li className="bento-tile bento-current"><span className="current-label"><span className="status-dot live" aria-hidden="true"/>{hero.current.label}</span><span className="current-text">{hero.current.text}</span><span className="current-when">{hero.current.when}</span></li>
        <li className="bento-tile bento-stack"><span className="current-label">{hero.stackLabel}</span><ul className="stack-chips" aria-label={hero.stackLabel}>{hero.stack.map(item => <li key={item}>{item}</li>)}</ul></li>
      </ul>
    </div>
  </section>;
}
