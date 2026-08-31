import { chromium } from "playwright";

const widths = [320, 390, 768, 1024, 1280];
const pages = [
  { path: "/", name: "homepage" },
  { path: "/calculators/", name: "calculators" },
  { path: "/calculators/statistics/", name: "statistics" },
  { path: "/methodology/", name: "methodology" },
  { path: "/privacy/", name: "privacy" },
  { path: "/does-not-exist/", name: "404" },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 800 },
  });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  for (const route of pages) {
    const response = await page.goto(`http://localhost:3456${route.path}`, {
      waitUntil: "networkidle",
    });

    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const h1Rect = h1?.getBoundingClientRect();

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
        h1: document.querySelectorAll("h1").length,
        skipLink: !!document.querySelector('a.skip-link[href="#main-content"]'),
        heroInViewport: h1Rect
          ? h1Rect.top >= 0 && h1Rect.top < window.innerHeight
          : null,
        hasCTA: !!document.querySelector('a[href="/calculators/"]'),
      };
    });

    results.push({
      width,
      page: route.name,
      status: response?.status(),
      ...metrics,
      consoleErrors: [...consoleErrors],
    });
    consoleErrors.length = 0;
  }

  await context.close();
}

await browser.close();

const issues = results.filter(
  (result) =>
    result.overflow ||
    result.h1 !== 1 ||
    result.consoleErrors.length > 0,
);

console.log(`TOTAL_CHECKS=${results.length}`);
console.log(`ISSUES_COUNT=${issues.length}`);
for (const issue of issues) {
  console.log(JSON.stringify(issue));
}

const home320 = results.find(
  (result) => result.width === 320 && result.page === "homepage",
);
console.log(`HOME_320=${JSON.stringify(home320)}`);

process.exit(issues.length > 0 ? 1 : 0);
