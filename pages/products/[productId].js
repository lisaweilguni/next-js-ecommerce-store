import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const productStyles = css`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  border: 1px solid #ccc;
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
  gap: 40px;
`;

const imageSectionStyles = css`
  a {
    color: black;
    text-decoration: none;
  }
`;

const plusMinusSectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const addToCartButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid grey;
  border-radius: 4px;
  background-color: grey;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
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

export default function Product(props) {
  // const [quantity, setQuantity] = useState(props.product.quantity);

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
                height="518"
                data-test-id="product-image"
              />
            </a>
          </Link>
        </div>

        <div css={productInfoStyles}>
          <h1>{props.product.name}</h1>
          <div css={productPriceStyles}>
            <div>EUR</div>
            <div data-test-id="product-price">{props.product.price}</div>
          </div>
          <div>🟢 In stock, ready to ship</div>
          <button
            css={addToCartButtonStyles}
            data-test-id="product-add-to-cart"
            onClick={() => {
              const currentCookieValue = getParsedCookie('quantity');

              if (!currentCookieValue) {
                setStringifiedCookie('quantity', [
                  { id: props.product.id, quantity: 1 },
                ]);
                return;
              }

              const foundCookie = currentCookieValue.find(
                (cookieProductObject) =>
                  cookieProductObject.id === props.product.id,
              );

              if (!foundCookie) {
                currentCookieValue.push({ id: props.product.id, quantity: 1 });
              } else {
                foundCookie.quantity++;
              }

              setStringifiedCookie('quantity', currentCookieValue);
            }}
          >
            ADD TO CART
          </button>

          <div css={plusMinusSectionStyles}>
            <button
              data-test-id="product-quantity"
              onClick={() => {
                const currentCookieValue = getParsedCookie('quantity');

                if (!currentCookieValue) {
                  setStringifiedCookie('quantity', [
                    { id: props.product.id, quantity: -1 },
                  ]);
                  return;
                }

                const foundCookie = currentCookieValue.find(
                  (cookieProductObject) =>
                    cookieProductObject.id === props.product.id,
                );

                if (!foundCookie) {
                  currentCookieValue.push({
                    id: props.product.id,
                    quantity: -1,
                  });
                } else if (foundCookie.quantity > 0) {
                  foundCookie.quantity--;
                }

                setStringifiedCookie('quantity', currentCookieValue);
                props.setQuantity(foundCookie.quantity);
              }}
            >
              {' '}
              -{' '}
            </button>

            {/* <div>{props.product.quantity}</div> */}
            <div>{props.quantity}</div>

            <button
              data-test-id="product-quantity"
              onClick={() => {
                const currentCookieValue = getParsedCookie('quantity');

                if (!currentCookieValue) {
                  setStringifiedCookie('quantity', [
                    { id: props.product.id, quantity: 1 },
                  ]);
                  return;
                }

                const foundCookie = currentCookieValue.find(
                  (cookieProductObject) =>
                    cookieProductObject.id === props.product.id,
                );

                if (!foundCookie) {
                  currentCookieValue.push({
                    id: props.product.id,
                    quantity: 1,
                  });
                } else {
                  foundCookie.quantity++;
                }

                setStringifiedCookie('quantity', currentCookieValue);
                props.setQuantity(foundCookie.quantity);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const parsedCookies = context.req.cookies.quantity
    ? JSON.parse(context.req.cookies.quantity)
    : [];

  // Retrieving product id from url
  const productId = parseInt(context.query.productId);

  // Get product from database
  const foundProduct = await getProductById(productId);

  // Add quantity property to product
  const foundProductWithQuantity = {
    ...foundProduct,
    quantity:
      parsedCookies.find(
        (cookieProductObject) => productId === cookieProductObject.id,
      )?.quantity || 1,
  };

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
      product: foundProductWithQuantity,
    },
  };
}
