# Phase 1 Calculator Page Contract

**Status:** Locked for Phase 1

Defines the required structure for every published calculator page. No calculator pages are published in Phase 1.

## Page structure (top to bottom)

1. Breadcrumbs
2. Page title and brief description
3. Working calculator (inputs + result near top)
4. Formula block
5. Calculation steps
6. Interpretation
7. Examples selector
8. Sources list
9. Related calculators
10. Last reviewed date

## Contract fields

### Identity and metadata

- `slug`, `name`, `description`, `category`
- Unique metadata title, description, canonical URL

### Input schema

- Array of inputs with id, label, type, optional description, defaultValue, unit

### Validation rules

- Field-level rules with user-facing error messages

### Calculation result schema

- Primary result, label, formatted display, optional secondary values

### Formula, steps, interpretation

- Formula text (required), optional LaTeX and notation note
- Ordered steps with label and detail
- Interpretation text with optional caveats

### Rounding

- Display decimals, method (e.g., half-up), optional note

### Examples, sources, related

- At least one worked example with known correct output
- At least one real source consulted
- Related links to published calculators only

### Last reviewed date and tests

- ISO date of last human review
- Automated test cases and documented edge cases

## UI component mapping

| Section | Component |
|---------|-----------|
| Page wrapper | CalculatorShell |
| Inputs | CalculatorInputPanel, DatasetInput, ExampleSelector |
| Result | CalculatorResultPanel |
| Formula | FormulaBlock |
| Steps | CalculationSteps |
| Interpretation | InterpretationPanel |
| Table | ResultTable |
| Actions | ResetButton, CopyResultButton |
| Notices | CalculatorNotice |
| Sources | SourceList |
| Related | RelatedCalculatorCard |

## Prohibitions

- No premature universal calculation engine
- No speculative component props
- No unpublished pages that fail contract validation
