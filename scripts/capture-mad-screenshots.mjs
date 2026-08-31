/**
 * Captures Phase 2.2A responsive validation screenshots.
 * Usage: node scripts/capture-mad-screenshots.mjs
 * Requires: npx playwright (Chromium)
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const screenshotDir = path.join(root, "Docs/screenshots/phase-2-2a");
const route =
  "/calculators/statistics/mean-absolute-deviation/index.html";

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
        res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
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

function buildLargeDataset(count) {
  return Array.from({ length: count }, (_, index) => String(index + 1)).join(
    ", ",
  );
}

async function capture(page, name, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(screenshotDir, name),
    fullPage: true,
  });
}

const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await capture(page, "01-desktop-initial-1280.png", { width: 1280, height: 900 });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByLabel("Dataset values").fill("12, 15, 14, 10, 19");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector("text=Mean Absolute Deviation");
  await page.screenshot({
    path: path.join(screenshotDir, "02-desktop-calculated-1280.png"),
    fullPage: true,
  });

  await capture(page, "03-mobile-initial-390.png", { width: 390, height: 844 });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Dataset values").fill("12, 15, 14, 10, 19");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector("text=2.4");
  await page.screenshot({
    path: path.join(screenshotDir, "04-mobile-calculated-390.png"),
    fullPage: true,
  });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Dataset values").fill("abc");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector('[role="alert"]');
  await page.screenshot({
    path: path.join(screenshotDir, "05-mobile-validation-error-390.png"),
    fullPage: true,
  });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByLabel("Dataset values").fill(buildLargeDataset(101));
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector("text=Showing 100 of 101 observations");
  await page.screenshot({
    path: path.join(screenshotDir, "06-large-table-collapsed-1280.png"),
    fullPage: true,
  });

  console.log(`Screenshots saved to ${screenshotDir}`);
} finally {
  await browser.close();
  server.close();
}
