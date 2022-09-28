import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const productStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
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
        <h2>{props.product.name}</h2>
        <h2>
          <Link href={`/products/${props.product.id}`}>
            {props.product.name}
          </Link>
        </h2>

        <Link href={`/products/${props.product.id}`}>
          <a>
            <Image
              src={`/${
                props.product.id
              }-${props.product.name.toLowerCase()}.jpeg`}
              alt=""
              width="150"
              height="150"
            />
          </a>
        </Link>

        <div>Price: {props.product.price} $</div>
        <button
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
        <button
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
  );
}

export function getServerSideProps(context) {
  // Retrieve animal id from url
  const productId = parseInt(context.query.productId);

  const products = productsDatabase;

  // Finding the product
  const foundProduct = products.find((product) => {
    return product.id === productId;
  });

  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: foundProduct,
    },
  };
}
