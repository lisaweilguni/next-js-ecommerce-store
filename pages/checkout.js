import { css } from '@emotion/react';
import Head from 'next/head';
import { getProducts } from '../database/products';

const checkoutPageStyles = css`
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding: 20px 100px;
  margin-left: 10px;
`;

const h1Styles = css`
  margin-bottom: 0;
`;

const userDataFormStyles = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

const inputFieldsRowStyles = css`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

const longFieldStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 0;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: transparent;
    width: 494px;
  }

  label {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  input::placeholder {
    letter-spacing: 2px;
  }

  input:hover {
    transition: all 300ms ease;
    border: 1px solid #4c4a52;
  }
`;

const shortFieldStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 0;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: transparent;
    width: 150%;
  }

  label {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  input::placeholder {
    letter-spacing: 2px;
  }

  input:hover {
    transition: all 300ms ease;
    border: 1px solid #4c4a52;
  }
`;

const paymentInfoStyles = css`
  margin-top: 50px;
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
  border: 0.18em solid #000000;
  border-radius: 4px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  width: 494px;
  background-color: #000000;
  color: white;

  &:hover {
    background-color: #e7612e;
    border: 0.18em solid #e7612e;
    color: white;
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
  // Prevent page refresh
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/thankyou';
    props.setCart([]);
  };

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
        <h1 css={h1Styles}>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>
          <div css={inputFieldsRowStyles}>
            <div css={shortFieldStyles}>
              <label htmlFor="first-name">First name</label>
              <input
                id="first-name"
                data-test-id="checkout-first-name"
                required
              />
            </div>
            <div css={shortFieldStyles}>
              <label htmlFor="last-name">Last name</label>
              <input
                id="last-name"
                data-test-id="checkout-last-name"
                required
              />
            </div>
          </div>
          <div css={longFieldStyles}>
            <label htmlFor="email">E-mail</label>
            <input id="email" data-test-id="checkout-email" required />
          </div>
          <div css={longFieldStyles}>
            <label htmlFor="address">Address</label>
            <input id="address" data-test-id="checkout-address" required />
          </div>
          <div css={inputFieldsRowStyles}>
            <div css={shortFieldStyles}>
              <label htmlFor="city">City</label>
              <input id="city" data-test-id="checkout-city" required />
            </div>
            <div css={shortFieldStyles}>
              <label htmlFor="postal-code">Postal code</label>
              <input
                id="postal-code"
                data-test-id="checkout-postal-code"
                required
              />
            </div>
          </div>
          <div css={longFieldStyles}>
            <label htmlFor="country">Country</label>
            <input id="country" data-test-id="checkout-country" required />
          </div>
          <div css={paymentInfoStyles}>
            <h2>Payment Information</h2>
            <div css={longFieldStyles}>
              <label htmlFor="credit-card-number">Credit card number</label>
              <input
                id="credit-card-number"
                data-test-id="checkout-credit-card"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div css={inputFieldsRowStyles}>
              <div css={shortFieldStyles}>
                <label htmlFor="expiration-date">Expiration date</label>
                <input
                  id="expiration-date"
                  data-test-id="checkout-expiration-date"
                  placeholder="MM / YY"
                  required
                />
              </div>
              <div css={shortFieldStyles}>
                <label htmlFor="security-code">Security Code</label>
                <input
                  id="security-code"
                  data-test-id="checkout-security-code"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
          </div>

          <button
            data-test-id="checkout-confirm-order"
            css={checkoutProductButtonStyles}
          >
            CONFIRM ORDER
          </button>
        </form>
      </div>

      <div css={checkoutBoxStyles}>
        <h2>Summary</h2>
        <div css={productSumStyles}>
          <div>Subtotal</div>
          <div>{!props.cart?.length ? 0 : cartTotalPrice}</div>
        </div>
        <div css={productSumStyles}>
          <div>Shipping</div>
          <div>{!props.cart?.length ? 0 : 29.99}</div>
        </div>
        <div css={productSumTotalStyles}>
          <div>Total</div>
          <div>{!props.cart?.length ? 0 : cartTotalPrice + 29.99}</div>
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
