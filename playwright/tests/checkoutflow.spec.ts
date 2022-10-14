import { expect, test } from '@playwright/test';

test('checkout flow test', async ({ page }) => {
  // Click on product with id 1

  await page.goto('http://localhost:3000/products/2');
  await page.locator('[data-test-id="cookie-banner"]').click();
  await expect(page).toHaveURL('http://localhost:3000/products/2');

  // Add to cart
  await page
    .locator('button', { hasText: 'ADD TO CART' })
    .click({ clickCount: 2 });
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('2');

  // Go to cart page and check if product is there
  await page.locator('[data-test-id="cart-link"]').click();
  await expect(page).toHaveURL('http://localhost:3000/cart');
  await expect(page.locator('[data-test-id="cart-product-2"]')).toBeVisible;
  await expect(
    page.locator('[data-test-id="cart-product-quantity-2"]'),
  ).toHaveText('2');

  // Click on "checkout"
  await page.locator('button', { hasText: 'CHECKOUT' }).click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');

  // Fill out checkout form
  await page.locator('button', { hasText: 'CONFIRM ORDER' }).click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');
  await page.getByLabel('FIRST NAME').fill('Lisa');
  await page.getByLabel('LAST NAME').fill('Weilguni');
  await page.getByLabel('E-MAIL').fill('lisa@email.com');
  await page.getByLabel('ADDRESS').fill('Seidengasse');
  await page.getByLabel('CITY').fill('Vienna');
  await page.getByLabel('POSTAL CODE').fill('1070');
  await page.getByLabel('COUNTRY').fill('Austria');
  await page.getByLabel('CREDIT CARD NUMBER').fill('12345678912343456');
  await page.getByLabel('EXPIRATION DATE').fill('04 / 23');
  await page.getByLabel('SECURITY CODE').fill('123');

  // Click on "confirm order"
  await page.locator('button', { hasText: 'CONFIRM ORDER' }).click();
  await expect(page).toHaveURL('http://localhost:3000/thankyou');
});
