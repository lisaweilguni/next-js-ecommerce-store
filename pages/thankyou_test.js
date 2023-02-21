import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const thankYouPageStyles = css`
  padding: 120px 100px;
  min-height: calc(100vh - 70px);
  justify-content: center;
  display: flex;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(beach2_compress.jpeg);
  background-size: cover;
`;

const contentSectionStyles = css`
  width: 50%;
  height: 350px;
  background-color: #f4f4f4;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 100px 40px 100px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 16px;

  div {
    text-align: justify;
  }

  a {
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

    &:hover {
      background-color: black;
      border: 1px solid black;
      color: white;
    }
  }
`;

export default function Thankyou() {
  return (
    <div css={thankYouPageStyles}>
      <Head>
        <title>Thank you</title>
        <meta name="description" content="Thank you for your order" />
      </Head>
      <div css={contentSectionStyles}>
        <h1>Thank you for your order</h1>
        <div>
          We're getting your bicycle ready for you. You'll receive an e-mail
          once your order has been shipped.
        </div>
        <Link href="/products">
          <a>VIEW ALL BIKES</a>
        </Link>
      </div>
    </div>
  );
}
