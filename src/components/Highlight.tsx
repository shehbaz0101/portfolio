import { Fragment } from 'react';
// Wraps known key phrases in a soft gradient. If a phrase is not in the text (copy changed), the text renders unchanged.
export function Highlight({ text, phrases }: { text: string; phrases: string[] }) {
  const found = phrases.filter(phrase => text.includes(phrase));
  if (!found.length) return <>{text}</>;
  const escaped = found.map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = text.split(new RegExp(`(${escaped.join('|')})`));
  return <>{parts.map((part, index) => found.includes(part) ? <mark className="hl" key={index}>{part}</mark> : <Fragment key={index}>{part}</Fragment>)}</>;
}
