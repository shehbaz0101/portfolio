# PLAN

## Goal
A portfolio that a recruiter can read in 30 seconds and an engineer can dig into. Every claim is traceable in FACTS.md.

## Site structure (single page, anchored sections)
1. Nav: name monogram, Work, Paper, Experience, Contact, theme toggle, Resume button.
2. Hero: one sentence on what he builds, location and role, three proof stats, links (GitHub, LinkedIn, resume, email).
3. 30 second view: a compact table of every project with a plain English line and the headline result, each row jumping to its section.
4. Experience at Opentrons: what he shipped, a generate, simulate, repair pipeline diagram from the resume facts, earlier roles collapsed below.
5. Featured projects in order spectrace, PINNForge, Coticula. Each card has: plain English "What it is", one headline result, demo video (poster, preload metadata, controls, inline), a "How it works" diagram built from real facts, a short bullet list, and an expandable "Technical details" panel (stack, method, results table, caveats, links).
6. Paper: Small Errors, Large Residuals, abstract in plain English plus the real abstract, key findings with two small charts from the paper's numbers, PDF link.
7. pera.ai: what it is, architecture diagram (orchestrator, five specialists, critic), screenshot gallery from demo mode, honest metrics, noted as a private repo.
8. SmartBite: one compact card (resume facts only).
9. More on GitHub: wirejournal, claimforge, worldforge, caraxes.
10. Skills, education, publication.
11. Contact and footer: email, LinkedIn, GitHub, resume download.

## Stack
Next.js App Router, TypeScript, Tailwind CSS, static export (`output: "export"`), next/font self hosted fonts, no runtime dependencies beyond React. Diagrams and charts are hand built inline SVG/CSS components driven by typed data in `src/content/site.ts`, so every number lives in one auditable file. Theme: inline script in the head sets the class before paint (localStorage, falls back to prefers-color-scheme). Scroll reveal through IntersectionObserver, disabled for prefers-reduced-motion.

## Design directions
A. Ledger (recommended). Stripe inspired: white and cool gray surfaces, hairline borders, layered soft shadows, an indigo to violet accent with a restrained gradient mesh in the hero, crisp sans type with a mono for data, product style cards, animated diagram connectors. Reads as trustworthy and engineered.
B. Lab notebook. Editorial, serif headings, paper textures, figure forward. Suits the paper but risks feeling academic and slower to scan.
C. Console. Terminal inspired split panes. Strong for engineers but dark by nature, hard to keep light and welcoming for recruiters.

Decision: A. It scans fast for recruiters and has room for dense technical panels for engineers.

## Build order
main: scaffold. feat/first-version: content data, layout and theme, hero and 30 second table, project cards with diagrams and videos, paper, pera.ai, SmartBite, contact, metadata, favicon, sitemap and robots, screenshots, review passes.

## Quality bar
No placeholders, no invented numbers, no dashes in copy (grep the build), `npm run build` clean, no console errors, responsive at 390 and 1440, keyboard accessible, AA contrast in both themes.
