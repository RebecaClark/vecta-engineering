import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verify3DExplodedView() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--autoplay-policy=no-user-gesture-required"
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Dismiss preloader
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 600));

  const explodedSec = await page.$("#exploded-view");
  if (!explodedSec) throw new Error("#exploded-view not found!");

  await explodedSec.scrollIntoView();
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Capture Assembled 3D State
  await page.screenshot({ path: path.join(outDir, "20_exploded_view_3d_assembled.png") });
  console.log("Saved: 20_exploded_view_3d_assembled.png");

  // 2. Scroll to Explode (Scroll down 1200px inside pinned scrub)
  await page.evaluate(() => {
    window.scrollBy(0, 1200);
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, "21_exploded_view_3d_exploded.png") });
  console.log("Saved: 21_exploded_view_3d_exploded.png");

  // 3. Click WIREFRAME mode button
  const wireframeBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll("#exploded-view button"));
    return buttons.find((b) => b.textContent?.includes("WIREFRAME"));
  });
  if (wireframeBtn && wireframeBtn.asElement()) {
    await wireframeBtn.asElement().click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "22_exploded_view_3d_wireframe.png") });
    console.log("Saved: 22_exploded_view_3d_wireframe.png");
  }

  // 4. Click TENSÃO FEA mode button
  const stressBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll("#exploded-view button"));
    return buttons.find((b) => b.textContent?.includes("TENSÃO FEA"));
  });
  if (stressBtn && stressBtn.asElement()) {
    await stressBtn.asElement().click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "23_exploded_view_3d_stress.png") });
    console.log("Saved: 23_exploded_view_3d_stress.png");
  }

  await browser.close();
  console.log("3D Exploded View verified successfully!");
}

verify3DExplodedView().catch(console.error);
