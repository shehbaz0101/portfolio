import { chromium } from "playwright-core";
const base = process.env.BASE ?? "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: process.env.SCHEME ?? "light" });
const page = await ctx.newPage();
const errors = [];
page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(m.type() + ": " + m.text()); });
page.on("pageerror", e => errors.push("pageerror: " + e.message));
await page.goto(base, { waitUntil: "networkidle" });
for (let i = 1; i <= 3; i++) { await page.waitForTimeout(1000); await page.screenshot({ path: `/tmp/probe-${i}.png` }); }
console.log(await page.evaluate(() => ({ ready: document.querySelector(".liquid")?.dataset.ready, overflow: document.documentElement.scrollWidth - innerWidth })));
console.log(errors);
await browser.close();
