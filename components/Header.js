import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 30px;
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
  gap: 70px;
`;

const cartSymbolStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const logoStyles = css`
  margin-left: 75px;
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
          <Link href="/">cycleria logo</Link>
        </div>
        <div css={navStyles}>
          <Link href="/products" data-test-id="products-link">
            Products
          </Link>
          <Link href="/about">About</Link>
          <Link href="/cart">
            <a data-test-id="cart-link">
              <div css={cartSymbolStyles}>
                <Image
                  src="/shopping-cart.jpeg"
                  alt=""
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
