import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { TransferPage } from '../pages/TransferPage';

const TRANSFER_AMOUNT = '100.00';

test.describe('Fund Transfer', () => {

  test('TC_TRANS_001 - Transfer funds between accounts successfully', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_001 - Transfer funds between accounts successfully');
    allure.severity('critical');
    allure.tag('smoke');
    allure.tag('regression');
    allure.tag('AC1');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.transferFunds(TRANSFER_AMOUNT);

    await expect(page.locator('#showResult')).toBeVisible();
    await expect(page.locator('#showResult')).toContainText('Transfer Complete');
  });

  test('TC_TRANS_002 - Transfer fails with empty amount', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_002 - Transfer fails with empty amount');
    allure.severity('critical');
    allure.tag('negative');
    allure.tag('regression');
    allure.tag('AC2');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.waitForAccountsToLoad();

    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).not.toBeVisible();
    await expect(page.locator('[id="amount.errors"]').first()).not.toBeEmpty();
  });

  test('TC_TRANS_003 - Transfer page accessible from navigation', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_003 - Transfer page accessible from navigation');
    allure.severity('normal');
    allure.tag('smoke');
    allure.tag('regression');
    allure.tag('AC3');

    await page.goto('overview.htm');
    await page.getByText('Transfer Funds').click();

    await expect(page).toHaveURL(/transfer/);
    await expect(page.locator('.title').first()).toContainText('Transfer Funds');
  });

  test('TC_TRANS_004 - Transfer fails with non-numeric amount', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_004 - Transfer fails with non-numeric amount');
    allure.severity('normal');
    allure.tag('negative');
    allure.tag('edge');
    allure.tag('AC4');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.waitForAccountsToLoad();

    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#amount').fill('abc');
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).not.toBeVisible();
    await expect(page.locator('[id="amount.errors"]').first()).not.toBeEmpty();
  });

  test('TC_TRANS_005 - Transfer confirmation shows amount and account details', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_005 - Transfer confirmation shows amount and account details');
    allure.severity('critical');
    allure.tag('smoke');
    allure.tag('regression');
    allure.tag('AC5');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.transferFunds(TRANSFER_AMOUNT);

    await expect(page.locator('#showResult')).toContainText(TRANSFER_AMOUNT);
    await expect(page.locator('#showResult')).toContainText(/\d{4,}/);
  });

  test('TC_TRANS_006 - Transfer fails with zero amount', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_006 - Transfer fails with zero amount');
    allure.severity('normal');
    allure.tag('negative');
    allure.tag('edge');
    allure.tag('AC6');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.waitForAccountsToLoad();

    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#amount').fill('0');
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).not.toBeVisible();
  });

  test('TC_TRANS_007 - Transfer fails with negative amount', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_007 - Transfer fails with negative amount');
    allure.severity('normal');
    allure.tag('negative');
    allure.tag('edge');
    allure.tag('AC7');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.waitForAccountsToLoad();

    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#amount').fill('-100');
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).not.toBeVisible();
  });

  test('TC_TRANS_008 - Transfer fails when same account selected for From and To', async ({ page }) => {
    allure.feature('Fund Transfer');
    allure.story('TC_TRANS_008 - Transfer fails when same account selected for From and To');
    allure.severity('critical');
    allure.tag('negative');
    allure.tag('regression');
    allure.tag('AC8');

    const transferPage = new TransferPage(page);
    await transferPage.navigate();
    await transferPage.waitForAccountsToLoad();

    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#toAccountId').selectOption({ index: 0 });
    await page.locator('#amount').fill(TRANSFER_AMOUNT);
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).not.toBeVisible();
  });

});
