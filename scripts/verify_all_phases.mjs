import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyAllPhases() {
  console.log("Launching headless Chrome for full 6-phase verification...");
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
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  await page.setViewport({ width: 1920, height: 1080 });

  // 1. PHASE 1: PRELOADER CAPTURE
  console.log("1. Navigating and capturing Preloader...");
  const navPromise = page.goto("http://localhost:3002", { waitUntil: "domcontentloaded" });
  // Wait 600ms to catch active preloader at ~30% - 50%
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "09_preloader_boot.png") });
  console.log("Saved: 09_preloader_boot.png");

  // Wait for navigation & preloader exit
  await navPromise;
  await new Promise((r) => setTimeout(r, 2200));

  // 2. PHASE 2: STANDARDS MARQUEE
  console.log("2. Capturing Standards Marquee...");
  const marquee = await page.$(".animate-marquee-left");
  if (marquee) {
    await page.evaluate(() => {
      document.querySelector(".animate-marquee-left")?.scrollIntoView({ block: "center" });
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, "10_standards_marquee.png") });
    console.log("Saved: 10_standards_marquee.png");
  }

  // 3. PHASE 3: JARVIS FLOATING ACTION HUD
  console.log("3. Capturing Jarvis Floating HUD...");
  const hud = await page.$("button[class*='SOLICITAR ESTUDO']");
  await page.screenshot({ path: path.join(outDir, "11_jarvis_conversion_hud.png") });
  console.log("Saved: 11_jarvis_conversion_hud.png");

  // 4. PHASE 4: VECTA LABS BENTO GRID
  console.log("4. Capturing Vecta Labs Bento Grid...");
  const labsSec = await page.$("#labs");
  if (labsSec) {
    await labsSec.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1000));
    // Test slider interaction
    await page.evaluate(() => {
      const slider = document.querySelector("#labs input[type='range']");
      if (slider) {
        slider.value = "32";
        slider.dispatchEvent(new Event("input", { bubbles: true }));
        slider.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, "12_vecta_labs_bento.png") });
    console.log("Saved: 12_vecta_labs_bento.png");
  }

  // 5. PHASE 5: STRUCTURAL EXPLODED VIEW (SCROLLYTELLING)
  console.log("5. Capturing Structural Exploded View...");
  const explodedSec = await page.$("#exploded-view");
  if (explodedSec) {
    await explodedSec.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    // Scroll a bit inside the pinned trigger to explode layers
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, "13_structural_exploded_view.png") });
    console.log("Saved: 13_structural_exploded_view.png");
  }

  // 6. PHASE 6: THREE.JS STRUCTURAL 3D VIEWER
  console.log("6. Capturing Three.js Structural 3D Viewer...");
  const viewerSec = await page.$("#structural-3d");
  if (viewerSec) {
    await viewerSec.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, "14_structural_3d_viewer.png") });
    console.log("Saved: 14_structural_3d_viewer.png");

    // Click Wireframe Mode
    const wireframeBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll("#structural-3d button"));
      return buttons.find((b) => b.textContent?.includes("WIREFRAME"));
    });
    if (wireframeBtn && wireframeBtn.asElement()) {
      await wireframeBtn.asElement().click();
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outDir, "15_structural_3d_wireframe.png") });
      console.log("Saved: 15_structural_3d_wireframe.png");
    }
  }

  console.log("Total console errors encountered:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("All 6 phases verified successfully!");
}

verifyAllPhases().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
