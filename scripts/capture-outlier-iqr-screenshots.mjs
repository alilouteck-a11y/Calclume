/**
 * Captures Phase 3.4 responsive validation screenshots for Outlier/IQR.
 * Usage: npm run build && node scripts/capture-outlier-iqr-screenshots.mjs
 * Requires: playwright (Chromium)
 */
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const screenshotDir = path.join(root, "Docs/screenshots/phase-3-4");
const route = "/calculators/statistics/outlier-iqr/index.html";
const exampleDataset = "1, 2, 3, 4, 5, 6, 7, 8, 9, 100";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = req.url?.split("?")[0] ?? "/";
      const relative =
        urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");
      const filePath = path.join(outDir, relative);

      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, {
          "Content-Type": MIME[ext] ?? "application/octet-stream",
        });
        res.end(data);
      } catch {
        res.writeHead(404).end("Not found");
      }
    });

    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function gotoCalculator(page, baseUrl, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
}

const { server, baseUrl } = await startStaticServer();
await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await gotoCalculator(page, baseUrl, { width: 1280, height: 900 });
  await page.screenshot({
    path: path.join(screenshotDir, "01-desktop-initial-1280.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 1280, height: 900 });
  await page.getByLabel("Dataset values").fill(exampleDataset);
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector("text=Interquartile range (IQR)");
  await page.screenshot({
    path: path.join(screenshotDir, "02-desktop-calculated-1280.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 768, height: 1024 });
  await page.getByLabel("Dataset values").fill(exampleDataset);
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector("text=Interquartile range (IQR)");
  await page.screenshot({
    path: path.join(screenshotDir, "03-tablet-calculated-768.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 390, height: 844 });
  await page.screenshot({
    path: path.join(screenshotDir, "04-mobile-initial-390.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 390, height: 844 });
  await page.getByLabel("Dataset values").fill(exampleDataset);
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector("text=Interquartile range (IQR)");
  await page.screenshot({
    path: path.join(screenshotDir, "05-mobile-calculated-390.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 390, height: 844 });
  await page.getByLabel("Dataset values").fill("abc");
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector('[role="alert"]');
  await page.screenshot({
    path: path.join(screenshotDir, "06-mobile-validation-error-390.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 320, height: 700 });
  await page.getByLabel("Dataset values").fill(exampleDataset);
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector("text=Interquartile range (IQR)");
  await page.screenshot({
    path: path.join(screenshotDir, "07-narrow-mobile-calculated-320.png"),
    fullPage: true,
  });

  await gotoCalculator(page, baseUrl, { width: 1280, height: 900 });
  await page.getByLabel("Dataset values").fill(exampleDataset);
  await page
    .getByRole("button", { name: "Calculate outliers and IQR" })
    .click();
  await page.waitForSelector("#outlier-iqr-boxplot-heading");
  await page.locator("#outlier-iqr-boxplot-heading").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(screenshotDir, "08-desktop-boxplot-table-1280.png"),
    fullPage: true,
  });

  console.log(`Screenshots saved to ${screenshotDir}`);
} finally {
  await browser.close();
  server.close();
}
