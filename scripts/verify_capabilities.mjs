import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyCapabilities() {
  console.log("Launching headless Chrome...");
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
  console.log("Navigating to http://localhost:3002...");
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1000));

  console.log("Scrolling to #capabilities...");
  const capSection = await page.$("#capabilities");
  if (!capSection) {
    throw new Error("#capabilities section not found!");
  }

  await capSection.scrollIntoView();
  await new Promise((r) => setTimeout(r, 1200));

  const cardsData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#capabilities .cap-card"));
    return cards.map((card, idx) => {
      const style = window.getComputedStyle(card);
      const rect = card.getBoundingClientRect();
      const title = card.querySelector("h3")?.innerText?.trim();
      const ref = card.querySelector("span")?.innerText?.trim();
      return {
        idx,
        ref,
        title,
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });
  });

  console.log("Found cards:", JSON.stringify(cardsData, null, 2));

  const screenshotPath = path.join(outDir, "06_capabilities_cards.png");
  await page.screenshot({ path: screenshotPath });
  console.log("Saved screenshot to:", screenshotPath);

  const firstButton = await page.$("#capabilities .cap-card button");
  if (firstButton) {
    console.log("Clicking toggle deliverables button on card 1...");
    await firstButton.click();
    await new Promise((r) => setTimeout(r, 600));
    const expandedScreenshotPath = path.join(outDir, "07_capabilities_cards_expanded.png");
    await page.screenshot({ path: expandedScreenshotPath });
    console.log("Saved expanded screenshot to:", expandedScreenshotPath);
  }

  console.log("Console errors count:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("Verification finished successfully!");
}

verifyCapabilities().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
