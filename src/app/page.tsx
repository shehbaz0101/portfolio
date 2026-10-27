import { Fragment } from 'react';
import { Nav } from '@/components/Nav';
import { Motion } from '@/components/Motion';
import { Reveal } from '@/components/Reveal';
import { Wave } from '@/components/Wave';
import { Hero } from '@/components/sections/Hero';
import { Glance } from '@/components/sections/Glance';
import { Experience } from '@/components/sections/Experience';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { MoreOnGithub, Skills, Education, Contact } from '@/components/sections/Remaining';
import { Footer } from '@/components/Footer';
import { projects, ui } from '@/content/site';
export default function Home() {
  return <><Motion/><Nav/><main id="main" tabIndex={-1}><Hero/><Wave from="canvas" to="surface" seed={0}/><Glance/><Wave from="surface" to="canvas" seed={1}/><Experience/><div id="work" className="work-wrapper"><header className="container work-heading"><Reveal className="reveal-stagger"><p className="eyebrow">{ui.workLabel}</p><h2>{ui.selectedProjects}</h2></Reveal></header>{projects.map((project, index) => <Fragment key={project.id}><Wave from={index % 2 === 0 ? 'canvas' : 'surface'} to={index % 2 === 0 ? 'surface' : 'canvas'} seed={index + 2}/><ProjectSection project={project} band={index % 2 === 0}/></Fragment>)}</div><MoreOnGithub/><Wave from="canvas" to="surface" seed={1}/><Skills/><Wave from="surface" to="canvas" seed={2}/><Education/><Wave from="canvas" to="surface" seed={0}/><Contact/></main><Footer/></>;
}
