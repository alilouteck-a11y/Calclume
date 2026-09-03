/**
 * Phase 4.4 reconciliation screenshots (replace affected shots only).
 * Usage: npm run build && node scripts/capture-phase-4-4-screenshots.mjs
 * Requires: playwright chromium
 */
import { createServer } from "node:http";
import { mkdir } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const screenshotDir = path.join(root, "Docs/screenshots/phase-4-4");

const MAD = "/calculators/statistics/mean-absolute-deviation/";
const IQR = "/calculators/statistics/outlier-iqr/";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = req.url?.split("?")[0] ?? "/";
      let relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");
      if (relative.endsWith("/")) {
        relative = `${relative}index.html`;
      }
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

async function gotoRoute(page, baseUrl, route) {
  const normalized = route === "/" ? "/" : route.endsWith("/") ? route : `${route}/`;
  await page.goto(`${baseUrl}${normalized}`, { waitUntil: "networkidle" });
}

async function capture(page, name) {
  await page.screenshot({
    path: path.join(screenshotDir, name),
    fullPage: true,
  });
}

await mkdir(screenshotDir, { recursive: true });
const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push(message.text());
  }
});
page.on("pageerror", (error) => {
  pageErrors.push(error.message);
});

try {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoRoute(page, baseUrl, MAD);
  await page.getByLabel("Dataset values").fill("12, 15, 14, 10, 19");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.getByText("2.4").first().waitFor();
  await capture(page, "02-mad-desktop-result-1280.png");

  await page.setViewportSize({ width: 390, height: 844 });
  await capture(page, "03-mad-mobile-result-390.png");

  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoRoute(page, baseUrl, MAD);
  await page.getByRole("heading", { name: "Related calculators" }).scrollIntoViewIfNeeded();
  await capture(page, "10-mad-related-education-transition-1280.png");

  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoRoute(page, baseUrl, IQR);
  await page.getByLabel("Dataset values").fill("1, 2, 3, 4, 5, 6, 7, 8, 9, 100");
  await page.getByRole("button", { name: "Calculate outliers and IQR" }).click();
  await page.getByText("1 outlier found").waitFor();
  await capture(page, "06-outlier-desktop-result-1280.png");

  await page.setViewportSize({ width: 390, height: 844 });
  await capture(page, "07-outlier-mobile-result-390.png");

  await page.getByRole("heading", { name: "Related calculators" }).scrollIntoViewIfNeeded();
  await capture(page, "13-outlier-related-390.png");

  await page.setViewportSize({ width: 320, height: 568 });
  await gotoRoute(page, baseUrl, IQR);
  await page.getByLabel("Dataset values").fill("1, 2, 3, 4, 5, 6, 7, 8, 9, 100");
  await page.getByRole("button", { name: "Calculate outliers and IQR" }).click();
  await page
    .getByRole("img", { name: /box plot of dataset quartiles and outliers/i })
    .waitFor();
  await capture(page, "09-outlier-narrow-mobile-boxplot-320.png");

  if (consoleErrors.length || pageErrors.length) {
    console.error("Browser console errors:", consoleErrors);
    console.error("Page errors:", pageErrors);
    process.exitCode = 1;
  } else {
    console.log("No browser console or page errors.");
  }

  console.log(`Screenshots saved to ${screenshotDir}`);
} finally {
  await browser.close();
  server.close();
}
