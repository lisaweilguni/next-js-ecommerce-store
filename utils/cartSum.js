export function cartSum(cart) {
  const cartTotalPrice = cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );
  return cartTotalPrice;
}
