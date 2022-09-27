import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const navStyles = css`
  background-color: blue;
  margin-top: 20px;
  padding: 10px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <nav className={navStyles}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
        </nav>
      </div>
    </div>
  );
}
