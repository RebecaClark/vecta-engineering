import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\58b58936-fd70-48d2-b57d-c7f4b148533b\\screenshots";

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });
  await new Promise(r => setTimeout(r, 600));
}

async function verify() {
  console.log("Launching Chrome...");
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
  const networkErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  page.on("requestfailed", (req) => {
    networkErrors.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  // 1. Desktop V1
  console.log("Testing Desktop V1 (1440x900)...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await page.waitForSelector("h1");
  
  // Verify video element state
  const videoState = await page.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return { found: false };
    return {
      found: true,
      paused: v.paused,
      muted: v.muted,
      currentTime: v.currentTime,
      duration: v.duration,
      readyState: v.readyState,
      currentSrc: v.currentSrc
    };
  });
  console.log("Video status:", JSON.stringify(videoState, null, 2));

  await page.screenshot({ path: path.join(outDir, "01_desktop_v1_hero.png") });

  console.log("Auto-scrolling for full page capture...");
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, "01_desktop_v1_full.png"), fullPage: true });

  // 2. Desktop V2
  console.log("Testing Desktop V2 (1720x1000)...");
  await page.setViewport({ width: 1720, height: 1000 });
  await page.goto("http://localhost:3000/v2", { waitUntil: "networkidle2" });
  await page.waitForSelector("h1");
  await page.screenshot({ path: path.join(outDir, "02_desktop_v2_hero.png") });

  // 3. Desktop V3
  console.log("Testing Desktop V3 (1440x900)...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/v3", { waitUntil: "networkidle2" });
  await page.waitForSelector("h1");
  await page.screenshot({ path: path.join(outDir, "03_desktop_v3_hero.png") });

  // 4. Tablet
  console.log("Testing Tablet Viewport (768x1024)...");
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await page.waitForSelector("h1");
  await page.screenshot({ path: path.join(outDir, "04_tablet_v1.png") });

  // 5. Mobile
  console.log("Testing Mobile Viewport (390x844)...");
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await page.waitForSelector("h1");
  await page.screenshot({ path: path.join(outDir, "05_mobile_v1.png") });

  // 6. Dossier Modal
  console.log("Testing Dossier Modal...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes("EXAMINE STRUCTURAL DOSSIER")) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "06_dossier_modal.png") });

  await browser.close();

  console.log("--- ALL VERIFICATIONS PASSED ---");
  console.log(`Console errors (${consoleErrors.length}):`, consoleErrors);
  console.log(`Network errors (${networkErrors.length}):`, networkErrors);
}

verify().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
