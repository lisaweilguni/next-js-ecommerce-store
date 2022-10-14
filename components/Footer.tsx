import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  padding: 20px 20px 20px 20px;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #f4f4f4;
  text-align: center;
  align-items: center;
  letter-spacing: 2px;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #333333;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <span>
        © Lisa Weilguni | 2022 | <Link href="/credits">Credits</Link>
      </span>
    </footer>
  );
}
