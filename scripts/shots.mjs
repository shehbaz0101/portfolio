import { chromium } from "playwright-core";
const base = process.env.BASE ?? "http://localhost:4173";
const out = "screenshots";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
const cfgs = [
  ["desktop-light", { width: 1440, height: 900 }, "light"],
  ["desktop-dark", { width: 1440, height: 900 }, "dark"],
  ["mobile-light", { width: 390, height: 844 }, "light"],
];
for (const [name, vp, scheme] of cfgs) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) errors.push(`${name} ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`${name} pageerror: ${e.message}`));
  page.on("requestfailed", (r) => !r.url().endsWith(".mp4") && errors.push(`${name} reqfail: ${r.url()}`));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${out}/${name}-viewport.png` });
  // trigger reveals
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
  // open all details for a second capture
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}-full-expanded.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(name, "height", h, "horizontal overflow", overflow);
  await ctx.close();
}
await browser.close();
console.log(errors.length ? errors.join("\n") : "no console errors");
