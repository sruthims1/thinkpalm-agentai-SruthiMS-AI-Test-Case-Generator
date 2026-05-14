import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('john', 'demo');
  await page.waitForURL(/overview/);
  await page.context().storageState({ path: AUTH_FILE });
});
