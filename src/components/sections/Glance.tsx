import { ArrowUpRight } from '../Icon';
import { glance } from '@/content/site';
import { Section } from '../Section';
import { Reveal } from '../Reveal';
export function Glance() {
  return <Section id="glance" title={glance.title} lead={glance.lead} className="glance-section"><Reveal><div className="glance-table">{glance.rows.map(row => <a key={row.id} href={`#${row.id}`} className="glance-row"><span className="glance-name">{row.name}</span><span className="glance-what">{row.what}</span><span className="glance-result"><span>{row.result}</span><ArrowUpRight className="row-arrow"/></span></a>)}</div></Reveal></Section>;
}
