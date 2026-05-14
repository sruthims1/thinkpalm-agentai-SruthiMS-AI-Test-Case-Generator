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

---

## Feature Overview

The Fund Transfer feature in ParaBank allows a logged-in user to transfer money between their own bank accounts. The user selects a source account (From) and a destination account (To) from dropdown menus, enters a transfer amount, and submits the form. On success, a confirmation message is displayed. The feature enforces input validation — empty amounts and non-numeric values are rejected before submission. The transfer page is accessible from the left navigation menu after login.

---

## User Roles and Test Credentials

| Role       | Username | Password | Behaviour                              |
|------------|----------|----------|----------------------------------------|
| Demo User  | john     | demo     | Pre-loaded user with multiple accounts |

---

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
| AC8 | Fund transfer fails when the same account is selected for both From and To fields                  |

---

## Test Data

| Field           | Value   |
|-----------------|---------|
| Demo Username   | john    |
| Demo Password   | demo    |
| Transfer Amount | 100.00  |
| Invalid Amount  | abc     |

---

## Out of Scope

- User registration and login flows
- Account overview and balance display
- Bill payment
- Loan requests
- Profile / contact information update
- Admin panel operations
