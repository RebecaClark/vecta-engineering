import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\хв43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots".join ? "" : "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

(async () => {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // 1. Scroll to metrics
[  await page.evaluate(() => {
    const el = document.querySelector(".metric-card");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, "02_company_metrics_grid.png") });

  // 2. Scroll to featured works
  await page.evaluate(() => {
    const el = document.querySelector("#featured-works");
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, "04_featured_works_cards.png") });

  console.log("Snapshots complete.");
  await browser.close();
})();
