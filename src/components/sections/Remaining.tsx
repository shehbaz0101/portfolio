import { paper, pera, smartbite, more, skills, education, contact, site, ui } from '@/content/site';
import { Section } from '../Section';
import { Reveal } from '../Reveal';
import { Button } from '../Button';
import { Flow } from '../Flow';
import { BarChart } from '../BarChart';
import { Gallery } from '../Gallery';
import { Chips, Steps, Metrics } from './ProjectSection';
export function PaperSection() {
  return <Section id="paper" eyebrow={paper.index} title={paper.title} className="band"><Reveal><p className="project-lead">{paper.subtitle}</p><div className="paper-meta"><p>{paper.author}</p><span className="chip">{paper.status}</span></div><p className="reading-lead">{paper.plain}</p></Reveal><Metrics items={paper.findings}/><div className="chart-pair"><BarChart chart={paper.chart}/><BarChart chart={paper.chart2}/></div><Reveal><details className="technical"><summary>{ui.abstract}<span className="chevron" aria-hidden="true">⌄</span></summary><div className="details-body abstract"><p>{paper.abstract}</p></div></details><p className="callout">{paper.caveat}</p><Button href={paper.pdf} target="_blank" rel="noopener noreferrer" variant="primary">{ui.pdf}<span aria-hidden="true">↓</span></Button><p className="small muted also">{paper.also}</p></Reveal></Section>;
}
export function PeraSection() {
  return <Section id={pera.id} eyebrow={pera.index} title={pera.name}><Reveal><span className="chip">{pera.period}</span><p className="reading-lead">{pera.whatItIs}</p><h3 className="label">{ui.flow}</h3><Steps items={pera.how}/></Reveal><Flow spec={pera.flow}/><Chips items={pera.stack}/><Metrics items={pera.metrics}/><Reveal><p className="callout">{pera.honest}</p><Gallery/></Reveal></Section>;
}
export function SmartBiteSection() {
  return <Section id={smartbite.id} eyebrow={smartbite.index} title={smartbite.name} className="band compact-section"><Reveal><div className="compact-card"><div><p className="project-lead">{smartbite.whatItIs}</p><Chips items={smartbite.stack}/></div><p className="compact-result">{smartbite.result}</p></div></Reveal></Section>;
}
export function MoreOnGithub() {
  return <Section id="more" title={more.title}><div className="card-grid">{more.items.map(item => <Reveal key={item.name}><a className="repo-card" href={item.href} target="_blank" rel="noopener noreferrer"><h3>{item.name}<span aria-hidden="true">↗</span></h3><p>{item.text}</p></a></Reveal>)}</div></Section>;
}
export function SkillsEducation() {
  return <><Section id="skills" title={ui.skills} className="band"><div className="card-grid">{skills.map(group => <Reveal key={group.group}><h3>{group.group}</h3><Chips items={group.items}/></Reveal>)}</div></Section><Section id="education" title={ui.education}><div className="card-grid">{education.map(item => <Reveal key={item.degree}><article className="education-card"><p className="eyebrow">{item.when}</p><h3>{item.degree}</h3><p>{item.school}</p><p className="muted">{item.note}</p></article></Reveal>)}</div></Section></>;
}
export function Contact() {
  return <Section id="contact" title={contact.title} className="contact-section"><div className="hero-mesh" aria-hidden="true"/><Reveal><p className="reading-lead">{contact.text}</p><div className="contact-actions"><Button href={`mailto:${site.email}`} variant="primary" className="mail-button">{site.email}<span aria-hidden="true">↗</span></Button><Button href={site.linkedin} target="_blank" rel="noopener noreferrer">{ui.linkedin}</Button><Button href={site.github} target="_blank" rel="noopener noreferrer">{ui.github}</Button><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}<span aria-hidden="true">↓</span></Button></div></Reveal></Section>;
}
