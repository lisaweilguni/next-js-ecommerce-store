import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen) => css`
  padding: 10px 10px 10px 50px;
  height: 90px;
  transition: all 0.5s ease-in-out;
  background-color: grey;
  color: white;
  border-radius: 3px;
  margin: 20px 60px 20px 60px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: sticky;

  button {
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px 10px;
    width: 150px;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: black;
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
      <div>Please accept our cookie policy {isBannerOpen}</div>
      <button
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        Accept All
      </button>
    </div>
  );
}
