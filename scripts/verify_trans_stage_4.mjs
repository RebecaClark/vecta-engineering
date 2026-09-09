import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyTransStage4() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Escape to skip preloader
  await new Promise((r) => setTimeout(r, 500));
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 700));

  // Click tab 4 (04. Conclusão)
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("#transformation button[role='tab']"));
    if (tabs.length >= 4) {
      tabs[3].click();
    }
  });

  // Wait 3 seconds for Lenis smooth scroll to complete and settle on Stage 4
  await new Promise((r) => setTimeout(r, 3000));

  await page.screenshot({ path: path.join(outDir, "27_trans_stage_4_illuminated.png") });
  console.log("Saved: 27_trans_stage_4_illuminated.png");

  await browser.close();
}

verifyTransStage4().catch(console.error);
