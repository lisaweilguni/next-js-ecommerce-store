import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../../database/products';
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
export default function Product(props) {
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
          <button data-test-id="product-add-to-cart">ADD TO CART</button>
          <div css={plusMinusSectionStyles}>
            <button
              data-test-id="product-quantity"
              onClick={() => {
                const currentCookieValue = getParsedCookie('amount');

                if (!currentCookieValue) {
                  setStringifiedCookie('amount', [
                    { id: props.product.id, amount: 1 },
                  ]);
                  return;
                }

                const foundCookie = currentCookieValue.find(
                  (cookieProductObject) =>
                    cookieProductObject.id === props.product.id,
                );

                if (!foundCookie) {
                  currentCookieValue.push({ id: props.product.id, amount: 1 });
                } else {
                  foundCookie.amount++;
                }

                setStringifiedCookie('amount', currentCookieValue);
              }}
            >
              +
            </button>
            <div>0</div>
            <button
              data-test-id="product-quantity"
              onClick={() => {
                const currentCookieValue = getParsedCookie('amount');

                if (!currentCookieValue) {
                  setStringifiedCookie('amount', [
                    { id: props.product.id, amount: -1 },
                  ]);
                  return;
                }

                const foundCookie = currentCookieValue.find(
                  (cookieProductObject) =>
                    cookieProductObject.id === props.product.id,
                );

                if (!foundCookie) {
                  currentCookieValue.push({ id: props.product.id, amount: -1 });
                } else {
                  foundCookie.amount--;
                }

                setStringifiedCookie('amount', currentCookieValue);
              }}
            >
              {' '}
              -{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieving product id from url
  const productId = parseInt(context.query.productId);

  const products = productsDatabase;

  // Finding the product
  const foundProduct = products.find((product) => {
    return product.id === productId;
  });

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
