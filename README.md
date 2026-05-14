# AI Test Case Generator — Fund Transfer Automation (ParaBank)

| Field | Details |
|-------|---------|
| **Name** | SRUTHI M S |
| **Track** | QA/Testing |
| **Lab** | Lab 3 — AI Test Case Generator |
| **AI Tool** | Claude (claude-sonnet-4-6) |

---

## What It Does

This lab demonstrates using AI to generate test cases and Playwright automation scripts for the **Fund Transfer** feature of the ParaBank Personal Banking Portal.

The workflow:
1. A feature description with 8 Acceptance Criteria was written for the Fund Transfer flow.
2. Claude generated structured test cases in QMetry-compatible CSV format from those Acceptance Criteria.
3. Claude converted the CSV test cases into working Playwright TypeScript scripts using the Page Object Model.
4. Tests use a login-once strategy (storage state) — the session is saved after the first login and reused by all tests.
5. Results are reported via an Allure HTML report with full AC traceability.

| Coverage | Count |
|----------|-------|
| Feature | Fund Transfer |
| Acceptance Criteria | 8 (AC1–AC8) |
| Total Playwright tests | 8 |
| Test types | 3 Positive, 2 Negative, 3 Edge |

---

## Project Structure

```
AI-Test-Case-Generator/
├── src/
│   ├── tests/
│   │   ├── global.setup.ts    ← Login once, saves session to playwright/.auth/
│   │   └── transfer.spec.ts   ← 8 Fund Transfer tests
│   ├── pages/
│   │   ├── LoginPage.ts       ← Login POM (used by global setup)
│   │   └── TransferPage.ts    ← Fund Transfer POM
│   └── test-cases/
│       └── test-cases.csv     ← QMetry-ready CSV test cases (8 cases)
├── playwright/
│   └── .auth/
│       └── user.json          ← Auto-generated session file (login once)
├── screenshots/               ← Execution screenshots
├── allure-results/            ← Auto-generated after test run
├── allure-report/             ← Auto-generated after allure generate
├── playwright.config.ts       ← Two projects: setup, chromium
├── package.json
├── tsconfig.json
├── feature-description.md     ← Fund Transfer feature with AC1–AC8
├── prompt1-csv-generation.md  ← Verbatim Prompt 1 (CSV generation)
├── prompt2-playwright-generation.md ← Verbatim Prompt 2 (script generation)
├── traceability-matrix.md     ← AC → Test Case → Script → Allure
└── README.md
```

---

## How to Run

### Prerequisites
- Node.js v18 or higher

### Step 1 — Install Dependencies
```powershell
npm install
npx playwright install chromium
```

### Step 2 — Run All Tests
```powershell
npm test
```

> **How authentication works:** `npm test` runs the `setup` project first — it logs in once and saves the browser session to `playwright/.auth/user.json`. The `chromium` project then reuses that saved session to run all Fund Transfer tests without logging in again.

### Step 3 — Generate and Open Allure Report
```powershell
npm run allure:generate
npm run allure:open
```

### Step 4 — Run Tests + Open Allure in One Command
```powershell
npm run test:report
```

---

## Test Summary

| Test Case | Type | AC | Expected Outcome |
|-----------|------|----|-----------------|
| TC_TRANS_001 - Transfer funds between accounts successfully | Positive | AC1 | "Transfer Complete!" confirmation displayed |
| TC_TRANS_002 - Transfer fails with empty amount | Negative | AC2 | Transfer Complete message not shown |
| TC_TRANS_003 - Transfer page accessible from navigation | Positive | AC3 | URL contains /transfer, title shows "Transfer Funds" |
| TC_TRANS_004 - Transfer fails with non-numeric amount | Edge | AC4 | Transfer Complete message not shown |
| TC_TRANS_005 - Transfer confirmation shows amount and account details | Positive | AC5 | Confirmation text contains transferred amount and account number |
| TC_TRANS_006 - Transfer fails with zero amount | Edge | AC6 | Transfer Complete message not shown |
| TC_TRANS_007 - Transfer fails with negative amount | Edge | AC7 | Transfer Complete message not shown |
| TC_TRANS_008 - Transfer fails when same account selected for From and To | Negative | AC8 | Transfer Complete message not shown |

> **Note — AC6 / AC7 (Zero and Negative amounts):** The ParaBank demo server may process 0.00 and negative values as valid transfers. TC_TRANS_006 and TC_TRANS_007 are valid test designs and should be enabled against a properly configured instance with server-side amount validation.

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Claude (claude-sonnet-4-6) | AI test case and script generation |
| Playwright | Test automation framework |
| TypeScript | Language |
| Allure Playwright | Test reporting |
| QMetry | Test management (CSV import) |

---

## Observations

1. **Single feature focus** — Focusing on one critical flow (Fund Transfer) makes the AI prompt clearer, the test cases more targeted, and the traceability easier to follow end-to-end.

2. **Selector strategy** — Locators follow Playwright's recommended priority: `getByRole()` for buttons and links, then `locator('#id')` for ParaBank's transfer dropdowns (`#fromAccountId`, `#toAccountId`, `#amount`) which have no label associations.

3. **Storage state over per-test login** — Logging in once via `global.setup.ts` and reusing the saved session (`playwright/.auth/user.json`) is faster and more reliable than repeating login in every test.

4. **Prompt specificity** — Specifying exact CSV column headers, locator priority, Allure annotation format, and project architecture in the prompt produced scripts that ran without manual fixes.

5. **Traceability** — A 1:1 mapping of AC → Test Case → Allure tag ensures complete bidirectional traceability from requirement to execution result. AC IDs (AC1–AC8) are visible in the Allure report detail panel.

---

## AI Productivity Learnings

Using AI to generate test cases and automation scripts cut down the time spent on boilerplate significantly — what would have taken hours of manual scripting was reduced to prompt refinement and targeted fixes. The most valuable insight was that **prompt quality directly determines output quality**: vague prompts required heavy rework, while structured prompts with explicit rules, column headers, and architecture details produced near-ready output. AI also helped identify coverage gaps (missing edge cases, weak assertions) that might have been overlooked in a manual review. The human role shifted from writing code to **reviewing, validating, and iterating** — a faster and more focused workflow overall.
