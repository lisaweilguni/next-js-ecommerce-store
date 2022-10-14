import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../database/products';

const cartPageStyles = css`
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding: 120px 100px;
  margin-left: 10px;
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
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  gap: 30px;
`;

const singleProductImageStyles = css`
  width: 20%;
`;

const singleProductInfoStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  gap: 10px;
  padding: 10px;
`;

const removeButtonStyles = css`
  display: flex;
  align-items: center;
  height: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const checkoutBoxStyles = css`
  width: 30%;
  height: 340px;
  border-radius: 15px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  gap: 20px;
  padding: 30px;
`;

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  text-align: center;
`;

const checkoutButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid #000000;
  border-radius: 4px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 15px;
  background-color: #000000;
  color: white;

  &:hover {
    background-color: #e7612e;
    border: 0.18em solid #e7612e;
    color: white;
  }
`;

const plusMinusSectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
  height: 30px;
  border: 1px solid black;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px 15px;
  width: 106px;

  button {
    width: 90%;
    height: 90%;
    border: none;
    text-align: center;
    justify-content: center;
    margin-bottom: 18px;
    font-size: 16px;
    cursor: pointer;
    padding: 0;

    &:hover {
    }
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

export default function Cart(props) {
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

  function removeProduct(id) {
    const newCart = props.cart?.filter((item) => item.id !== id);
    props.setCart(newCart);
  }

  return (
    <div css={cartPageStyles}>
      <div>
        <Head>
          <title>Cart</title>
          <meta
            name="cart"
            content="Overview of your shopping cart. Displaying all products in your cart and the total price"
          />
        </Head>
      </div>
      <div css={productOverviewStyles}>
        <h1>Your Cart</h1>
        {!props.cart?.length ? (
          <div>Your cart is empty</div>
        ) : (
          cartWithNameAndPrice.map((product) => {
            return (
              <div
                key={`product-${product.id}`}
                css={singleProductStyles}
                data-test-id={`cart-product-${product.id}`}
              >
                <div css={singleProductImageStyles}>
                  <Link href={`/products/${product.id}`}>
                    <a data-test-id={`product-${product.id}`}>
                      <Image
                        src={`/${
                          product.id
                        }-${product.name.toLowerCase()}.jpeg`}
                        alt={`Vintage Road Bicycle ${product.name}`}
                        width="181.25"
                        height="122.5"
                      />
                    </a>
                  </Link>
                </div>
                <div css={singleProductInfoStyles}>
                  <div>{product.name}</div>

                  <div css={productPriceStyles}>
                    <div>EUR</div>
                    <div>{product.price}</div>
                  </div>
                  <div css={plusMinusSectionStyles}>
                    <button
                      data-test-id="product-quantity-minus"
                      onClick={() => {
                        const foundCookie = props.cart?.find(
                          (cookieProductObject) =>
                            cookieProductObject.id === product.id,
                        );

                        if (!foundCookie) {
                          props.cart.push({
                            id: props.product.id,

                            quantity: -1,
                          });
                        } else if (foundCookie.quantity > 1) {
                          foundCookie.quantity--;
                        }

                        const newQuantity = [...props.cart];
                        props.setCart(newQuantity);
                      }}
                    >
                      {' '}
                      -{' '}
                    </button>

                    <div data-test-id={`cart-product-quantity-${product.id}`}>
                      {product.quantity}
                    </div>

                    <button
                      data-test-id="product-quantity-plus"
                      onClick={() => {
                        const foundCookie = props.cart?.find(
                          (cookieProductObject) =>
                            cookieProductObject.id === product.id,
                        );

                        if (!foundCookie) {
                          props.cart.push({
                            id: props.product.id,
                            quantity: 1,
                          });
                        } else {
                          foundCookie.quantity++;
                        }

                        const newQuantity = [...props.cart];
                        props.setCart(newQuantity);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      css={removeButtonStyles}
                      onClick={() => removeProduct(product.id)}
                      data-test-id={`cart-product-remove-${product.id}`}
                      aria-label="Remove"
                    >
                      <Image src="/remove.png" alt="" width="25" height="25" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div css={checkoutBoxStyles}>
        <h2>Summary</h2>
        <div css={productSumStyles}>
          <div>Subtotal</div>
          <div data-test-id="cart-total">
            {!props.cart?.length ? 0 : cartTotalPrice}
          </div>
        </div>
        <div css={productSumStyles}>
          <div>Shipping</div>
          <div>{!props.cart?.length ? 0 : 29.99}</div>
        </div>
        <div css={productSumTotalStyles}>
          <div>Total</div>
          <div>{!props.cart?.length ? 0 : cartTotalPrice + 29.99}</div>
        </div>
        <Link href="/checkout">
          <button
            css={checkoutButtonStyles}
            data-test-id="cart-checkout"
            disabled={!props.cart?.length ? true : false}
          >
            CHECKOUT
          </button>
        </Link>
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
