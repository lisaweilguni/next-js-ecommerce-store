import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen) => css`
  padding: 10px;
  height: 60px;
  transition: all 0.5s ease-in-out;
  background-color: purple;
  color: white;
  border-radius: 3px;

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
