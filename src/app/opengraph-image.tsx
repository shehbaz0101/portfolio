import { ImageResponse } from 'next/og';
import { site, hero } from '@/content/site';
export const dynamic = 'force-static';
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 76, background: 'linear-gradient(125deg, #ffffff 35%, #eef1ff 100%)', color: '#0a2540', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ display: 'flex', background: '#635bff', color: '#fff', borderRadius: 14, padding: 16, fontSize: 28 }}>SP</div><span style={{ fontSize: 28 }}>{site.name}</span></div><div style={{ fontSize: 64, letterSpacing: -3, lineHeight: 1.1, maxWidth: 1000 }}>{hero.headline}</div><div style={{ fontSize: 22, color: '#425466' }}>{hero.eyebrow}</div></div>, size);
}
