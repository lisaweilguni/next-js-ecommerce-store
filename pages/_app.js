import { css, Global } from '@emotion/react';
import { useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [quantity, setQuantity] = useState(1);

  // // getting the value of the cookie stars
  // const currentCookieValue = getParsedCookie('stars');

  // // if there is no cookie we initialize the value with a 1
  // if (!currentCookieValue) {
  //   setStringifiedCookie('stars', [{ id: props.singleFruit.id, stars: 1 }]);
  //   return;
  // }

  // // find the object that match the id of the page
  // const foundCookie = currentCookieValue.find(
  //   (cookieFruitObject) => cookieFruitObject.id === props.singleFruit.id,
  // );

  // // if a object is not found i add a new object
  // if (!foundCookie) {
  //   currentCookieValue.push({ id: props.singleFruit.id, stars: 1 });
  // } else {
  //   // if a object is found i update the stars
  //   foundCookie.stars++;
  // }
  // // set the new value of the cookie
  // setStringifiedCookie('stars', currentCookieValue);

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
        <Component
          {...pageProps}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </Layout>
      <CookieBanner />
    </>
  );
}

export default MyApp;
