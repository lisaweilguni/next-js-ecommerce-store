import { css, Global } from '@emotion/react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background-color: white;
            color: #202020;
            margin: 0;
            line-height: 20px;
            font-size: 16px;
          }
        `}
      />
      <Layout>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
        <Component {...pageProps} />
      </Layout>
      <CookieBanner />
    </>
  );
}

export default MyApp;
