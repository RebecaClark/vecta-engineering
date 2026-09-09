import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function benchmark() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("error", (err) => errors.push(err.message));

  await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

  // Escape to skip preloader
  await new Promise((r) => setTimeout(r, 400));
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 600));

  // Perform smooth scroll across page and collect frame timestamps
  const perfData = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frames = 0;
      let lastTime = performance.now();
      const deltas = [];

      const onFrame = (now) => {
        const delta = now - lastTime;
        lastTime = now;
        deltas.push(delta);
        frames++;
        if (frames < 120) {
          window.scrollBy(0, 40);
          requestAnimationFrame(onFrame);
        } else {
          const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
          const fps = 1000 / avgDelta;
          const maxDelta = Math.max(...deltas);
          resolve({ fps: Math.round(fps), avgDelta: avgDelta.toFixed(2), maxDelta: maxDelta.toFixed(2), totalFrames: frames });
        }
      };

      requestAnimationFrame(onFrame);
    });
  });

  console.log("Performance benchmark results:", JSON.stringify(perfData));
  console.log("Page errors count:", errors.length);
  if (errors.length > 0) {
    console.log("Errors:", errors);
  }

  await browser.close();
}

benchmark().catch(console.error);
