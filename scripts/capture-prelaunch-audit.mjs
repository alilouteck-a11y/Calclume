/**
 * Phase 2.3 static-export responsive smoke checks.
 * Usage: node scripts/capture-prelaunch-audit.mjs
 */
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const reportDir = path.join(root, "Docs/screenshots/phase-2-3");

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = req.url?.split("?")[0] ?? "/";
      let relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");
      if (relative.endsWith("/")) relative += "index.html";
      const filePath = path.join(outDir, relative);
      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
        res.end(data);
      } catch {
        try {
          const data = await readFile(path.join(outDir, "404.html"));
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data);
        } catch {
          res.writeHead(404).end("Not found");
        }
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function overflowCheck(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow: doc.scrollWidth > doc.clientWidth + 1,
    };
  });
}

const widths = [320, 390, 768, 1024, 1280];
const pages = [
  { name: "home", path: "/" },
  { name: "mad", path: "/calculators/statistics/mean-absolute-deviation/" },
  { name: "methodology", path: "/methodology/" },
  { name: "privacy", path: "/privacy/" },
  { name: "not-found", path: "/missing-route-for-404/" },
];

await mkdir(reportDir, { recursive: true });
const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();
const findings = [];

try {
  const page = await browser.newPage();

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const entry of pages) {
      await page.goto(`${baseUrl}${entry.path}`, { waitUntil: "networkidle" });
      const overflow = await overflowCheck(page);
      findings.push({
        width,
        page: entry.name,
        overflow: overflow.overflow,
        scrollWidth: overflow.scrollWidth,
        clientWidth: overflow.clientWidth,
      });
    }
  }

  // Key screenshots at representative widths
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(reportDir, "01-home-1280.png"), fullPage: true });

  await page.goto(`${baseUrl}/calculators/statistics/mean-absolute-deviation/`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: path.join(reportDir, "02-mad-initial-1280.png"),
    fullPage: true,
  });

  await page.getByLabel("Dataset values").fill("12, 15, 14, 10, 19");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector("text=2.4");
  await page.screenshot({
    path: path.join(reportDir, "03-mad-calculated-1280.png"),
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/calculators/statistics/mean-absolute-deviation/`, {
    waitUntil: "networkidle",
  });
  await page.getByLabel("Dataset values").fill("abc");
  await page.getByRole("button", { name: "Calculate MAD" }).click();
  await page.waitForSelector('[role="alert"]');
  await page.screenshot({
    path: path.join(reportDir, "04-mad-error-390.png"),
    fullPage: true,
  });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/privacy/`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(reportDir, "05-privacy-1280.png"),
    fullPage: true,
  });

  // Keyboard smoke: skip link exists and Calculate is focusable
  await page.goto(`${baseUrl}/calculators/statistics/mean-absolute-deviation/`, {
    waitUntil: "networkidle",
  });
  const skipHref = await page.locator("a.skip-link").getAttribute("href");
  await page.getByRole("button", { name: "Calculate MAD" }).focus();
  const focused = await page.evaluate(() => document.activeElement?.textContent);

  await writeFile(
    path.join(reportDir, "overflow-report.json"),
    JSON.stringify(
      {
        findings,
        keyboard: { skipHref, focusedCalculate: focused?.includes("Calculate MAD") },
      },
      null,
      2,
    ),
  );

  const overflowHits = findings.filter((f) => f.overflow);
  console.log(
    JSON.stringify(
      {
        overflowHits,
        skipHref,
        focusedCalculate: focused?.includes("Calculate MAD"),
        reportDir,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  server.close();
}
