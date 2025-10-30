import { expect, test } from '@playwright/test';

test('landing page renders hero content and toggles mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /about genauxi/i })).toBeVisible();

  const toggleButton = page.getByRole('button', { name: /open navigation menu/i });
  await expect(toggleButton).toBeVisible();

  const mobileMenu = page.getByLabel('Mobile navigation');
  await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

  await toggleButton.click();
  await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
  await expect(page.getByRole('link', { name: 'Pricing', exact: true })).toBeVisible();

  await toggleButton.click();
  await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
});
