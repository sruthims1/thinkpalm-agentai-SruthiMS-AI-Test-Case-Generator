# Requirements Traceability Matrix

## Document Details

| Field         | Details                                      |
|---------------|----------------------------------------------|
| Project       | ParaBank Personal Banking Portal             |
| Feature       | Fund Transfer                                |
| Prepared By   | SRUTHI M S                                   |
| Track         | QA/Testing                                   |
| Tool Used     | Claude (claude-sonnet-4-6)                   |
| Total ACs     | 8 (AC1–AC8)                                |
| Total Tests   | 8                                            |
| Coverage      | 100% (all 8 ACs covered)                     |

---

## Coverage Summary

| Suite         | Tests | ACs Covered                        | Positive | Negative | Edge |
|---------------|-------|------------------------------------|----------|----------|------|
| Fund Transfer | 8     | AC1, AC2, AC3, AC4, AC5, AC6, AC7, AC8 | 3   | 2        | 3    |
| **Total**     | **8** | **8 ACs**                               | **3**    | **2**    | **3**|

---

## Full Traceability Table

| AC ID | Acceptance Criterion                                                   | Test Case ID | Playwright Test Name                                               | Spec File        | Test Type | Allure Tag | Status |
|-------|------------------------------------------------------------------------|--------------|---------------------------------------------------------------------|------------------|-----------|------------|--------|
| AC1  | Valid transfer shows Transfer Complete                                 | TC_TRANS_001 | TC_TRANS_001 - Transfer funds between accounts successfully         | transfer.spec.ts | Positive  | AC1       | PASSED |
| AC2  | Empty amount blocks transfer                                           | TC_TRANS_002 | TC_TRANS_002 - Transfer fails with empty amount                     | transfer.spec.ts | Negative  | AC2       | PASSED |
| AC3  | Transfer Funds page accessible from nav                                | TC_TRANS_003 | TC_TRANS_003 - Transfer page accessible from navigation             | transfer.spec.ts | Positive  | AC3       | PASSED |
| AC4  | Non-numeric amount shows error                                         | TC_TRANS_004 | TC_TRANS_004 - Transfer fails with non-numeric amount               | transfer.spec.ts | Edge      | AC4       | PASSED |
| AC5  | Confirmation message shows transferred amount and account numbers      | TC_TRANS_005 | TC_TRANS_005 - Transfer confirmation shows amount and account details | transfer.spec.ts | Positive  | AC5       | PASSED |
| AC6  | Zero amount (0.00) does not complete transfer                          | TC_TRANS_006 | TC_TRANS_006 - Transfer fails with zero amount                      | transfer.spec.ts | Edge      | AC6       | NOTE   |
| AC7  | Negative amount does not complete transfer                             | TC_TRANS_007 | TC_TRANS_007 - Transfer fails with negative amount                  | transfer.spec.ts | Edge      | AC7       | NOTE   |
| AC8  | Same From and To account does not complete transfer                    | TC_TRANS_008 | TC_TRANS_008 - Transfer fails when same account selected for From and To | transfer.spec.ts | Negative  | AC8       | PASSED |

---

## Gap Analysis

| Finding           | Detail                                                                 |
|-------------------|------------------------------------------------------------------------|
| Uncovered ACs     | None — all 8 Fund Transfer ACs are covered                             |
| AC6 / AC7 note  | ParaBank demo server may process 0.00 and negative amounts as valid transfers. TC_TRANS_006 and TC_TRANS_007 are valid test designs; results may vary on demo vs. a properly configured instance. |
| Out of scope      | Authentication, Account Overview, Bill Payment excluded per feature scope |

---

## Traceability in Allure Report

Each Playwright test has its AC ID embedded as an Allure tag (e.g., `AC1`).
In the Allure report, open any test detail panel to see the AC tag alongside severity and suite.

```
Allure → Suites → Fund Transfer → TC_TRANS_001  →  Tags: AC1, smoke, regression
Allure → Suites → Fund Transfer → TC_TRANS_004  →  Tags: AC4, negative, edge
```
