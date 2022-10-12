// Test cart sum function

import { cartSum } from '../cartSum';

test('calculate total price', () => {
  const testCart = [
    { id: 1, name: 'Mercier', price: 5, quantity: 1 },
    { id: 2, name: 'Rosa', price: 10, quantity: 2 },
    { id: 2, name: 'Colnago', price: 10, quantity: 3 },
  ];
  expect(cartSum(testCart)).toBe(55);
  expect(cartSum(testCart)).not.toBe(50);
});
