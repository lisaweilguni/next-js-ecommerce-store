import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../database/products';

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
  height: 300px;
  border-radius: 15px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  gap: 20px;
  padding: 30px;
`;

const checkoutProductButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid grey;
  border-radius: 4px;
  background-color: grey;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
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

const productSumStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`;

const productSumTotalStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  border-top: 1px solid grey;
  padding-top: 15px;
`;

export default function Checkout(props) {
  const cartWithNameAndPrice = props.cart?.map((cart) => {
    return {
      ...cart,
      name: props.products.find((productObject) => cart.id === productObject.id)
        ?.name,
      price: props.products.find(
        (productObject) => cart.id === productObject.id,
      )?.price,
    };
  });

  const cartTotalPrice = cartWithNameAndPrice?.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );

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
        <h2>Summary</h2>
        <div css={productSumStyles}>
          <div>Subtotal</div>
          <div>{cartTotalPrice}</div>
        </div>
        <div css={productSumStyles}>
          <div>Shipping</div>
          <div>29.99</div>
        </div>
        <div css={productSumTotalStyles}>
          <div>Total</div>
          <div>{cartTotalPrice + 29.99}</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();

  return {
    props: {
      products: products,
    },
  };
}
