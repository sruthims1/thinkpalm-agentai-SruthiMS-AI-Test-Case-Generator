# Prompt 2: Playwright Script Generation from CSV Test Cases

## Metadata

| Field        | Details                                                                     |
|--------------|-----------------------------------------------------------------------------|
| Tool Used    | Claude (claude-sonnet-4-6)                                                  |
| Purpose      | Convert QMetry CSV test cases into executable Playwright TypeScript scripts |
| Application  | ParaBank Personal Banking Portal — Fund Transfer                            |
| Author       | SRUTHI M S                                                                  |
| Track        | QA/Testing                                                                  |

---

## Prompt (Verbatim)

```
You are a Playwright automation engineer expert in TypeScript.

Convert the QMetry CSV test cases below into Playwright TypeScript scripts.

Architecture:
- Page Object Model (POM) — page class in src/pages/, spec file in src/tests/
- Page class: TransferPage.ts (and LoginPage.ts for global setup)
- Spec file: transfer.spec.ts
- Global setup in src/tests/global.setup.ts — login once, save session to
  playwright/.auth/user.json using page.context().storageState()
- playwright.config.ts — two projects:
    setup    → runs global.setup.ts
    chromium → uses storageState, runs transfer.spec.ts, depends on setup

Locator priority (in order):
  getByRole() → getByLabel() → getByPlaceholder() → getByText()
  → locator('#id') → locator('[name="..."]') — never XPath

Rules:
- No beforeEach/afterEach for login — storage state handles it
- Tests use { page } directly (already logged in via storage state)
- test.describe() name matches Test Suite column; test() name matches Test Case Name
- expect() assertions match Expected Result in CSV

Allure annotations on every test:
  allure.feature(), allure.story(), allure.severity(), allure.tag()
  Severity map: High=critical, Medium=normal, Low=minor
  Tags: CSV Labels + AC ID (e.g. AC1)

Test data constants (top of spec file):
  TRANSFER_AMOUNT='100.00'

CSV Test Cases:
Test Case Name,Test Suite,Description,Precondition,Priority,Status,Test Type,Labels,Step Number,Step Description,Test Data,Expected Result
TC_TRANS_001 - Transfer funds between accounts successfully,Fund Transfer,Verify user can transfer funds between two accounts with a valid amount,User is logged in as john,High,Ready,Manual,"smoke,regression",1,Navigate to the Transfer Funds page via the navigation menu,,Transfer Funds page is displayed with amount and account dropdowns
TC_TRANS_001 - Transfer funds between accounts successfully,Fund Transfer,Verify user can transfer funds between two accounts with a valid amount,User is logged in as john,High,Ready,Manual,"smoke,regression",2,Select From Account and To Account from the dropdowns,From = Account 1; To = Account 2,Both accounts are selected
TC_TRANS_001 - Transfer funds between accounts successfully,Fund Transfer,Verify user can transfer funds between two accounts with a valid amount,User is logged in as john,High,Ready,Manual,"smoke,regression",3,Enter a valid transfer amount,100.00,Amount field is filled
TC_TRANS_001 - Transfer funds between accounts successfully,Fund Transfer,Verify user can transfer funds between two accounts with a valid amount,User is logged in as john,High,Ready,Manual,"smoke,regression",4,Click the Transfer button,,"Transfer Complete!" confirmation is displayed
TC_TRANS_002 - Transfer fails with empty amount,Fund Transfer,Verify fund transfer fails when the amount field is left empty,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",1,Navigate to the Transfer Funds page,,Transfer Funds page is displayed
TC_TRANS_002 - Transfer fails with empty amount,Fund Transfer,Verify fund transfer fails when the amount field is left empty,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",2,Select From and To accounts but leave the Amount field empty,,Amount field is blank
TC_TRANS_002 - Transfer fails with empty amount,Fund Transfer,Verify fund transfer fails when the amount field is left empty,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",3,Click the Transfer button,,Error message is displayed; Transfer Complete message is not shown
TC_TRANS_003 - Transfer page accessible from navigation,Fund Transfer,Verify the Transfer Funds page is accessible from the left navigation menu,User is logged in and on the Accounts Overview page,Medium,Ready,Manual,"smoke,regression",1,Click on the Transfer Funds link in the navigation menu,,Transfer Funds page is loaded
TC_TRANS_003 - Transfer page accessible from navigation,Fund Transfer,Verify the Transfer Funds page is accessible from the left navigation menu,User is logged in and on the Accounts Overview page,Medium,Ready,Manual,"smoke,regression",2,Observe the page URL,,URL contains transfer
TC_TRANS_003 - Transfer page accessible from navigation,Fund Transfer,Verify the Transfer Funds page is accessible from the left navigation menu,User is logged in and on the Accounts Overview page,Medium,Ready,Manual,"smoke,regression",3,Observe the page title,,Page title shows "Transfer Funds"
TC_TRANS_004 - Transfer fails with non-numeric amount,Fund Transfer,Verify fund transfer fails when a non-numeric value is entered as amount,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",1,Navigate to the Transfer Funds page,,Transfer Funds page is displayed
TC_TRANS_004 - Transfer fails with non-numeric amount,Fund Transfer,Verify fund transfer fails when a non-numeric value is entered as amount,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",2,Enter a non-numeric value in the Amount field,abc,Non-numeric text is entered
TC_TRANS_004 - Transfer fails with non-numeric amount,Fund Transfer,Verify fund transfer fails when a non-numeric value is entered as amount,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",3,Click the Transfer button,,Error message is displayed; Transfer Complete message is not shown
TC_TRANS_005 - Transfer confirmation shows amount and account details,Fund Transfer,Verify the transfer confirmation message displays the transferred amount and account numbers,User is logged in as john,High,Ready,Manual,"smoke,regression",1,Navigate to the Transfer Funds page and enter valid transfer details,Amount=100.00,Transfer Funds page is displayed with accounts loaded
TC_TRANS_005 - Transfer confirmation shows amount and account details,Fund Transfer,Verify the transfer confirmation message displays the transferred amount and account numbers,User is logged in as john,High,Ready,Manual,"smoke,regression",2,Click the Transfer button,,Transfer Complete confirmation is displayed
TC_TRANS_005 - Transfer confirmation shows amount and account details,Fund Transfer,Verify the transfer confirmation message displays the transferred amount and account numbers,User is logged in as john,High,Ready,Manual,"smoke,regression",3,Observe the confirmation message text,,Confirmation message contains the transferred amount (100.00) and source account number
TC_TRANS_006 - Transfer fails with zero amount,Fund Transfer,Verify that entering zero as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",1,Navigate to the Transfer Funds page,,Transfer Funds page is displayed
TC_TRANS_006 - Transfer fails with zero amount,Fund Transfer,Verify that entering zero as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",2,Enter 0.00 in the Amount field and select accounts,0.00,Zero amount is entered
TC_TRANS_006 - Transfer fails with zero amount,Fund Transfer,Verify that entering zero as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",3,Click the Transfer button,,Transfer Complete confirmation is not shown; transfer is rejected
TC_TRANS_007 - Transfer fails with negative amount,Fund Transfer,Verify that entering a negative value as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",1,Navigate to the Transfer Funds page,,Transfer Funds page is displayed
TC_TRANS_007 - Transfer fails with negative amount,Fund Transfer,Verify that entering a negative value as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",2,Enter -100 in the Amount field and select accounts,-100,Negative amount is entered
TC_TRANS_007 - Transfer fails with negative amount,Fund Transfer,Verify that entering a negative value as the transfer amount does not complete the transfer,User is logged in and on the Transfer Funds page,Medium,Ready,Manual,"negative,edge",3,Click the Transfer button,,Transfer Complete confirmation is not shown; transfer is rejected
TC_TRANS_008 - Transfer fails when same account selected for From and To,Fund Transfer,Verify that fund transfer fails when the same account is selected for both From and To fields,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",1,Navigate to the Transfer Funds page,,Transfer Funds page is displayed with account dropdowns
TC_TRANS_008 - Transfer fails when same account selected for From and To,Fund Transfer,Verify that fund transfer fails when the same account is selected for both From and To fields,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",2,Select the same account in both From and To dropdowns and enter a valid amount,Amount=100.00; From=Account 1; To=Account 1,Same account selected for both fields
TC_TRANS_008 - Transfer fails when same account selected for From and To,Fund Transfer,Verify that fund transfer fails when the same account is selected for both From and To fields,User is logged in and on the Transfer Funds page,High,Ready,Manual,"negative,regression",3,Click the Transfer button,,Transfer Complete confirmation is not shown; transfer is rejected
```

---

## Output

The output of this prompt is saved at:
- `src/tests/global.setup.ts`
- `playwright.config.ts`
- `playwright/.auth/user.json` ← auto-generated at runtime by global.setup.ts
- `src/pages/LoginPage.ts`
- `src/pages/TransferPage.ts`
- `src/tests/transfer.spec.ts`

---

## Observations

- global.setup.ts logs in once and saves the browser session to playwright/.auth/user.json; transfer tests reuse this file — no per-test login
- playwright.config.ts uses two projects: setup (runs global.setup.ts) and chromium (loads storageState, runs transfer.spec.ts)
- transfer.spec.ts uses plain { page } — the page context is already authenticated via storage state
- Selectors follow Playwright's recommended priority; ParaBank's transfer dropdowns use #fromAccountId / #toAccountId (no label associations), so locator('#id') is the correct fallback
- TC_TRANS_003 navigates to overview.htm first so the nav menu is visible before clicking Transfer Funds
- Allure AC tags (AC1–AC8) are applied on every test matching the traceability matrix

