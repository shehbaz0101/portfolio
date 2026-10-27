import { Plus } from '../Icon';
import { experience, ui } from '@/content/site';
import { Section } from '../Section';
import { Reveal } from '../Reveal';
import { Bullets } from './ProjectSection';
import { Flow } from '../Flow';
export function Experience() {
  return <Section id={experience.id} eyebrow={ui.experience} title={experience.title}><Reveal><div className="experience-header"><div><h3>{experience.role}</h3><p>{experience.company}</p></div><div className="experience-meta"><p>{experience.period}</p><p>{experience.place}</p></div></div><p className="experience-intro">{experience.whatItIs}</p><h3 className="label">{ui.flow}</h3><Bullets items={experience.how}/></Reveal><Flow spec={experience.flow}/><Reveal><details className="earlier"><summary>{ui.earlier}<Plus className="disclosure-plus"/></summary><div>{experience.earlier.map(role => <article className="earlier-role" key={role.company}><div className="experience-header"><div><h3>{role.role}</h3><p>{role.company}</p></div><div className="experience-meta"><p>{role.period}</p><p>{role.place}</p></div></div><ul className="how-list">{role.points.map(point => <li key={point}>{point}</li>)}</ul></article>)}</div></details></Reveal></Section>;
}
