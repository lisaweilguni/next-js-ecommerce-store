import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  // Define state for quantity count in cart
  const [cart, setCart] = useState();

  // Get cookies and set state on first render
  useEffect(() => {
    const currentCookieValue = getParsedCookie('cart');
    if (currentCookieValue) {
      setCart(currentCookieValue);
    }
  }, []);

  // Get state and set cookies every time "cart" changes
  useEffect(() => {
    if (typeof cart !== 'undefined') {
      setStringifiedCookie('cart', cart);
    }
  }, [cart]);

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
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
      <CookieBanner />
    </>
  );
}

export default MyApp;
