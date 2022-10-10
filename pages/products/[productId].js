import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../../database/products';

const productStyles = css`
  display: flex;
  flex-direction: row;
  /* border-radius: 4px;
  border: 1px solid #ccc; */
  padding: 20px;
  gap: 40px;
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
`;

const productInfoStyles = css`
  width: 40%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const imageSectionStyles = css`
  a {
    color: black;
    text-decoration: none;
  }
`;

const flexRowStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const plusMinusSectionStyles = (showCounter) => css`
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
  }

  ${!showCounter &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
  `};
`;

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const addToCartButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid grey;
  border-radius: 4px;
  background-color: grey;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: white;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 0.18em solid grey;
    color: grey;
  }
`;

const circleStyles = css`
  border-radius: 9999px;
  background-color: rgba(16, 185, 129);
  width: 16px;
  height: 16px;
`;

const hiddenSectionStyles = (showButton) => css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;

  ${!showButton &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
  `};
`;

const goToCartButtonStyles = css`
  border-radius: 4px;
  text-align: center;
  font-size: 15px;
  text-decoration: none;
  color: #4b4d4b;
  width: 150px;
  height: 43px;
  cursor: pointer;
  background-color: white;
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    background-color: grey;
    color: white;
  }

  > span {
    margin-right: 10px;
    margin-left: 5px;
  }
`;

export default function Product(props) {
  const [showCounter, setShowCounter] = useState(false);
  const [showButton, setShowButton] = useState(false);

  if (props.error) {
    return (
      <div>
        <Head>
          <title>Product not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/products">product page.</Link>
      </div>
    );
  }

  // Define cookie for product in variable here in order to use it globally in this page
  const foundCookie = props.cart?.find(
    (cookieProductObject) => cookieProductObject.id === props.product.id,
  );

  return (
    <div>
      <div key={`product-${props.product.id}`} css={productStyles}>
        <Head>
          <title>{props.product.name}</title>
          <meta name="description" content={props.product.name} />
        </Head>

        <div css={imageSectionStyles}>
          <Link href="/products">⬅ All bicycles</Link>
          <Link href={`/products/${props.product.id}`}>
            <a>
              <Image
                src={`/${
                  props.product.id
                }-${props.product.name.toLowerCase()}.jpeg`}
                alt=""
                width="725"
                height="490"
                data-test-id="product-image"
              />
            </a>
          </Link>
        </div>

        <div css={productInfoStyles}>
          <h1>{props.product.name}</h1>
          <div>{props.product.info}</div>

          <div css={flexRowStyles}>
            <div css={circleStyles}> </div> <div>In stock, ready to roll</div>
          </div>
          <div css={productPriceStyles}>
            <div>EUR</div>
            <div data-test-id="product-price">{props.product.price}</div>
          </div>
          <button
            css={addToCartButtonStyles}
            data-test-id="product-add-to-cart"
            onClick={() => {
              setShowCounter(true);
              setShowButton(true);
              if (!props.cart) {
                props.setCart([
                  {
                    id: props.product.id,
                    quantity: 1,
                  },
                ]);
                return;
              }

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
            ADD TO CART
          </button>

          <div css={hiddenSectionStyles(showButton)}>
            <div css={plusMinusSectionStyles(showCounter)}>
              <button
                data-test-id="product-quantity"
                onClick={() => {
                  if (!props.cart) {
                    props.setCart([
                      {
                        id: props.product.id,
                        quantity: -1,
                      },
                    ]);
                    return;
                  }

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

              <div>{foundCookie ? foundCookie.quantity : 1}</div>

              <button
                data-test-id="product-quantity"
                onClick={() => {
                  if (!props.cart) {
                    props.setCart([
                      {
                        id: props.product.id,
                        quantity: 1,
                      },
                    ]);
                    return;
                  }

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
              <Link href="/cart">
                <button css={goToCartButtonStyles}>
                  <span>
                    <Image
                      src="/shopping-cart.jpeg"
                      alt="cart symbol"
                      width="20"
                      height="20"
                    />
                  </span>
                  <div>GO TO CART</div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Retrieving product id from url
  const productId = parseInt(context.query.productId);

  // Get product from database
  const foundProduct = await getProductById(productId);

  // Handling error if product id does not exist
  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  // this will be passed to the component above as props
  return {
    props: {
      product: foundProduct,
    },
  };
}
