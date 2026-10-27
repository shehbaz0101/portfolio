# Shehbaz Pathan, portfolio

Next.js (App Router), TypeScript, Tailwind CSS, static export.

- All public copy lives in `src/content/site.ts`. Every claim is traced in `FACTS.md`. Design and structure notes are in `PLAN.md`.
- Develop: `npm install && npm run dev`
- Build static site: `npm run build` (writes `out/`), preview with `npm run start` (http://localhost:4173)
- Screenshots: with the preview running, `npm run shots` (uses Playwright core with a local Chrome) writes to `screenshots/`
- Set `NEXT_PUBLIC_SITE_URL` at build time to override the default domain (https://portfolio-teal-sigma-90.vercel.app) so canonical, Open Graph and sitemap URLs are correct.
- Deploy: any static host (Vercel, Render static site). Output directory is `out`.
