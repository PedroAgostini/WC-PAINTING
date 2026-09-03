import { chromium } from "playwright-core";

const URL = "http://localhost:3000";
const OUT = ".impeccable/review";

const shots = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const sections = [
  "top",
  "about",
  "services",
  "transform-space",
  "work",
  "why-us",
  "reviews",
  "process",
  "start-project",
  "contact",
];

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

for (const shot of shots) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    locale: "en-US",
    reducedMotion: "reduce", // settle entrance motion so nothing reads as missing
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  // Force every reveal visible and settle the counters at their final value.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  });

  // Walk the page so lazy content and the sticky header settle, then return.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);

  await page.screenshot({ path: `${OUT}/${shot.name}-viewport.png` });

  for (const section of sections) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${shot.name}-${section}.png` });
  }

  // The gallery used to open a lightbox and this stepped through it. Nothing
  // in that section is clickable any more, so there is no state to capture.

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: true });

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  console.log(`${shot.name} ${shot.width}x${shot.height} -> ${OUT}/${shot.name}.png`, JSON.stringify(overflow));

  await context.close();
}

await browser.close();
