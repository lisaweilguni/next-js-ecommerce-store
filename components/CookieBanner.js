import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen) => css`
  padding: 20px;
  background-color: white;
  transition: all 0.2s ease-in-out;
  height: 120px;
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  top: -100px;
  bottom: 0;
  margin: auto;
  z-index: 2;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;

  button {
    border-radius: 4px;
    padding: 7px;
    width: 150px;
    text-align: center;
    font-size: 13px;
    text-decoration: none;

    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    background-color: black;
    border: 1px solid black;
    color: white;
  }

  button:hover {
    color: #333333;
    background-color: white;
    border: 1px solid #333333;
    cursor: pointer;
  }

  ${!isOpen &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');
    if (initialValue !== null) {
      setIsBannerOpen(JSON.parse(initialValue));
    }
  }, []);

  return (
    <div css={bannerStyles(isBannerOpen)}>
      <div>
        We use cookies and similar technologies on our website to ensure a
        smooth shopping experience. Please accept our cookie policy.
      </div>
      <button
        data-test-id="cookie-banner"
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        ACCEPT ALL
      </button>
    </div>
  );
}
