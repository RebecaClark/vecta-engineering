import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\Wendel\\.gemini\\antigravity\\brain\\9b43ca22-685d-44b4-9b5a-e949e56a9eb1\\screenshots";

async function verifyMobileCapabilities() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1000));

  const capSection = await page.$("#capabilities");
  if (capSection) {
    await capSection.scrollIntoView();
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, "08_capabilities_mobile.png") });
    console.log("Mobile capabilities screenshot saved!");
  }

  await browser.close();
}

verifyMobileCapabilities().catch(console.error);
