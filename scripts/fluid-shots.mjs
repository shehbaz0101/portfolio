// Screenshots of the fluid build: viewport, dark, mobile, full page, hero frames, scroll video.
import { chromium } from "playwright-core";
import fs from "node:fs";
const base = process.env.BASE ?? "http://localhost:4180";
const prefix = process.env.PREFIX ?? "local-v5";
const only = process.env.ONLY?.split(",");
const args = ["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args });
const run = (n) => !only || only.includes(n);
async function open(vp, scheme) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(3300);
  return { ctx, page, errors };
}
const metrics = (page) => page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, localhost: document.documentElement.outerHTML.includes("localhost"), ready: document.querySelector(".liquid")?.dataset.ready }));
const shots = [["desktop-light-viewport", { width: 1440, height: 900 }, "light"], ["desktop-dark-viewport", { width: 1440, height: 900 }, "dark"], ["mobile-light", { width: 390, height: 844 }, "light"], ["mobile-dark", { width: 390, height: 844 }, "dark"]];
for (const [name, vp, scheme] of shots) {
  if (!run(name)) continue;
  const { ctx, page, errors } = await open(vp, scheme);
  await page.screenshot({ path: `screenshots/${prefix}-${name}.png` });
  console.log(name, JSON.stringify(await metrics(page)), errors);
  await ctx.close();
}
if (run("full")) {
  // swiftshader repeats content past its max texture height in fullPage captures, so stitch viewport slices instead.
  const { ctx, page, errors } = await open({ width: 1440, height: 900 }, "light");
  await page.addStyleTag({ content: ".nav-shell{position:static!important} .scroll-progress{display:none!important}" });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  fs.rmSync("/tmp/slices", { recursive: true, force: true }); fs.mkdirSync("/tmp/slices", { recursive: true });
  const ys = [];
  for (let y = 0; y + 900 < h + 540; y += 540) ys.push(Math.min(y, h - 900));
  for (let i = 0; i < ys.length; i++) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), ys[i]);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/tmp/slices/${String(i).padStart(3, "0")}.png` });
  }
  console.log("full", h, JSON.stringify(await metrics(page)), errors);
  fs.writeFileSync("/tmp/slices/ys.json", JSON.stringify({ ys, h }));
  await ctx.close();
  const { execFileSync } = await import("node:child_process");
  execFileSync("python3", ["-c", `
import json
from PIL import Image
d=json.load(open('/tmp/slices/ys.json'))
im=Image.new('RGB',(1440,d['h']))
last=len(d['ys'])-1\nfor i,y in enumerate(d['ys']):\n    s=Image.open('/tmp/slices/%03d.png'%i)\n    if i<last: s=s.crop((0,0,1440,540))\n    im.paste(s,(0,y))
im.save('screenshots/${prefix}-desktop-light-full.png')
`]);
}
if (run("frames")) {
  const { ctx, page } = await open({ width: 1440, height: 900 }, "light");
  for (let i = 1; i <= 3; i++) { await page.screenshot({ path: `screenshots/${prefix}-hero-frame${i}.png` }); await page.waitForTimeout(1000); }
  await ctx.close();
}
if (run("video")) {
  fs.mkdirSync("/tmp/vid", { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", recordVideo: { dir: "/tmp/vid", size: { width: 1440, height: 900 } } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.mouse.move(1000, 300); await page.waitForTimeout(500); await page.mouse.move(400, 500, { steps: 30 }); await page.waitForTimeout(800);
  const h = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const steps = 90;
  for (let i = 1; i <= steps; i++) { await page.mouse.wheel(0, h / steps * 1.0); await page.waitForTimeout(100); if (i % 6 === 0) await page.mouse.move(300 + (i * 37) % 800, 300 + (i * 53) % 400, { steps: 5 }); }
  await page.waitForTimeout(1200);
  const v = page.video(); await ctx.close(); await v.saveAs(`/tmp/vid/${prefix}-scroll.webm`);
}
await browser.close();
