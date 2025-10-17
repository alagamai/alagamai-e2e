import { test, expect } from '@playwright/test';

const baseUrl = 'https://alagamai-emp.vercel.app';

test.beforeEach(async ({ page }) => {
  // Login step with access code
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Employee App Login' })).toBeVisible();
  await page.getByLabel('Access Code').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to employees page and verify
  await expect(page).toHaveURL(/\/employees/);
  await expect(page.locator('h1:has-text("Employee Details")')).toBeVisible({ timeout: 20000 });
});

test('loads employee page and shows table', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Delete All' })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
});

test('age dropdown contains expected options', async ({ page }) => {
  const options = page.getByLabel('Age').locator('option');
  await expect(options).toContainText(['21', '30', '60']);
});

test('deletes an employee row', async ({ page }) => {
  const firstRow = page.getByRole('row').nth(1);
  const rowText = await firstRow.textContent();
  const deleteBtn = firstRow.getByRole('button', { name: /Delete/i });
  await deleteBtn.click();
  await expect(page.getByRole('row', { name: rowText ?? '' })).not.toBeVisible({ timeout: 5000 });
});
