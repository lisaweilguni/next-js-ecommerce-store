import { css } from '@emotion/react';
import Head from 'next/head';

const thankYouPageStyles = css`
  padding: 20px 100px;
  margin-left: 10px;
`;

export default function Thankyou() {
  return (
    <div css={thankYouPageStyles}>
      <Head>
        <title>Thank you</title>
        <meta name="description" content="Thank you for your order" />
      </Head>
      <h1>Thank you for your order</h1>
    </div>
  );
}
