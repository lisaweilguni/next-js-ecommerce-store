import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
  cursor: pointer;

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
          <label htmlFor="first-name">First name</label>
          <input id="first-name" data-test-id="checkout-first-name" required />
          <label htmlFor="last-name">Last name</label>
          <input id="last-name" data-test-id="checkout-last-name" required />
          <label htmlFor="email">E-mail</label>
          <input id="email" data-test-id="checkout-email" required />
          <label htmlFor="address">Address</label>
          <input id="address" data-test-id="checkout-address" required />
          <label htmlFor="city">City</label>
          <input id="city" data-test-id="checkout-city" required />
          <label htmlFor="postal-code">Postal code</label>
          <input
            id="postal-code"
            data-test-id="checkout-postal-code"
            required
          />
          <label htmlFor="country">Country</label>
          <input id="country" data-test-id="checkout-country" required />

          <h2>Payment</h2>
          <label htmlFor="credit-card-number">Credit card number</label>
          <input
            id="credit-card-number"
            data-test-id="checkout-credit-card"
            required
          />
          <label htmlFor="expiration-date">Expiration date</label>
          <input
            id="expiration-date"
            data-test-id="checkout-expiration-date"
            required
          />
          <label htmlFor="security-code">Security Code</label>
          <input
            id="security-code"
            data-test-id="checkout-security-code"
            required
          />
        </form>
        <Link href="/thankyou">
          <a
            data-test-id="checkout-confirm-order"
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
