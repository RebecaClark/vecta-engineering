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

  // Wait 1.5 seconds for video playback progression
  await new Promise(r => setTimeout(r, 1500));

  const status = await page.evaluate(() => {
    const v = document.querySelector("video");
    const switcher = Array.from(document.querySelectorAll("span, div")).find(el => el.textContent?.includes("3 APPROVED EDITIONS"));
    
    return {
      hasVideo: !!v,
      paused: v ? v.paused : null,
      muted: v ? v.muted : null,
      currentTime: v ? v.currentTime : null,
      duration: v ? v.duration : null,
      readyState: v ? v.readyState : null,
      hasSwitcher: !!switcher
    };
  });

  console.log("Video Playback Status:", JSON.stringify(status, null, 2));

  // Capture screenshot during video playback
  await page.screenshot({ path: path.join(outDir, "verified_video_hero_playing.png") });
  console.log("Saved verified_video_hero_playing.png");

  // Wait another 1.5 seconds to capture further progression
  await new Promise(r => setTimeout(r, 1500));
  const progressStatus = await page.evaluate(() => {
    const v = document.querySelector("video");
    return { currentTime: v ? v.currentTime : null };
  });
  console.log("Time after 3s:", progressStatus.currentTime);

  await page.screenshot({ path: path.join(outDir, "verified_video_hero_midway.png") });
  console.log("Saved verified_video_hero_midway.png");

  await browser.close();
  console.log("Console errors:", consoleErrors);
}

verify().catch(e => {
  console.error("Verification failed:", e);
  process.exit(1);
});
