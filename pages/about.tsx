import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  padding: 120px 100px;
  margin-left: 10px;
`;

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Information about the creator" />
      </Head>
      <div css={mainStyles}>
        <h1>About</h1>
      </div>
    </div>
  );
}
