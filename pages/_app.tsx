import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import {
  CartItem,
  getParsedCookie,
  setStringifiedCookie,
} from '../utils/cookies';

function MyApp({ Component, pageProps }: AppProps) {
  // Define state for quantity count in cart
  const [cart, setCart] = useState<CartItem[]>();

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
            font-family: 'Montserrat', sans-serif;
            background-color: white;
            color: #333333;
            margin: 0;
            line-height: 20px;
            font-size: 16px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
        `}
      />
      <Layout cart={cart} setCart={setCart}>
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
