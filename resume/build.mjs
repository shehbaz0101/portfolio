// Renders resume/resume.html to a single page US Letter PDF with real, selectable text.
// Usage: npm run resume   (writes public/Shehbaz_Pathan_Resume.pdf)
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const out = path.join(root, "public", "Shehbaz_Pathan_Resume.pdf");

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(here, "resume.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Overflow check: measure the bottom of the last block against the page, keeping a 0.3in bottom margin.
const fit = await page.evaluate(() => ({ bottom: document.querySelector(".edu").getBoundingClientRect().bottom, limit: document.body.clientHeight - 0.3 * 96 }));
console.log("last block bottom", Math.round(fit.bottom), "limit", Math.round(fit.limit));
if (fit.bottom > fit.limit && !process.env.FORCE) throw new Error("Resume content overflows one page");

await page.pdf({ path: out, format: "Letter", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
await browser.close();
console.log("wrote", out);
