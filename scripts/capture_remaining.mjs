import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function captureRemaining() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Skip preloader immediately by pressing ESC
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Capture Marquee
  const marquee = await page.$(".animate-marquee-left");
  if (marquee) {
    await page.evaluate(() => {
      document.querySelector(".animate-marquee-left")?.scrollIntoView({ block: "center" });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "10_standards_marquee_clear.png") });
    console.log("Saved: 10_standards_marquee_clear.png");
  }

  // 2. Capture Proof CTA below Metrics
  const metricsEl = await page.$(".metric-card");
  if (metricsEl) {
    await metricsEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "11_proof_cta_metrics.png") });
    console.log("Saved: 11_proof_cta_metrics.png");
  }

  // 3. Test Clicking the Floating HUD to open Dossier Modal
  const hudButton = await page.$("button[class*='SOLICITAR ESTUDO']");
  if (hudButton) {
    await hudButton.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, "16_dossier_modal_opened.png") });
    console.log("Saved: 16_dossier_modal_opened.png");
  }

  await browser.close();
  console.log("Remaining screenshots captured successfully!");
}

captureRemaining().catch(console.error);
