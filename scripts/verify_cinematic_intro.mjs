import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\58b58936-fd70-48d2-b57d-c7f4b148533b\\screenshots";

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
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

  // 1. Initial State (~2s)
  await new Promise(r => setTimeout(r, 2000));
  const introState1 = await page.evaluate(() => {
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");
    const phrase = document.querySelector("h2");
    const video = document.querySelector("video");

    return {
      time: video?.currentTime,
      paused: video?.paused,
      headerVisible: header ? !header.classList.contains("-translate-y-full") && !header.classList.contains("opacity-0") : false,
      h1Visible: h1 ? window.getComputedStyle(h1).display !== "none" && !h1.closest(".hidden") : false,
      activePhraseText: phrase?.textContent?.trim()
    };
  });
  console.log("State at ~2s (Intro mode):", JSON.stringify(introState1, null, 2));
  await page.screenshot({ path: path.join(outDir, "01_cinematic_intro_phrase1.png") });

  // 2. Seek to 12s (Drone entry descending view & Phrase 3)
  console.log("Seeking to 12.0s...");
  await page.evaluate(() => {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = 12.0;
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const introState2 = await page.evaluate(() => {
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");
    const phrase = document.querySelector("h2");
    const video = document.querySelector("video");

    return {
      time: video?.currentTime,
      headerVisible: header ? !header.classList.contains("-translate-y-full") && !header.classList.contains("opacity-0") : false,
      h1Visible: h1 ? window.getComputedStyle(h1).display !== "none" && !h1.closest(".hidden") : false,
      activePhraseText: phrase?.textContent?.trim()
    };
  });
  console.log("State at 12s (Civic integration):", JSON.stringify(introState2, null, 2));
  await page.screenshot({ path: path.join(outDir, "02_cinematic_intro_phrase3.png") });

  // 3. Seek to 21.0s (Trigger Hero reveal)
  console.log("Seeking to 21.2s to trigger full Hero reveal...");
  await page.evaluate(() => {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = 21.2;
    }
  });
  // Wait for 1.2s transition
  await new Promise(r => setTimeout(r, 1500));

  const revealedState = await page.evaluate(() => {
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");
    const video = document.querySelector("video");

    return {
      time: video?.currentTime,
      headerVisible: header ? !header.classList.contains("-translate-y-full") && !header.classList.contains("opacity-0") : false,
      h1Visible: h1 ? window.getComputedStyle(h1).display !== "none" && !h1.closest(".hidden") : false,
      h1Text: h1?.textContent?.trim().replace(/\s+/g, " ")
    };
  });
  console.log("State after 21s (Hero revealed):", JSON.stringify(revealedState, null, 2));
  await page.screenshot({ path: path.join(outDir, "03_cinematic_hero_revealed_at_21s.png") });

  await browser.close();
  console.log("Console errors:", consoleErrors);
}

verify().catch(e => {
  console.error("Verification failed:", e);
  process.exit(1);
});
