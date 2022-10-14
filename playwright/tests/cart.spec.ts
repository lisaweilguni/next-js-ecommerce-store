import { expect, test } from '@playwright/test';

test('cart test', async ({ page }) => {
  // Go to homepage and check for h1

  await page.goto('http://localhost:3000/');
  await page.locator('[data-test-id="cookie-banner"]').click();
  await expect(page.locator('h1')).toHaveText('Vintage Road  Bicycles');

  // Click on "View Bicycles" to go to products page
  await page.locator('a:has-text("View Bicycles")').click();
  await expect(page).toHaveURL('http://localhost:3000/products');
  await expect(page.locator('h1')).toHaveText('Bicycles');

  // Check if all 6 products are there
  const productNames = [
    'Mercier',
    'Colnago',
    'Chesini',
    'Rosa',
    'Bianchi',
    'Olympia',
  ];

  await expect(page.locator('[data-test-id^="product-"]')).toHaveCount(6);
  await expect(page.locator('[data-test-id^="product-"]')).toHaveText(
    productNames,
  );

  // Click on product with id 1
  await page.locator('[data-test-id="product-1"]').click();
  await expect(page).toHaveURL('http://localhost:3000/products/1');

  // Add to cart and change quantity
  await page
    .locator('button', { hasText: 'ADD TO CART' })
    .click({ clickCount: 1 });
  await expect(page.locator('[data-test-id="product-count"]')).toHaveText('1');
  await page.locator('[data-test-id="product-count"]').click({ clickCount: 2 });
  await page.locator('button', { hasText: 'ADD TO CART' }).click();
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('3');

  // Go to cart page and check if product is there
  await page.locator('[data-test-id="cart-link"]').click();
  await expect(page).toHaveURL('http://localhost:3000/cart');
  await expect(page.locator('[data-test-id="cart-product-1"]')).toBeVisible;
  await expect(
    page.locator('[data-test-id="cart-product-quantity-1"]'),
  ).toHaveText('3');

  // Remove from cart
  await page.locator('[data-test-id="cart-product-remove-1"]').click();
  await expect(page.locator('[data-test-id="cart-product-1"]')).not.toBeVisible;
});
