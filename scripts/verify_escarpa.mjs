import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyEscarpaCard() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Dismiss preloader
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 900));

  // Scroll to #featured-works
  const featured = await page.$("#featured-works");
  if (featured) {
    await featured.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));

    // Scroll slightly down to center card #2
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({ path: path.join(outDir, "17_escarpa_atlantica_card.png") });
    console.log("Saved: 17_escarpa_atlantica_card.png");

    // Click "EXAMINAR DOSSIÊ ESTRUTURAL" on Escarpa Atlântica card
    const inspectBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll("#featured-works button"));
      return buttons.find((b) => b.textContent?.includes("EXAMINAR DOSSIÊ"));
    });

    if (inspectBtn && inspectBtn.asElement()) {
      await inspectBtn.asElement().click();
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outDir, "18_escarpa_atlantica_modal.png") });
      console.log("Saved: 18_escarpa_atlantica_modal.png");
    }
  }

  await browser.close();
  console.log("Verification finished successfully!");
}

verifyEscarpaCard().catch(console.error);
