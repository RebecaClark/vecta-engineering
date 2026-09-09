import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verify() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
    ],
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

  await page.setViewport({ width: 1440, height: 900 });
  console.log("Navigating to http://localhost:3002...");
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // 1. Scroll to Exploded View (#exploded-view)
  console.log("Locating #exploded-view...");
  await page.evaluate(() => {
    const el = document.getElementById("exploded-view");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 2500));

  const explodedPath = path.join(outDir, "34_3dfactory_exploded_tower.png");
  await page.screenshot({ path: explodedPath });
  console.log("Saved screenshot:", explodedPath);

  // 2. Scroll to Structural 3D Nodal Joint (#structural-3d)
  console.log("Locating #structural-3d...");
  await page.evaluate(() => {
    const el = document.getElementById("structural-3d");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 2500));

  const nodalPath = path.join(outDir, "35_3dfactory_nodal_joint_solid.png");
  await page.screenshot({ path: nodalPath });
  console.log("Saved screenshot:", nodalPath);

  // 3. Test Tensão Von Mises button click
  console.log("Switching to Tensão Von Mises mode...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const stressBtn = buttons.find((b) => b.textContent?.includes("TENSÃO VON MISES"));
    if (stressBtn) stressBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const stressPath = path.join(outDir, "36_3dfactory_nodal_joint_stress.png");
  await page.screenshot({ path: stressPath });
  console.log("Saved screenshot:", stressPath);

  console.log("Console Errors:", consoleErrors);
  console.log("Network Errors:", networkErrors);

  await browser.close();
  console.log("Verification complete!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
