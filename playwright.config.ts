import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60000,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', suiteTitle: true }],
  ],

  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    // Step 1: login once and save session to file
    {
      name: 'setup',
      testMatch: '**/global.setup.ts',
    },

    // Step 2: run Fund Transfer tests with saved session (login skipped)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testMatch: '**/transfer.spec.ts',
      dependencies: ['setup'],
    },
  ],
});
