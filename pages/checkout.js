import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../database/products';

const checkoutPageStyles = css`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const userDataFormStyles = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
`;

const checkoutBoxStyles = css`
  width: 30%;
  height: 200px;
  border-radius: 15px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  gap: 20px;
  padding: 30px;

  button {
    width: 40%;
  }
`;

const checkoutProductButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid grey;
  border-radius: 4px;
  background-color: grey;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  color: white;
  text-align: center;

  &:hover {
    background-color: white;
    border: 0.18em solid grey;
    color: grey;
  }
`;

export default function Checkout() {
  return (
    <div css={checkoutPageStyles}>
      <div>
        <Head>
          <title>Checkout</title>
          <meta name="checkout" content="Checkout" />
        </Head>
      </div>

      <div css={userDataFormStyles}>
        <h1>Checkout</h1>
        <form>
          <h2>Shipping</h2>
          <h2>Payment</h2>
        </form>
        <Link href="/thankyou">
          <a
            data-test-id="checkout-confirm-order"
            href="/checkout"
            css={checkoutProductButtonStyles}
          >
            CONFIRM ORDER
          </a>
        </Link>
      </div>

      <div css={checkoutBoxStyles}>
        <div>Total:</div>
        <div>Price</div>
      </div>
    </div>
  );
}
