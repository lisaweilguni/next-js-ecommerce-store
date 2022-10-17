import { css } from '@emotion/react';
import Head from 'next/head';

// import { getProducts } from '../database/products';

const creditsPageStyles = css`
  padding: 120px 100px;
  margin-left: 10px;
  min-height: calc(100vh - 70px);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 40px;

  a {
    color: #333333;
  }
`;

const creditStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Credits() {
  return (
    <div css={creditsPageStyles}>
      <Head>
        <title>Credits</title>
        <meta name="description" content="Credits for images and icons" />
      </Head>
      <h1>Credits</h1>
      <div css={creditStyles}>
        <span>Icons: </span>
        <a href="https://www.flaticon.com/free-icons/shopping-cart">Flaticon</a>
      </div>
      <div css={creditStyles}>
        <span>Images: </span>
        <div>
          <a href="https://steel-vintage.com/en/">Steel Vintage Bikes</a>
        </div>
        <div>
          <a href="https://unsplash.com/@xokvictor">Viktor Bystrov</a> from{' '}
          <a href="https://unsplash.com/">Unsplash</a>
        </div>
        <div>
          <a href="https://unsplash.com/@markusspiske">Markus Spiske</a> from{' '}
          <a href="https://unsplash.com/">Unsplash</a>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const products = await getProducts();

//   return {
//     props: {
//       products: products,
//     },
//   };
// }
