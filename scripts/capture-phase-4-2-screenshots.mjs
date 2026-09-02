/**
 * Captures Phase 4.2 responsive validation screenshots.
 * Usage: npm run build && node scripts/capture-phase-4-2-screenshots.mjs
 * Requires: playwright chromium (npx playwright install chromium)
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
const screenshotDir = path.join(root, "Docs/screenshots/phase-4-2");

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
  await page.waitForTimeout(250);
}

async function capture(page, baseUrl, name, route, viewport, options = {}) {
  await page.setViewportSize(viewport);
  await gotoRoute(page, baseUrl, route);
  await page.screenshot({
    path: path.join(screenshotDir, name),
    fullPage: options.fullPage ?? true,
  });
}

await mkdir(screenshotDir, { recursive: true });
const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await capture(page, baseUrl, "01-home-desktop-1280.png", "/", { width: 1280, height: 900 });
  await capture(page, baseUrl, "02-home-tablet-768.png", "/", { width: 768, height: 1024 });
  await capture(page, baseUrl, "03-home-mobile-390.png", "/", { width: 390, height: 844 });
  await capture(page, baseUrl, "04-home-narrow-mobile-320.png", "/", { width: 320, height: 568 });
  await capture(
    page,
    baseUrl,
    "05-directory-desktop-1280.png",
    "/calculators/",
    { width: 1280, height: 900 },
  );
  await capture(
    page,
    baseUrl,
    "06-directory-tablet-768.png",
    "/calculators/",
    { width: 768, height: 1024 },
  );
  await capture(
    page,
    baseUrl,
    "07-directory-mobile-390.png",
    "/calculators/",
    { width: 390, height: 844 },
  );

  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoRoute(page, baseUrl, "/");
  await page.locator("#home-search-input").fill("mad");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(screenshotDir, "08-search-results-desktop.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await gotoRoute(page, baseUrl, "/");
  await page.locator("#home-search-input").fill("zzzznotfound");
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(screenshotDir, "09-search-no-results-mobile.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await gotoRoute(page, baseUrl, "/");
  await page.getByRole("button", { name: /^menu$/i }).click();
  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.join(screenshotDir, "10-mobile-navigation-open-390.png"),
    fullPage: false,
  });

  console.log(`Screenshots saved to ${screenshotDir}`);
} finally {
  await browser.close();
  server.close();
}
