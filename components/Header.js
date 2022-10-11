import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: #f4f4f4;
  padding: 20px;
  font-size: 14px;

  a {
    text-decoration: none;
    color: black;
  }
  > a + a {
    margin-left: 13px;
  }
`;

const navStyles = css`
  display: flex;
  flex-direction: row;
  gap: 100px;
  align-items: center;
  margin-right: 40px;
  font-size: 14px;
  letter-spacing: 2px;
  color: #333333;
`;

const linkHeaderStyles = css`
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;

  &:hover {
    font-weight: bold;
  }
`;

const cartSymbolStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 14px;
  font-weight: normal;
`;

const logoStyles = css`
  margin-left: 75px;
  cursor: pointer;
`;

export default function Header(props) {
  const cartValueCount = props.cart?.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0,
  );

  return (
    <header>
      <nav css={headerStyles}>
        <div css={logoStyles}>
          <Link href="/">
            <Image
              src="/logo.jpeg"
              alt="cart symbol"
              width="135.3"
              height="44.66"
            />
          </Link>
        </div>
        <div css={navStyles}>
          <div css={linkHeaderStyles}>
            <Link href="/products" data-test-id="products-link">
              Bicycles
            </Link>
          </div>
          <div css={linkHeaderStyles}>
            <Link href="/about">About</Link>
          </div>
          <Link href="/cart">
            <a data-test-id="cart-link">
              <div css={cartSymbolStyles}>
                <Image
                  src="/shopping-cart.jpeg"
                  alt="cart symbol"
                  width="20"
                  height="20"
                />
                <span id="cart-total-quantity" data-test-id="cart-count">
                  {props.cart ? cartValueCount : 0}
                </span>
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
