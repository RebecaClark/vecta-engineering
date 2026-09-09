import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyPhase7() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Dismiss preloader
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 600));

  // 1. Move mouse to trigger cursor and capture top section with cursor and grain
  await page.mouse.move(960, 540);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, "24_hero_cursor_grain.png") });
  console.log("Saved: 24_hero_cursor_grain.png");

  // 2. Scroll down to Manifesto and capture TextReveal
  await page.evaluate(() => {
    const el = document.getElementById("manifesto");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, "25_manifesto_text_reveal.png") });
  console.log("Saved: 25_manifesto_text_reveal.png");

  // 3. Scroll to Monumental CTA to capture animated CTA with glow and magnetic buttons
  await page.evaluate(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, "26_monumental_cta_reveal.png") });
  console.log("Saved: 26_monumental_cta_reveal.png");

  await browser.close();
  console.log("Phase 7 verification completed successfully!");
}

verifyPhase7().catch(console.error);
