import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const heroPageLayoutStyles = css`
  display: flex;
  width: 100%;
  z-index: 2;
  background-color: grey;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(beach2.jpeg);
  background-size: cover;
  background-position: 25% 25%;
  margin-top: 20px;
`;

const titleSectionStyles = css`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 150px;
  gap: 30px;
  margin-top: 150px;
  margin-left: 90px;
  color: white;

  a {
    padding: 14px 30px;
    border-radius: 4px;
    border: 0.18em solid #f4f4f4;
    background-color: #f4f4f4;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    color: black;
    text-decoration: none;
    font-size: 14.4px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;

    &:hover {
      background-color: #e7612e;
      color: white;
      border: 0.18em solid #e7612e;
    }
  }
`;

const h1Styles = css`
  line-height: 1.19;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  font-size: 55px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>cycleria - Vintage Bicycles</title>
        <meta
          name="welcome"
          content="Welcome to cycleria - Vintage Road Bicycles."
        />
      </Head>

      <div css={heroPageLayoutStyles}>
        <div css={titleSectionStyles}>
          <div>cycleria</div>
          <h1 css={h1Styles}>
            Vintage Road <br /> Bicycles
          </h1>
          <div>Rediscover the art of cycling.</div>
          <Link href="/products">
            <a>View Bicycles</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
