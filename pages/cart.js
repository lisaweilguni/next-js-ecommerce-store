import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const cartPageStyles = css`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const productOverviewStyles = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
`;

const singleProductStyles = css`
  display: flex;
  flex-direction: row;
  border: 2px solid grey;
  border-radius: 6px;
  padding: 20px;
`;

const singleProductImageStyles = css`
  width: 20%;
`;
const singleProductInfoStyles = css`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 5px;
`;

const removeButtonStyles = css`
  display: flex;
  align-items: center;

  button {
    height: 20px;
  }
`;

const checkoutBoxStyles = css`
  width: 30%;
  height: 200px;
  border: 2px solid grey;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  gap: 20px;
  padding: 30px;

  button {
    width: 40%;
  }
`;

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default function Cart() {
  return (
    <div css={cartPageStyles}>
      <div>
        <Head>
          <title>Cart</title>
          <meta name="cart" content="Overview of your shopping cart" />
        </Head>
      </div>

      <div css={productOverviewStyles}>
        <h1>Shopping Cart</h1>

        <div
          css={singleProductStyles}
          // data-test-id={`cart-product-${product.id}`}
        >
          <div css={singleProductImageStyles}>Image</div>
          <div css={singleProductInfoStyles}>
            <div>Name</div>
            <div css={productPriceStyles}>
              <div>EUR</div>
              <div>Price</div>
            </div>

            <div css={productPriceStyles}>
              <div>Quantity:</div>
              <div
              // data-test-id={`cart-product-quantity-${product.id}`}
              >
                Q
              </div>
            </div>
          </div>
          <div css={removeButtonStyles}>
            <button
            // data-test-id={`cart-product-remove-${product.id}`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div css={checkoutBoxStyles}>
        <div>Total:</div>
        <div data-test-id="cart-total">Price</div>
        <button data-test-id="cart-checkout">CHECKOUT</button>
      </div>
    </div>
  );
}
