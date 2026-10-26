import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Glance } from '@/components/sections/Glance';
import { Experience } from '@/components/sections/Experience';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { PaperSection, PeraSection, SmartBiteSection, MoreOnGithub, SkillsEducation, Contact } from '@/components/sections/Remaining';
import { Footer } from '@/components/Footer';
import { projects } from '@/content/site';
export default function Home() {
  return <><Nav/><main id="main" tabIndex={-1}><Hero/><Glance/><Experience/><div id="work" className="work-wrapper"><header className="container work-heading"><p className="eyebrow">Work</p><h2>Selected projects</h2></header>{projects.map((project, index) => <ProjectSection key={project.id} project={project} band={index % 2 === 0}/>)}</div><PaperSection/><PeraSection/><SmartBiteSection/><MoreOnGithub/><SkillsEducation/><Contact/></main><Footer/></>;
}
