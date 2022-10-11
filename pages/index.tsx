import { css } from '@emotion/react';
import Head from 'next/head';

const heroPageLayoutStyles = css`
  display: flex;
  width: 100%;
  z-index: 2;
  background-color: grey;
  background-image: url(wall3.jpeg);
`;

const titleSectionStyles = css`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 200px;
  gap: 30px;
  margin-top: 100px;
  margin-left: 70px;
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
  font-size: 50px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vintage Road Bicycles</title>
        <meta name="description" content="Overview of the store" />
      </Head>

      <div css={heroPageLayoutStyles}>
        <div css={titleSectionStyles}>
          <div>cycleria</div>
          <h1 css={h1Styles}>
            Vintage Road <br /> Bicycles
          </h1>
          <div>Rediscover the art of cycling.</div>
          <a>View Bicycles</a>
        </div>
      </div>
    </div>
  );
}
