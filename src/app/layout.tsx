import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { site, ui } from '@/content/site';
import './globals.css';
import './fluid.css';
const inter = localFont({ src: './fonts/inter-var-latin.woff2', weight: '100 900', variable: '--font-inter', display: 'swap' });
const mono = localFont({ src: './fonts/jetbrains-mono-var-latin.woff2', weight: '100 800', variable: '--font-mono', display: 'swap' });
const title = `${site.name} | ${site.role}`;
export const metadata: Metadata = {
  title, description: site.description, metadataBase: new URL(site.url),
  openGraph: { title, description: site.description, url: site.url, type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }] },
  twitter: { card: 'summary_large_image', title, description: site.description, images: ['/opengraph-image'] },
};
const themeScript = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'})()`;
export default function RootLayout({ children }: { children: ReactNode }) {
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.role, worksFor: { '@type': 'Organization', name: site.company }, url: site.url, sameAs: [site.linkedin, site.github] };
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body className={`${inter.variable} ${mono.variable}`}><a href="#main" className="skip-link">{ui.skip}</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}/></body></html>;
}
