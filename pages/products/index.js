import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';

const productLayoutStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
  margin-top: 40px;
`;

const productStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 20px;
  }
`;

const productInfoSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const viewProductButtonStyles = css`
  border: 1px solid black;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: black;
`;

const h1Styles = css``;

const h2Styles = css`
  a {
    text-decoration: none;
    color: black;
  }
`;

export default function Products(props) {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Overview of products" />
      </Head>
      <h1 css={h1Styles}>Bicycles</h1>

      <div css={productLayoutStyles}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`} css={productStyles}>
              <Link href={`/products/${product.id}`}>
                <a data-test-id={`product-${product.id}`}>
                  <Image
                    src={`/${product.id}-${product.name.toLowerCase()}.jpeg`}
                    alt=""
                    width="362.5"
                    height="245"
                  />
                </a>
              </Link>
              <div css={productInfoSectionStyles}>
                <h2 css={h2Styles}>
                  <Link href={`/products/${product.id}`}>
                    <a>{product.name}</a>
                  </Link>
                </h2>
                <div>EUR {product.price}</div>
                <Link href={`/products/${product.id}`}>
                  <a
                    href={`/products/${product.id}`}
                    data-test-id={`product-${product.id}`}
                    css={viewProductButtonStyles}
                  >
                    VIEW PRODUCT
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
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
