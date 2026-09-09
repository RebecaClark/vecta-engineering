import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";
const filePath = "file:///C:/Users/Wendel/Downloads/pagina-inteligente.html";

async function captureStation5() {
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
  await new Promise(r => setTimeout(r, 1000));

  // Teleport directly to station 4 (Simulador)
  await page.evaluate(() => {
    const stationCenters = [0.03, 0.23, 0.43, 0.63, 0.83, 0.97];
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    window.scrollTo({ top: stationCenters[4] * maxScroll, behavior: "instant" });
  });

  // Wait 2.2s for camera lerp to arrive at -34000
  await new Promise(r => setTimeout(r, 2200));

  await page.screenshot({ path: path.join(outDir, "31_mobile_simulator.png") });
  console.log("Saved: 31_mobile_simulator.png");

  await browser.close();
}

captureStation5().catch(console.error);
