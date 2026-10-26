import type { CSSProperties } from 'react';
import type { BarChart as ChartSpec } from '@/content/site';
import { Reveal } from './Reveal';
export function BarChart({ chart }: { chart: ChartSpec }) {
  const max = Math.max(...chart.rows.map(row => row.value));
  const min = Math.min(...chart.rows.filter(row => row.value > 0).map(row => row.value)) / 4;
  return <Reveal><figure className="bar-chart"><h3>{chart.title}</h3><div role="img" aria-label={`${chart.title}. ${chart.rows.map(row => `${row.label}: ${row.display}${row.note ? `, ${row.note}` : ''}`).join('. ')}`} className="chart-rows">{chart.rows.map(row => {
    const width = chart.scale === 'log' ? (Math.log(Math.max(row.value, min)) - Math.log(min)) / (Math.log(max) - Math.log(min)) : row.value / max;
    return <div aria-hidden="true" className={`chart-row tone-${row.tone ?? 'accent'}`} key={row.label}><div className="chart-label">{row.label}{row.note && <small>{row.note}</small>}</div><div className="bar-track"><div className="bar-fill" style={{ '--bar-width': `${Math.max(2, width * 100)}%` } as CSSProperties}/></div><span className="chart-value">{row.display}</span></div>;
  })}</div>{chart.caption && <figcaption>{chart.caption}</figcaption>}</figure></Reveal>;
}
