import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../database/products';
import { setLocalStorage } from '../utils/localStorage';

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

  button {
    height: 20px;
  }
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

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
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

export default function Cart(props) {
  const cartTotalPrice = props.cart?.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );

  function removeProduct(id) {
    for (let i = 0; i < props.cart.length; i++) {
      if (props.cart[i].id === id) {
        const newCart = props.cart.splice(i, 1);
        props.setCart(newCart);
        return;
      }
    }
  }

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
        {props.cart?.map((product) => {
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
                      src={`/${product.id}-${product.name}.jpeg`}
                      alt=""
                      width="181.25"
                      height="129.5"
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

                <div css={productPriceStyles}>
                  <div>Quantity:</div>
                  <div data-test-id={`cart-product-quantity-${product.id}`}>
                    {product.quantity}
                  </div>
                </div>
              </div>
              <div css={removeButtonStyles}>
                <button
                  onClick={() => removeProduct(product.id)}
                  data-test-id={`cart-product-remove-${product.id}`}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div css={checkoutBoxStyles}>
        <div>Total:</div>
        <div data-test-id="cart-total">{cartTotalPrice}</div>
        <Link href="/checkout" data-test-id="cart-checkout">
          <a css={checkoutProductButtonStyles}>CHECKOUT</a>
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
