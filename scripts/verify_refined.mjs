import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verify() {
  console.log("Connecting to Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-seuid-sandbox",
      "--autoplay-policy=no-user-gesture-required"
    ]
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  // 1. Widescreen
  console.log("1. Testing Widescreen 1920x1080 Hero...");
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, "01_hero_widescreen.png") });

  // 2. Manifesto & Metrics Blueprint Grid
  console.log("2. Testing Manifesto & Blueprint Metrics...");
  const metricsEl = await page.$(".metric-card");
  if (metricsEl) {
    await metricsEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, "02_manifesto_metrics_blueprint.png") });
  }

  // 3. Transformation Scrollytelling
  console.log("3. Testing Transformation Scrollytelling...");
  const transSec = await page.$("#transformation");
  if (transSec) {
    await transSec.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, "03_transformation_stage1.png") });

    await page.evaluate(() => {
      window.scrollBy(0, 1300);
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, "03_transformation_scrolled.png") });
  }

  // 4. Hover Project Card
  console.log("4. Testing Project Card Hover...");
  const featured = await page.$("#featured-works");
  if (featured) {
    await featured.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    const card = await page.$("#featured-works .blueprint-corner");
    if (card) {
      await card.hover();
      await new Promise(r => setTimeout(r, 800));
    }
    await page.screenshot({ path: path.join(outDir, "04_featured_works_hover.png") });
  }

// 5. Mobile
  console.log("5. Testing Mobile Viewport (390x844)...");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, "05_mobile_hero.png") });

  console.log("Cross-checking console errors: ", consoleErrors.length);
  await browser.close();
}

verify().catch((e) => { console.error(e); process.exit(1); });
