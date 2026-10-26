import type { ReactNode } from 'react';
export function Section({ id, eyebrow, title, lead, children, className = '' }: { id: string; eyebrow?: string; title: string; lead?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}><div className="container"><header className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 id={`${id}-title`}>{title}</h2>{lead && <p className="lead">{lead}</p>}</header>{children}</div></section>;
}
