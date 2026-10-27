import { chromium } from "playwright-core";
const base = process.env.BASE ?? "http://localhost:4180";
const gl = ["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: gl });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = []; page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(m.text()); }); page.on("pageerror", e => errors.push(e.message));
await page.goto(base, { waitUntil: "networkidle" }); await page.waitForTimeout(1500);
// frames differ => canvas animates
const frames = [];
for (let i = 0; i < 3; i++) { frames.push((await page.screenshot({ clip: { x: 700, y: 60, width: 700, height: 300 } })).toString("base64").length); await page.waitForTimeout(1000); }
const a = await page.screenshot({ clip: { x: 700, y: 60, width: 700, height: 300 } }); await page.waitForTimeout(1500); const b = await page.screenshot({ clip: { x: 700, y: 60, width: 700, height: 300 } });
console.log("hero frames differ:", !a.equals(b));
// canvas non blank
console.log("canvas px", await page.evaluate(() => { const c = document.createElement("canvas"); const src = document.querySelector(".hero canvas"); return [src.width, src.height]; }));
// magnetic
const btn = page.locator(".hero .button-primary").first(); const box = await btn.boundingBox();
await page.mouse.move(box.x + box.width + 30, box.y + box.height / 2 + 10, { steps: 6 }); await page.waitForTimeout(500);
console.log("magnet tx/ty", await btn.evaluate(e => [e.style.getPropertyValue("--tx"), e.style.getPropertyValue("--ty"), e.dataset.magnet]));
// tilt
const card = page.locator(".featured-card"); const cb = await card.boundingBox();
await page.mouse.move(cb.x + cb.width * .8, cb.y + cb.height * .2, { steps: 6 }); await page.waitForTimeout(400);
console.log("tilt", await card.evaluate(e => [e.style.transform, e.style.getPropertyValue("--mx"), e.dataset.hot]));
await page.mouse.move(10, 10, { steps: 5 }); await page.waitForTimeout(800);
console.log("tilt reset", await card.evaluate(e => [e.style.transform, e.dataset.hot]));
// scroll spy + pill + progress
for (const id of ["coticula", "contact"]) {
  await page.evaluate(id => document.getElementById(id).scrollIntoView({ behavior: "instant" }), id); await page.waitForTimeout(1300);
  console.log(id, await page.evaluate(() => ({ cur: document.querySelector(".desktop-links a[aria-current]")?.getAttribute("href"), pill: getComputedStyle(document.querySelector(".desktop-links")).getPropertyValue("--pill-x") + "/" + getComputedStyle(document.querySelector(".desktop-links")).getPropertyValue("--pill-w"), prog: document.querySelector(".scroll-progress span").style.transform })));
  await page.screenshot({ path: `/tmp/nav-${id}.png`, clip: { x: 0, y: 0, width: 1440, height: 80 } });
}
// counts
console.log("stats", await page.evaluate(() => [...document.querySelectorAll(".bento-stat .count-live")].map(e => e.textContent)));
console.log("errors", errors);
await ctx.close();
// reduced motion
const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }); const rp = await rm.newPage(); const e2 = [];
rp.on("pageerror", e => e2.push(e.message)); await rp.goto(base, { waitUntil: "networkidle" }); await rp.waitForTimeout(1500);
console.log("reduced motion: canvas ready?", await rp.evaluate(() => document.querySelector(".liquid").dataset.ready), "stat text", await rp.evaluate(() => document.querySelector(".bento-s2 .count").textContent), e2);
await rp.screenshot({ path: "/tmp/rm.png" }); await rm.close();
// no webgl
const nb = await browser.launch ? null : null;
const b2 = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-gpu", "--disable-webgl", "--disable-3d-apis"] });
const nc = await b2.newContext({ viewport: { width: 1440, height: 900 } }); const np = await nc.newPage(); const e3 = [];
np.on("pageerror", e => e3.push(e.message)); np.on("console", m => { if (m.type() === "error") e3.push(m.text()); });
await np.goto(base, { waitUntil: "networkidle" }); await np.waitForTimeout(1500);
console.log("no webgl:", await np.evaluate(() => ({ webgl: !!document.createElement("canvas").getContext("webgl"), ready: document.querySelector(".liquid").dataset.ready })), e3);
await np.screenshot({ path: "/tmp/nowebgl.png" }); await b2.close();
await browser.close();
