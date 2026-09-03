/**
 * Calculator category registry — sole manually maintained source of category metadata.
 * Server-safe and build-time safe. Calculator membership is derived from the catalog.
 */

export type CategoryId =
  | "math"
  | "statistics"
  | "finance"
  | "business"
  | "everyday-life"
  | "date-time"
  | "conversions"
  | "construction"
  | "health"
  | "science";

export type RiskLevel = "low" | "medium" | "high" | "very-high";

export type CategoryPriority = "launch" | "later" | "defer";

export type CategoryPublicationPolicy = "standard" | "grandfather";

/** Default published-calculator gate for new category hubs. */
export const DEFAULT_CATEGORY_INDEX_THRESHOLD = 3;

/** Statistics launch grandfather — existing hub remains indexable at this count. */
export const STATISTICS_GRANDFATHER_INDEX_THRESHOLD = 2;

export type CategoryDefinition = {
  readonly id: CategoryId;
  readonly name: string;
  readonly shortName: string;
  readonly slug: CategoryId;
  readonly route: `/calculators/${CategoryId}/`;
  readonly description: string;
  /** Document title / H1 for the public collection page. */
  readonly pageTitle: string;
  /** Longer intro for the collection page body. */
  readonly intro: string;
  /** Meta description when the category page is public. */
  readonly metaDescription: string;
  readonly accentToken: `--category-accent-${CategoryId}`;
  /** Dependency-free visual key — maps to CSS accent tokens, not an icon pack. */
  readonly iconKey: CategoryId;
  readonly searchAliases: readonly string[];
  readonly ymylRisk: RiskLevel;
  readonly safetyRisk: RiskLevel;
  readonly formulaUnitRisk: RiskLevel;
  readonly editorialCost: RiskLevel;
  readonly launchOrder: number;
  readonly minimumPublishedCalculators: number;
  readonly publicationPolicy: CategoryPublicationPolicy;
  readonly featured: boolean;
  readonly priority: CategoryPriority;
};

/**
 * Ten approved long-term categories.
 * Existence here does not imply a public route, sitemap entry, or directory card.
 */
export const calculatorCategories = [
  {
    id: "statistics",
    name: "Statistics",
    shortName: "Statistics",
    slug: "statistics",
    route: "/calculators/statistics/",
    description:
      "Descriptive and exploratory statistics tools with formulas and interpretation.",
    pageTitle: "Statistics & Data Calculators",
    intro:
      "CalcLume’s Statistics collection focuses on transparent descriptive and exploratory tools. Each published calculator returns the numeric result alongside the formula, intermediate working, and a plain-language interpretation so you can verify the method—not only the answer. Launch tools cover measures of spread and outlier screening; additional inference helpers remain in preparation until they meet the same editorial and testing bar. Use these pages for coursework, analysis checks, and learning—always with the conventions, limitations, and sources stated on each individual tool page.",
    metaDescription:
      "Step-by-step statistics and data calculators at CalcLume. Mean absolute deviation, IQR, standard error, and more.",
    accentToken: "--category-accent-statistics",
    iconKey: "statistics",
    searchAliases: ["stats", "statistics and data", "descriptive statistics"],
    ymylRisk: "medium",
    safetyRisk: "low",
    formulaUnitRisk: "high",
    editorialCost: "medium",
    launchOrder: 1,
    minimumPublishedCalculators: STATISTICS_GRANDFATHER_INDEX_THRESHOLD,
    publicationPolicy: "grandfather",
    featured: true,
    priority: "launch",
  },
  {
    id: "math",
    name: "Math",
    shortName: "Math",
    slug: "math",
    route: "/calculators/math/",
    description:
      "Arithmetic, algebra, and general mathematical tools with transparent steps.",
    pageTitle: "Math Calculators",
    intro:
      "Math calculators on CalcLume will emphasize clear arithmetic and algebraic methods with visible working. This category is architectural only until enough published tools meet the indexation gate.",
    metaDescription:
      "Transparent math calculators with formulas and step-by-step working from CalcLume.",
    accentToken: "--category-accent-math",
    iconKey: "math",
    searchAliases: ["mathematics", "arithmetic", "algebra"],
    ymylRisk: "low",
    safetyRisk: "low",
    formulaUnitRisk: "medium",
    editorialCost: "low",
    launchOrder: 2,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "launch",
  },
  {
    id: "everyday-life",
    name: "Everyday Life",
    shortName: "Everyday",
    slug: "everyday-life",
    route: "/calculators/everyday-life/",
    description: "Practical daily calculators for tips, splits, and simple estimates.",
    pageTitle: "Everyday Life Calculators",
    intro:
      "Everyday Life tools will cover practical daily calculations with transparent assumptions. Not public until the publication gate is met.",
    metaDescription:
      "Practical everyday calculators with clear steps from CalcLume.",
    accentToken: "--category-accent-everyday-life",
    iconKey: "everyday-life",
    searchAliases: ["daily", "practical", "everyday"],
    ymylRisk: "low",
    safetyRisk: "low",
    formulaUnitRisk: "low",
    editorialCost: "low",
    launchOrder: 3,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "date-time",
    name: "Date & Time",
    shortName: "Date & Time",
    slug: "date-time",
    route: "/calculators/date-time/",
    description: "Calendar duration and date arithmetic with documented assumptions.",
    pageTitle: "Date & Time Calculators",
    intro:
      "Date & Time calculators will document calendar assumptions explicitly. Not public until the publication gate is met.",
    metaDescription:
      "Date and time calculators with documented calendar assumptions from CalcLume.",
    accentToken: "--category-accent-date-time",
    iconKey: "date-time",
    searchAliases: ["calendar", "dates", "duration"],
    ymylRisk: "low",
    safetyRisk: "low",
    formulaUnitRisk: "medium",
    editorialCost: "medium",
    launchOrder: 4,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "conversions",
    name: "Conversions",
    shortName: "Conversions",
    slug: "conversions",
    route: "/calculators/conversions/",
    description: "Unit conversions with cited factors and transparent formulas.",
    pageTitle: "Conversion Calculators",
    intro:
      "Conversion tools will cite exact factors and show working. Not public until the publication gate is met.",
    metaDescription:
      "Unit conversion calculators with cited factors from CalcLume.",
    accentToken: "--category-accent-conversions",
    iconKey: "conversions",
    searchAliases: ["units", "convert", "conversion"],
    ymylRisk: "low",
    safetyRisk: "low",
    formulaUnitRisk: "high",
    editorialCost: "medium",
    launchOrder: 5,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "finance",
    name: "Finance",
    shortName: "Finance",
    slug: "finance",
    route: "/calculators/finance/",
    description:
      "Personal and small-business financial calculations with documented assumptions.",
    pageTitle: "Finance Calculators",
    intro:
      "Finance tools require elevated YMYL review and clear disclaimers. Not public until the publication gate and editorial process are met.",
    metaDescription:
      "Transparent finance calculators with documented assumptions from CalcLume.",
    accentToken: "--category-accent-finance",
    iconKey: "finance",
    searchAliases: ["money", "loan", "interest"],
    ymylRisk: "high",
    safetyRisk: "low",
    formulaUnitRisk: "high",
    editorialCost: "high",
    launchOrder: 6,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "business",
    name: "Business",
    shortName: "Business",
    slug: "business",
    route: "/calculators/business/",
    description:
      "Operational metrics such as margins and break-even with clear definitions.",
    pageTitle: "Business Calculators",
    intro:
      "Business calculators will define metrics consistently. Not public until the publication gate is met.",
    metaDescription:
      "Business metric calculators with clear definitions from CalcLume.",
    accentToken: "--category-accent-business",
    iconKey: "business",
    searchAliases: ["margin", "break even", "operations"],
    ymylRisk: "medium",
    safetyRisk: "low",
    formulaUnitRisk: "medium",
    editorialCost: "medium",
    launchOrder: 7,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "science",
    name: "Science",
    shortName: "Science",
    slug: "science",
    route: "/calculators/science/",
    description: "Physics and chemistry calculations with documented constants and units.",
    pageTitle: "Science Calculators",
    intro:
      "Science calculators will document constants and units carefully. Not public until the publication gate is met.",
    metaDescription:
      "Science calculators with documented constants and units from CalcLume.",
    accentToken: "--category-accent-science",
    iconKey: "science",
    searchAliases: ["physics", "chemistry", "lab"],
    ymylRisk: "medium",
    safetyRisk: "medium",
    formulaUnitRisk: "high",
    editorialCost: "high",
    launchOrder: 8,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "later",
  },
  {
    id: "health",
    name: "Health",
    shortName: "Health",
    slug: "health",
    route: "/calculators/health/",
    description: "Health-related calculators — deferred until YMYL review process matures.",
    pageTitle: "Health Calculators",
    intro:
      "Health tools are deferred because of very high YMYL and editorial requirements. Not public.",
    metaDescription:
      "Health calculators from CalcLume — deferred pending editorial review.",
    accentToken: "--category-accent-health",
    iconKey: "health",
    searchAliases: ["bmi", "medical", "wellness"],
    ymylRisk: "very-high",
    safetyRisk: "high",
    formulaUnitRisk: "high",
    editorialCost: "high",
    launchOrder: 9,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "defer",
  },
  {
    id: "construction",
    name: "Construction",
    shortName: "Construction",
    slug: "construction",
    route: "/calculators/construction/",
    description: "Material and geometry estimates — deferred pending editorial capacity.",
    pageTitle: "Construction Calculators",
    intro:
      "Construction tools are deferred due to high safety, formula/unit, and editorial risk—not because they are automatically YMYL. Not public.",
    metaDescription:
      "Construction calculators from CalcLume — deferred pending safety review.",
    accentToken: "--category-accent-construction",
    iconKey: "construction",
    searchAliases: ["building", "materials", "concrete"],
    ymylRisk: "medium",
    safetyRisk: "high",
    formulaUnitRisk: "high",
    editorialCost: "high",
    launchOrder: 10,
    minimumPublishedCalculators: DEFAULT_CATEGORY_INDEX_THRESHOLD,
    publicationPolicy: "standard",
    featured: false,
    priority: "defer",
  },
] as const satisfies readonly CategoryDefinition[];

export type RegistryCategory = (typeof calculatorCategories)[number];

const categoryById = new Map<CategoryId, CategoryDefinition>(
  calculatorCategories.map((category) => [category.id, category]),
);

const categoryBySlug = new Map<string, CategoryDefinition>(
  calculatorCategories.map((category) => [category.slug, category]),
);

export function getAllCategories(): readonly CategoryDefinition[] {
  return calculatorCategories;
}

export function getCategoryById(id: CategoryId): CategoryDefinition | undefined {
  return categoryById.get(id);
}

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return categoryBySlug.get(slug);
}

export function isValidCategoryId(value: string): value is CategoryId {
  return categoryById.has(value as CategoryId);
}

/** Supported accent CSS custom properties for category chrome. */
export const CATEGORY_ACCENT_TOKENS = calculatorCategories.map(
  (category) => category.accentToken,
);

/** Supported icon keys (dependency-free identifiers). */
export const CATEGORY_ICON_KEYS = calculatorCategories.map(
  (category) => category.iconKey,
);
