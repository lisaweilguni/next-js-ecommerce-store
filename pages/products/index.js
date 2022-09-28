import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../../database/products';

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

export default function Products(props) {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Overview of products" />
      </Head>
      <h1>Products</h1>

      {props.products.map((product) => {
        return (
          <div key={`product-${product.id}`} css={productStyles}>
            <h2>
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h2>

            <Link href={`/products/${product.id}`}>
              <a>
                <Image
                  src={`/${product.id}-${product.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="150"
                  height="150"
                />
              </a>
            </Link>

            <div>Price: {product.price} $</div>
            <div>Amount: {product.amount}</div>
          </div>
        );
      })}
    </div>
  );
}

export function getServerSideProps(context) {
  console.log(context.req.cookies.amount);

  // get the cookies from the request object and parse it if is not undefined
  const parsedCookies = context.req.cookies.amount
    ? JSON.parse(context.req.cookies.amount)
    : [];

  // loop over the database and add a new property called stars with either the value in the cookies or 0
  const products = productsDatabase.map((product) => {
    return {
      ...product,
      amount:
        parsedCookies.find(
          (cookieProductObject) => product.id === cookieProductObject.id,
        )?.amount || 0,
    };
  });

  return {
    props: {
      products: products,
    },
  };
}
