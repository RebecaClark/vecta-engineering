import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";
const filePath = "file:///C:/Users/Wendel/Downloads/pagina-inteligente.html";

async function verifyMobileAll() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 393,
    height: 852,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  await page.goto(filePath, { waitUntil: "load" });
  await new Promise(r => setTimeout(r, 1200));

  // Helper for instant station teleport
  async function teleportToStation(idx) {
    await page.evaluate((i) => {
      const stationCenters = [0.03, 0.23, 0.43, 0.63, 0.83, 0.97];
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      window.scrollTo({ top: stationCenters[i] * maxScroll, behavior: "instant" });
    }, idx);
    await new Promise(r => setTimeout(r, 800));
  }

  // 1. Station 1 (Hero)
  await teleportToStation(0);
  await page.screenshot({ path: path.join(outDir, "28_mobile_hero_393.png") });
  console.log("Saved: 28_mobile_hero_393.png");

  // 2. Station 2 (Como Funciona)
  await teleportToStation(1);
  await page.screenshot({ path: path.join(outDir, "29_mobile_how_it_works.png") });
  console.log("Saved: 29_mobile_how_it_works.png");

  // 3. Station 3 (6 Motores Bento)
  await teleportToStation(2);
  await page.screenshot({ path: path.join(outDir, "30_mobile_bento_grid.png") });
  console.log("Saved: 30_mobile_bento_grid.png");

  // 4. Station 5 (Simulador)
  await teleportToStation(4);
  await page.screenshot({ path: path.join(outDir, "31_mobile_simulator.png") });
  console.log("Saved: 31_mobile_simulator.png");

  // 5. Open Chatbot
  await page.evaluate(() => {
    const btn = document.getElementById("chat-holo-btn");
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "32_mobile_chat_window.png") });
  console.log("Saved: 32_mobile_chat_window.png");

  // Close Chatbot
  await page.evaluate(() => {
    const closeBtn = document.getElementById("chat-close");
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 6. iPhone SE (375 x 667)
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  await teleportToStation(0);
  await page.screenshot({ path: path.join(outDir, "33_mobile_se_short_screen_hero.png") });
  console.log("Saved: 33_mobile_se_short_screen_hero.png");

  await browser.close();
  console.log("All screenshots updated!");
}

verifyMobileAll().catch(console.error);
