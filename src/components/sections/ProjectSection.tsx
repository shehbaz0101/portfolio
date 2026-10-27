import { type Project, ui } from '@/content/site';
import { Button } from '../Button';
import { Reveal } from '../Reveal';
import { Flow } from '../Flow';
import { BarChart } from '../BarChart';
import { VideoPlayer } from '../VideoPlayer';
import { Gallery } from '../Gallery';
import { ArrowDown, ArrowUpRight, Chevron } from '../Icon';

export function Chips({ items }: { items: string[] }) {
  return <ul className="chips">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function Bullets({ items }: { items: string[] }) {
  return <ul className="how-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function Metrics({ items }: { items: Project['metrics'] }) {
  return <div className="stats metric-grid">{items.map(item => <Reveal key={item.value}><div className="stat-card"><p className="stat-value">{item.value}</p><p>{item.label}</p></div></Reveal>)}</div>;
}
export function ProjectSection({ project: p, band }: { project: Project; band: boolean }) {
  const details = p.details;
  return <section id={p.id} aria-labelledby={`${p.id}-title`} className={`section project-section ${band ? 'band' : ''}`}>
    <div className="container">
      <Reveal><header className="project-header">
        <p className="eyebrow">{p.index}</p><h2 id={`${p.id}-title`}>{p.name}</h2>
        <p className="project-lead">{p.summary}</p><Chips items={[p.status, ...p.tags.slice(0, 4)]}/>
        {p.meta && <dl className="meta-row">{p.meta.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>}
      </header></Reveal>
      {(p.whatItIs || p.links.length > 0 || p.video || p.shots) && <div className={`project-overview ${p.video || p.shots ? 'has-media' : ''}`}>
        <Reveal>{p.whatItIs && <><h3>{ui.whatItIs}</h3><p className="overview-copy">{p.whatItIs}</p></>}
          {p.links.length > 0 && <div className="link-buttons">{p.links.map((link, index) => <Button key={link.href} href={link.href} variant={index === 0 ? 'primary' : 'secondary'} target="_blank" rel="noopener noreferrer" download={link.download}>{link.label}{link.download ? <ArrowDown/> : <ArrowUpRight/>}</Button>)}</div>}
          {p.links.filter(link => link.note).map(link => <p key={link.href} className="small muted link-note">{link.note}</p>)}
        </Reveal>
        {p.video && <Reveal><VideoPlayer video={p.video}/></Reveal>}
        {p.shots && <Reveal><Gallery shots={p.shots} note={p.shotNote}/></Reveal>}
      </div>}
      {p.metrics.length > 0 && <div className="project-block"><h3>{ui.keyFacts}</h3><Metrics items={p.metrics}/>{p.metricNote && <p className="small muted metric-note">{p.metricNote}</p>}</div>}
      {(p.flow || p.how?.length) && <div className="project-block"><h3>{ui.flow}</h3>{p.flow && <Flow spec={p.flow}/>} {p.how && <Bullets items={p.how}/>}</div>}
      {p.chart && <div className="project-block evidence"><h3>{ui.evidence}</h3><BarChart chart={p.chart}/></div>}
      {details && <Reveal><details className="technical"><summary>{ui.technical}<Chevron className="chevron"/></summary><div className="details-body">
        {details.stack.length > 0 && <><h3 className="label">{ui.stack}</h3><Chips items={details.stack}/></>}
        {details.sections.map(detail => <div className="detail-section" key={detail.title}><h3>{detail.title}</h3>{detail.body && <p>{detail.body}</p>}{detail.bullets && <Bullets items={detail.bullets}/>}</div>)}
        {details.table && <div className="table-shell"><div className="table-scroll" role="region" aria-label={details.table.title} tabIndex={0}><table><caption>{details.table.title}</caption><thead><tr>{details.table.head.map(cell => <th scope="col" key={cell}>{cell}</th>)}</tr></thead><tbody>{details.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></div>}
        {details.caveats.length > 0 && <div className="callout"><h3>{ui.caveats}</h3><Bullets items={details.caveats}/></div>}
      </div></details></Reveal>}
    </div>
  </section>;
}
