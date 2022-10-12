// Test functions for adding and removing info from cookie

import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';
import { updateQuantity } from '../updateQuantity';

test('set, get and delete a cookie', () => {
  const cookie = {
    key: 'cart',
    value: [{ id: '1', quantity: 2 }],
  };

  expect(getParsedCookie(cookie.key)).toBe(undefined);
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});

// Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists)

test('updating quantity in item of cookie', () => {
  deleteCookie('testCart');
  expect(getParsedCookie('testCart')).toBeUndefined();
  expect(updateQuantity(1, 3));
  expect(getParsedCookie('testCart')).toStrictEqual([{ id: 1, quantity: 3 }]);

  // clear state
  expect(deleteCookie('testCookie')).toBe(undefined);
  expect(getParsedCookie('testCookie')).toBe(undefined);
});
