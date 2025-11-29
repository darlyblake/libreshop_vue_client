import { test, expect } from '@playwright/test';

test.describe('Product Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display trending products', async ({ page }) => {
    const products = page.locator('.product-card');
    await expect(products).toHaveCountGreaterThan(0);
    await expect(products.first()).toBeVisible();
  });

  test('should allow user to click on a product and see details', async ({ page }) => {
    const firstProduct = page.locator('.product-card').first();
    await firstProduct.click();
    await expect(page.locator('.product-detail')).toBeVisible();
  });
});

test.describe('Product Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display trending products', async ({ page }) => {
    const products = page.locator('.product-card');
    await expect(products).toHaveCountGreaterThan(0);
    await expect(products.first()).toBeVisible();
  });

  test('should allow user to click on a product and see details', async ({ page }) => {
    const firstProduct = page.locator('.product-card').first();
    await firstProduct.click();
    await expect(page.locator('.product-detail')).toBeVisible();
  });
});
