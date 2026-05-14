# Prompt 1: Test Case Generation in QMetry CSV Format

## Metadata

| Field        | Details                                                        |
|--------------|----------------------------------------------------------------|
| Tool Used    | Claude (claude-sonnet-4-6)                                     |
| Purpose      | Generate QMetry-ready CSV test cases from feature description  |
| Application  | ParaBank Personal Banking Portal — Fund Transfer               |
| Author       | SRUTHI M S                                                     |
| Track        | QA/Testing                                                     |

---

## Prompt (Verbatim)

```
You are a QA test analyst with expertise in writing structured test cases
for test management tools.

Based on the feature description provided below, generate test cases in
CSV format that are ready to import into QMetry Test Management.

Use EXACTLY these column headers (in this order):
Test Case Name, Test Suite, Description, Precondition, Priority, Status,
Test Type, Labels, Step Number, Step Description, Test Data, Expected Result

Rules:
1. Generate test cases covering:
   - Positive test cases (happy path flows)
   - Negative test cases (invalid input, empty fields)
   - Edge cases (boundary values, non-numeric input)
2. Test Suite name must be: Fund Transfer
3. Priority values must be: High, Medium, or Low
4. Status must be: Ready
5. Test Type must be: Manual
6. Labels must be comma-separated tags (e.g., smoke, regression, negative)
7. Each test case must have at least 3 steps
8. Each row in the CSV represents ONE STEP; repeat Test Case Name for multi-step tests
9. Use double quotes around fields that contain commas
10. Do not add extra columns or change column names

Feature Description:
# Feature Description: Fund Transfer — ParaBank Personal Banking Portal

## Application Details

| Field            | Details                                    |
|------------------|--------------------------------------------|
| Application Name | ParaBank Personal Banking Portal           |
| Application URL  | https://parabank.parasoft.com/parabank     |
| Version          | 1.0                                        |
| Prepared By      | SRUTHI M S                                 |
| Track            | QA/Testing                                 |
| Tool Used for AI | Claude (claude-sonnet-4-6)                 |

## Feature Overview

The Fund Transfer feature in ParaBank allows a logged-in user to transfer money between their own
bank accounts. The user selects a source account (From) and a destination account (To) from dropdown
menus, enters a transfer amount, and submits the form. On success, a confirmation message is displayed.
The feature enforces input validation — empty amounts and non-numeric values are rejected before
submission. The transfer page is accessible from the left navigation menu after login.

## User Roles and Test Credentials

| Role       | Username | Password | Behaviour                              |
|------------|----------|----------|----------------------------------------|
| Demo User  | john     | demo     | Pre-loaded user with multiple accounts |

## Acceptance Criteria

| ID   | Acceptance Criterion                                                                              |
|------|---------------------------------------------------------------------------------------------------|
| AC1 | A user can successfully transfer funds between two of their available accounts with a valid amount |
| AC2 | Fund transfer fails with a validation error when the amount field is left empty                   |
| AC3 | Fund transfer page is accessible from the navigation menu after login                             |
| AC4 | Fund transfer with a non-numeric amount value shows a validation error                            |
| AC5 | The transfer confirmation message displays the transferred amount and the involved account numbers |
| AC6 | Fund transfer with a zero amount (0.00) does not complete successfully                            |
| AC7 | Fund transfer with a negative amount (e.g. -100) does not complete successfully                   |
| AC8 | Fund transfer fails when the same account is selected for both From and To fields                 |

## Test Data

| Field              | Value   |
|--------------------|---------|
| Demo Username      | john    |
| Demo Password      | demo    |
| Transfer Amount    | 100.00  |
| Invalid Amount     | abc     |
| Zero Amount        | 0       |
| Negative Amount    | -100    |

## Out of Scope

- User registration and login flows
- Account overview and balance display
- Bill payment
- Loan requests
- Profile / contact information update
- Admin panel operations

Test Data Available:
- Demo credentials: john / demo
- Transfer amount: 100.00
- Invalid (non-numeric) amount: abc
- App URL: https://parabank.parasoft.com/parabank
```

---

## Output

The output of this prompt is saved at:
`src/test-cases/test-cases.csv`

---

## Observations

- Claude generated 8 test cases covering all 8 Acceptance Criteria (AC1–AC8)
- Positive, negative, and edge cases are each represented
- Multi-step CSV rows were correctly structured for QMetry step-level import
- Negative tests cover empty amount, non-numeric input, and same-account selection
- Edge cases include zero amount (0) and negative amount (-100)
- Test data (100.00 valid, abc invalid, 0 zero, -100 negative) was correctly applied to the relevant steps
