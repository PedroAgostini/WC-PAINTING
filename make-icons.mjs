import { chromium } from "playwright-core";
import fs from "node:fs";

// Inlined rather than linked: a page built with setContent lives on
// about:blank, which is not allowed to read file:// URLs.
const LOGO =
  "data:image/webp;base64," +
  fs.readFileSync("public/logo-principal.webp").toString("base64");

// The lockup is 788x364. Only the rooflines plus the "WC" survive at 16px, so
// the icon crops to that block instead of shrinking the whole wordmark into an
// illegible smear.
//
// The ground is transparent, which is why this uses the full-colour lockup and
// not the white one: white on transparent disappears against a light tab strip.
const CROP = { x: 24, y: 2, w: 252, h: 208 };

function html(box, pad) {
  const scale = (box - pad * 2) / CROP.w;
  const winW = CROP.w * scale;
  const winH = CROP.h * scale;
  return `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0}
  .sq{width:${box}px;height:${box}px;position:relative;overflow:hidden}
  /* The window is exactly the crop, so nothing outside it can leak in. */
  .win{position:absolute;overflow:hidden;
       width:${winW}px;height:${winH}px;
       left:${(box - winW) / 2}px;top:${(box - winH) / 2}px}
  img{position:absolute;width:${788 * scale}px;
      left:${-CROP.x * scale}px;top:${-CROP.y * scale}px}
</style>
<div class="sq"><div class="win"><img src="${LOGO}"></div></div>`;
}

const browser = await chromium.launch({ channel: "chrome" });

for (const [box, pad, out] of [
  [512, 56, "app/icon.png"],
  [512, 64, "app/apple-icon.png"],
]) {
  const context = await browser.newContext({
    viewport: { width: box, height: box },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.setContent(html(box, pad), { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.locator(".sq").screenshot({ path: out, omitBackground: true });
  console.log("wrote", out, `${box}x${box}`);
  await context.close();
}

await browser.close();
