import { ArrowUpRight, ArrowDown } from '../Icon';
import { more, skills, education, contact, site, ui } from '@/content/site';
import { Section } from '../Section';
import { Reveal } from '../Reveal';
import { Button } from '../Button';
import { Chips } from './ProjectSection';
export function MoreOnGithub() {
  return <Section id="more" title={more.title}><div className="card-grid">{more.items.map(item => <Reveal key={item.name}><a className="repo-card" href={item.href} target="_blank" rel="noopener noreferrer"><h3>{item.name}<ArrowUpRight/></h3><p>{item.text}</p></a></Reveal>)}</div></Section>;
}
export function SkillsEducation() {
  return <><Section id="skills" title={ui.skills} className="band"><div className="card-grid">{skills.map(group => <Reveal key={group.group}><h3>{group.group}</h3><Chips items={group.items}/></Reveal>)}</div></Section><Section id="education" title={ui.education}><div className="card-grid">{education.map(item => <Reveal key={item.degree}><article className="education-card"><p className="eyebrow">{item.when}</p><h3>{item.degree}</h3><p>{item.school}</p><p className="muted">{item.note}</p></article></Reveal>)}</div></Section></>;
}
export function Contact() {
  return <Section id="contact" title={contact.title} className="contact-section"><div className="hero-mesh" aria-hidden="true"/><Reveal><p className="reading-lead">{contact.text}</p><div className="contact-actions"><Button href={`mailto:${site.email}`} variant="primary" className="mail-button">{site.email}<ArrowUpRight/></Button><Button href={site.linkedin} target="_blank" rel="noopener noreferrer">{ui.linkedin}</Button><Button href={site.github} target="_blank" rel="noopener noreferrer">{ui.github}</Button><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}<ArrowDown/></Button></div></Reveal></Section>;
}
