import { getParsedCookie, setStringifiedCookie } from './cookies';

export function updateQuantity(id, quantity) {
  const cookie = getParsedCookie('testCart');

  if (!cookie) {
    setStringifiedCookie('testCart', [
      {
        id: id,
        quantity: quantity,
      },
    ]);
    return;
  }

  const foundCookie = cookie.find(
    (cookieProductObject) => cookieProductObject.id === id,
  );

  if (!foundCookie) {
    cookie.push({
      id: id,
      quantity: quantity,
    });
  } else {
    foundCookie.quantity++;
  }

  setStringifiedCookie('testCart', cookie);
}
