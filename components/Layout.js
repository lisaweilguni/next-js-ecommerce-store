import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 20px 100px;
  margin-left: 10px;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
