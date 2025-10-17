import { test, expect } from '@playwright/test';

const baseUrl = 'https://alagamai-emp.vercel.app';

test('login accepts correct code and navigates to employees', async ({ page }) => {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Employee App Login' })).toBeVisible();

  await page.getByLabel('Access Code').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/employees/);
  await expect(page.getByRole('heading', { name: 'Employee Details' })).toBeVisible();
});
