import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '../../database/products';

const mainStyles = css`
  padding: 120px 100px;
  margin-left: 10px;
`;

const productLayoutStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
  margin-top: 40px;
`;

const productStyles = css`
  border-radius: 15px;
  border: 1px solid #dddddd;
  padding: 20px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 20px;
  }

  &:hover {
    box-shadow: 3px 3px #dddddd;
  }
`;

const productInfoSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const viewProductButtonStyles = css`
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 7px;
  width: 150px;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #333333;
  background-color: white;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #333333;
  cursor: pointer;

  &:hover {
    background-color: black;
    border: 1px solid black;
    color: white;
  }
`;

const h2Styles = css`
  a {
    text-decoration: none;
    color: #333333;
  }
`;

type Props = {
  products: Product[];
};

export default function Products(props: Props) {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Overview of products" />
      </Head>
      <div css={mainStyles}>
        <h1>Bicycles</h1>

        <div css={productLayoutStyles}>
          {props.products.map((product) => {
            return (
              <Link
                key={`product-${product.id}`}
                href={`/products/${product.id}`}
              >
                <a css={productStyles} data-test-id={`product-${product.id}`}>
                  <div key={`product-${product.id}`}>
                    {/* <Link href={`/products/${product.id}`}> */}
                    {/* <a> */}
                    <Image
                      src={`/${product.id}-${product.name.toLowerCase()}.jpeg`}
                      alt={`Vintage Road Bicycle ${product.name}`}
                      width="362.5"
                      height="245"
                    />
                    {/* </a> */}
                    {/* </Link> */}
                    <div css={productInfoSectionStyles}>
                      <h2 css={h2Styles}>
                        <div data-test-id={`name-${product.id}`}>
                          {product.name}
                        </div>
                      </h2>
                      <div>EUR {product.price}</div>
                      <Link href={`/products/${product.id}`}>
                        <div css={viewProductButtonStyles}>LEARN MORE</div>
                      </Link>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
