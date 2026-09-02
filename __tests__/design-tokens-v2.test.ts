import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const cssPath = path.join(process.cwd(), "app/globals.css");
const css = readFileSync(cssPath, "utf8");

const REQUIRED_TOKENS = [
  "--color-ink",
  "--color-paper",
  "--color-surface",
  "--color-surface-subtle",
  "--color-deep-surface",
  "--color-text",
  "--color-text-muted",
  "--color-border",
  "--color-border-strong",
  "--color-accent",
  "--color-accent-hover",
  "--color-focus-ring",
  "--color-error",
  "--color-error-bg",
  "--color-warning",
  "--color-warning-bg",
  "--color-success",
  "--color-lume-teal",
  "--color-muted",
  "--category-accent",
  "--category-accent-statistics",
  "--category-accent-math",
  "--category-accent-finance",
  "--category-accent-business",
  "--category-accent-everyday-life",
  "--category-accent-date-time",
  "--category-accent-conversions",
  "--category-accent-construction",
  "--category-accent-health",
  "--category-accent-science",
  "--shadow-none",
  "--shadow-sm",
  "--shadow-md",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--space-1",
  "--space-4",
  "--space-section",
  "--touch-target",
  "--container-prose",
  "--text-display",
  "--text-result-primary",
  "--font-size-formula",
] as const;

describe("Scientific Luminance V2 tokens", () => {
  it("defines required semantic custom properties", () => {
    for (const token of REQUIRED_TOKENS) {
      expect(css.includes(`${token}:`)).toBe(true);
    }
  });

  it("does not introduce gradient decorations", () => {
    expect(css.toLowerCase()).not.toMatch(/linear-gradient|radial-gradient|conic-gradient/);
  });

  it("keeps legacy brand tokens resolvable", () => {
    expect(css).toMatch(/--color-lume-teal:\s*#087a70/i);
    expect(css).toMatch(/--color-ink:\s*#0b132b/i);
    expect(css).toMatch(/--color-paper:\s*#f6f8f7/i);
    expect(css).toMatch(/--color-focus-ring:\s*var\(--color-lume-teal\)/);
  });

  it("uses the approved V2 surface-subtle and warning tokens", () => {
    expect(css).toMatch(/--color-surface-subtle:\s*#f0f3f2/i);
    expect(css).toMatch(/--color-warning:\s*#9a7b2f/i);
    expect(css).toMatch(/--color-warning-bg:\s*#fbf6e8/i);
    expect(css).toMatch(/--color-border-strong:\s*#b8c4c0/i);
  });
});
