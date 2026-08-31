/**
 * Keyboard navigation structure check via rendered HTML.
 * Verifies skip link first, focusable elements present, no positive tabindex traps.
 */

const pages = [
  "/",
  "/calculators/",
  "/methodology/",
  "/does-not-exist/",
];

const base = "http://localhost:3456";

function extractFocusables(html) {
  const focusablePattern =
    /<(a|button|input|select|textarea|summary)[^>]*>/gi;
  const matches = [...html.matchAll(focusablePattern)];
  return matches.map((match) => {
    const tag = match[0];
    const tabindex = tag.match(/tabindex="(-?\d+)"/)?.[1];
    const href = tag.match(/href="([^"]*)"/)?.[1];
    const className = tag.match(/class="([^"]*)"/)?.[1] ?? "";
    const label =
      tag.match(/>([^<]{1,40})</)?.[1]?.trim() ??
      className.split(" ").find((c) => c.includes("skip")) ??
      tag.slice(0, 60);
    return { tag: match[1], tabindex, href, label };
  });
}

const issues = [];

for (const path of pages) {
  const res = await fetch(base + path);
  const html = await res.text();
  const focusables = extractFocusables(html);
  const skip = focusables.find((f) => f.label.includes("Skip to main content"));
  const positiveTabindex = focusables.filter(
    (f) => f.tabindex && Number(f.tabindex) > 0,
  );

  if (!skip) {
    issues.push({ path, issue: "Missing skip link in focusable list" });
  } else if (focusables.indexOf(skip) !== 0) {
    issues.push({ path, issue: "Skip link is not first focusable element" });
  }

  if (positiveTabindex.length) {
    issues.push({ path, issue: "Positive tabindex found", positiveTabindex });
  }

  if (focusables.length < 5) {
    issues.push({ path, issue: `Too few focusables: ${focusables.length}` });
  }

  console.log(`${path}: ${focusables.length} focusables, skip=${!!skip}`);
}

console.log(`KEYBOARD_ISSUES=${issues.length}`);
for (const issue of issues) {
  console.log(JSON.stringify(issue));
}

process.exit(issues.length > 0 ? 1 : 0);
