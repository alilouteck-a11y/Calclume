/**
 * Phase 4.2.1 — Directory reliability check against static export.
 * Usage: npm run build && node scripts/verify-phase-4-2-1-directory.mjs
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");

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

function collectPageErrors(page) {
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
  return { consoleErrors, pageErrors };
}

async function assertDirectoryHealthy(page, baseUrl) {
  await page.goto(`${baseUrl}/calculators/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const title = await page.getByRole("heading", { name: /^Calculators$/i }).textContent();
  if (!title) {
    throw new Error("Directory H1 missing");
  }

  const primaryLinks = await page
    .locator('nav[aria-label="Primary"] a')
    .allTextContents();
  if (primaryLinks.join("|") !== "Calculators|Methodology|About") {
    throw new Error(`Unexpected primary nav: ${primaryLinks.join(", ")}`);
  }

  if ((await page.locator('nav[aria-label="Primary"] a', { hasText: "Statistics" }).count()) > 0) {
    throw new Error("Statistics unexpectedly present in primary nav");
  }

  const search = page.getByRole("combobox", { name: /search calculators/i });
  await search.fill("mad");
  await page.waitForTimeout(350);
  const optionCount = await page.getByRole("option").count();
  if (optionCount < 1) {
    throw new Error("Directory search returned no options for 'mad'");
  }
}

const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const { consoleErrors, pageErrors } = collectPageErrors(page);

const report = {
  classification: "",
  steps: [],
};

try {
  // Direct entry
  await assertDirectoryHealthy(page, baseUrl);
  report.steps.push("direct-entry: pass");

  // Reload
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.getByRole("heading", { name: /^Calculators$/i }).waitFor();
  report.steps.push("reload: pass");

  // Navigate from homepage
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Calculators" }).click();
  await page.waitForURL("**/calculators/**");
  await page.waitForTimeout(250);
  await page.getByRole("heading", { name: /^Calculators$/i }).waitFor();
  await page.getByRole("combobox", { name: /search calculators/i }).fill("iqr");
  await page.waitForTimeout(350);
  if ((await page.getByRole("option").count()) < 1) {
    throw new Error("Search after client navigation failed");
  }
  report.steps.push("homepage-navigation: pass");

  // Back / forward
  await page.goBack({ waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  await page.goForward({ waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  await page.getByRole("heading", { name: /^Calculators$/i }).waitFor();
  report.steps.push("history: pass");

  // MAD/Outlier header parity smoke
  for (const route of [
    "/calculators/statistics/mean-absolute-deviation/",
    "/calculators/statistics/outlier-iqr/",
  ]) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const labels = await page.locator('nav[aria-label="Primary"] a').allTextContents();
    if (labels.join("|") !== "Calculators|Methodology|About") {
      throw new Error(`Nav mismatch on ${route}: ${labels.join(", ")}`);
    }
  }
  report.steps.push("calculator-header-parity: pass");

  const filteredConsole = consoleErrors.filter(
    (message) => !message.includes("favicon"),
  );

  if (pageErrors.length > 0 || filteredConsole.length > 0) {
    report.classification = "Application runtime errors detected";
    console.error(JSON.stringify({ report, pageErrors, consoleErrors: filteredConsole }, null, 2));
    process.exitCode = 1;
  } else {
    report.classification =
      "Automation/browser-session anomaly — not reproduced in production export";
    console.log(JSON.stringify({ report, pageErrors, consoleErrors: filteredConsole }, null, 2));
  }
} catch (error) {
  report.classification = "Application defect reproduced";
  console.error(JSON.stringify({ report, error: String(error), pageErrors, consoleErrors }, null, 2));
  process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}
