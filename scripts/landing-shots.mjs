import { chromium } from "playwright-core";
const base = process.env.BASE ?? "http://localhost:4173";
const prefix = process.env.PREFIX ?? "local-v4";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const cfgs = [
  ["desktop-light-viewport", { width: 1440, height: 900 }, "light", false],
  ["desktop-dark-viewport", { width: 1440, height: 900 }, "dark", false],
  ["mobile-light-viewport", { width: 390, height: 844 }, "light", false],
  ["mobile-dark-viewport", { width: 390, height: 844 }, "dark", false],
  ["desktop-light-full", { width: 1440, height: 900 }, "light", true],
];
for (const [name, vp, scheme, full] of cfgs) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  if (full) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(100); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `screenshots/${prefix}-${name}.png`, fullPage: full });
  const m = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, heroBottom: Math.round(document.querySelector(".proof")?.getBoundingClientRect().bottom + scrollY) }));
  console.log(name, JSON.stringify(m));
  await ctx.close();
}
await browser.close();
