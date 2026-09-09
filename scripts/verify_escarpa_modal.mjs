import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyEscarpaModalDirect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 600));

  // Find Escarpa card button specifically
  const clicked = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#featured-works .blueprint-corner"));
    const escarpaCard = cards.find(c => c.textContent?.includes("Complexo Escarpa Atlântica"));
    if (escarpaCard) {
      const btn = escarpaCard.querySelector("button");
      if (btn) {
        btn.click();
        return true;
      }
    }
    return false;
  });

  console.log("Clicked Escarpa modal button:", clicked);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, "19_escarpa_modal_direct.png") });
  console.log("Saved: 19_escarpa_modal_direct.png");

  await browser.close();
}

verifyEscarpaModalDirect().catch(console.error);
