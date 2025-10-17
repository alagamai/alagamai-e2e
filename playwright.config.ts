import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-html-report', open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://alagamai-emp.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    bypassCSP: true,
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
  ]
});
