import { ArrowUpRight, ArrowDown } from '../Icon';
import { more, skills, education, contact, site, ui } from '@/content/site';
import { Section } from '../Section';
import { Reveal } from '../Reveal';
import { Button } from '../Button';
import { Chips } from './ProjectSection';
import { LiquidBackground } from '../LiquidBackground';
export function MoreOnGithub() {
  return <Section id="more" title={more.title}><div className="card-grid">{more.items.map((item, index) => <Reveal key={item.name} delay={index * 90}><a className="repo-card" href={item.href} target="_blank" rel="noopener noreferrer"><h3>{item.name}<ArrowUpRight/></h3><p>{item.text}</p></a></Reveal>)}</div></Section>;
}
export function Skills() {
  return <Section id="skills" title={ui.skills} className="band"><div className="skills-bento">{skills.map((group, index) => <Reveal key={group.group} delay={index * 90}><div className={`skill-tile skill-t${index + 1}`}><h3>{group.group}</h3><Chips items={group.items}/></div></Reveal>)}</div></Section>;
}
export function Education() {
  return <Section id="education" title={ui.education}><div className="card-grid">{education.map((item, index) => <Reveal key={item.degree} delay={index * 90}><article className="education-card"><p className="eyebrow">{item.when}</p><h3>{item.degree}</h3><p>{item.school}</p><p className="muted">{item.note}</p></article></Reveal>)}</div></Section>;
}
export function Contact() {
  return <Section id="contact" title={contact.title} className="contact-section" backdrop={<LiquidBackground bg="surface" parallax="0" topFade/>}><Reveal><p className="reading-lead">{contact.text}</p><div className="contact-actions"><Button href={`mailto:${site.email}`} variant="primary" className="mail-button">{site.email}<ArrowUpRight/></Button><Button href={site.linkedin} target="_blank" rel="noopener noreferrer">{ui.linkedin}</Button><Button href={site.github} target="_blank" rel="noopener noreferrer">{ui.github}</Button><Button href={site.resume} target="_blank" rel="noopener noreferrer">{ui.view}<ArrowUpRight/></Button><Button href={site.resume} download="Shehbaz_Pathan_Resume.pdf">{ui.download}<ArrowDown/></Button></div></Reveal></Section>;
}
