import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
export function Section({ id, eyebrow, title, lead, children, className = '', backdrop }: { id: string; eyebrow?: string; title: string; lead?: string; children: ReactNode; className?: string; backdrop?: ReactNode }) {
  return <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>{backdrop}<div className="container"><header className="section-heading"><Reveal className="reveal-stagger">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 id={`${id}-title`}>{title}</h2>{lead && <p className="lead">{lead}</p>}</Reveal></header>{children}</div></section>;
}
