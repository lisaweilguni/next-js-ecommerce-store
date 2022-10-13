import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { getProductById, Product } from '../../database/products';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import { CartItem } from '../../utils/cookies';

const mainStyles = css`
  padding: 20px 100px;
  margin-left: 10px;
`;

const productStyles = css`
  display: flex;
  flex-direction: row;
  padding: 120px 20px;
  gap: 40px;

  h2 {
    margin-top: 0;
  }
`;

const productInfoStyles = css`
  width: 40%;
  padding: 40px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const imageSectionStyles = css`
  a {
    text-decoration: none;
    color: #333333;
  }

  a:hover {
    color: black;
  }
`;

const flexRowStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const productDescriptionStyles = css`
  background-color: #f4f4f4;
  padding: 20px 20px;
  line-height: 25px;
  border-radius: 5px;
`;

const h1Styles = css`
  margin-top: 0;
  margin-bottom: 0;
`;

const smallHeadingAddOnStyles = css`
  font-size: 12px;
  margin-bottom: 0;
`;

const plusMinusSectionStyles = (showCounter: boolean) => css`
  display: flex;
  flex-direction: row;
  gap: 15px;
  height: 30px;
  border: 1px solid black;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px 15px;
  width: 106px;

  button {
    width: 90%;
    height: 90%;
    border: none;
    text-align: center;
    justify-content: center;
    margin-bottom: 18px;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
  }

  ${!showCounter &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
  `};
`;

const productPriceStyles = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const addToCartButtonStyles = css`
  padding: 15px 10px;
  border: 0.18em solid #000000;
  border-radius: 4px;
  background-color: #000000;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: white;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #e7612e;
    border: 0.18em solid #e7612e;
    color: white;
  }
`;

const circleStyles = css`
  border-radius: 9999px;
  background-color: rgba(16, 185, 129);
  width: 16px;
  height: 16px;
`;

const hiddenSectionStyles = (showButton: boolean) => css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;

  ${!showButton &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
  `};
`;

const goToCartButtonStyles = css`
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: #333333;
  width: 160px;
  height: 45px;
  cursor: pointer;
  background-color: #f4f4f4;
  border: 1px solid #f4f4f4;
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #e7612e;
    color: white;
    border: 1px solid #e7612e;
  }

  > span {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

type CartState = {
  cart: CartItem[] | undefined;
  setCart: Dispatch<SetStateAction<CartItem[] | undefined>>;
};

type Props = { product: Product } | { error: string };

export default function SingleProduct(props: Props & CartState) {
  const [showCounter, setShowCounter] = useState(false);
  const [showButton, setShowButton] = useState(false);

  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Product not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/products">product page.</Link>
      </div>
    );
  }

  // Declare cookie for product in variable here in order to use it globally in this page
  const foundCookie = props.cart?.find(
    (cookieProductObject: CartItem) =>
      cookieProductObject.id === props.product.id,
  );

  return (
    <div css={mainStyles}>
      <div key={`product-${props.product.id}`} css={productStyles}>
        <Head>
          <title>{props.product.name}</title>
          <meta name="description" content={props.product.name} />
        </Head>

        <div css={imageSectionStyles}>
          <Link href="/products">⬅ All Bicycles</Link>
          <Link href={`/products/${props.product.id}`}>
            <a>
              <Image
                src={`/${
                  props.product.id
                }-${props.product.name.toLowerCase()}.jpeg`}
                alt={`Vintage Road Bicycle ${props.product.name} on white background`}
                width="725"
                height="490"
                data-test-id="product-image"
              />
            </a>
          </Link>
        </div>

        <div css={productInfoStyles}>
          <div css={smallHeadingAddOnStyles}>Vintage Road Bicycle</div>
          <h1 css={h1Styles}>{props.product.name}</h1>
          <div css={productDescriptionStyles}>{props.product.info}</div>

          <div css={flexRowStyles}>
            <div css={circleStyles}> </div> <div>In stock, ready to roll</div>
          </div>
          <div css={productPriceStyles}>
            <div>EUR</div>
            <div data-test-id="product-price">{props.product.price}</div>
          </div>
          <button
            css={addToCartButtonStyles}
            data-test-id="product-add-to-cart"
            onClick={() => {
              setShowCounter(true);
              setShowButton(true);
              if (!props.cart) {
                props.setCart([
                  {
                    id: props.product.id,
                    quantity: 1,
                  },
                ]);
                return;
              }

              if (!foundCookie) {
                props.cart.push({
                  id: props.product.id,
                  quantity: 1,
                });
              } else {
                foundCookie.quantity++;
              }

              const newQuantity = [...props.cart];
              props.setCart(newQuantity);
            }}
          >
            ADD TO CART
          </button>

          <div css={hiddenSectionStyles(showButton)}>
            <div css={plusMinusSectionStyles(showCounter)}>
              <button
                onClick={() => {
                  if (!props.cart) {
                    props.setCart([
                      {
                        id: props.product.id,
                        quantity: -1,
                      },
                    ]);
                    return;
                  }

                  if (!foundCookie) {
                    props.cart.push({
                      id: props.product.id,
                      quantity: -1,
                    });
                  } else if (foundCookie.quantity > 1) {
                    foundCookie.quantity--;
                  }

                  const newQuantity = [...props.cart];
                  props.setCart(newQuantity);
                }}
              >
                {' '}
                -{' '}
              </button>

              <div data-test-id="product-count">
                {foundCookie ? foundCookie.quantity : 1}
              </div>

              <button
                data-test-id="product-quantity"
                onClick={() => {
                  if (!props.cart) {
                    props.setCart([
                      {
                        id: props.product.id,
                        quantity: 1,
                      },
                    ]);
                    return;
                  }

                  if (!foundCookie) {
                    props.cart.push({
                      id: props.product.id,
                      quantity: 1,
                    });
                  } else {
                    foundCookie.quantity++;
                  }

                  const newQuantity = [...props.cart];
                  props.setCart(newQuantity);
                }}
              >
                +
              </button>
            </div>
            <div>
              <Link href="/cart">
                <button css={goToCartButtonStyles}>
                  <span>
                    <Image
                      src="/shopping-cart.jpeg"
                      alt="cart symbol"
                      width="20"
                      height="20"
                    />
                  </span>
                  <div>GO TO CART</div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieving product id from url
  const productId = parseIntFromContextQuery(context.query.productId);

  // Handling error if product id is not a number
  if (typeof productId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  // Get product from database
  const foundProduct = await getProductById(productId);

  // Handling error if product id does not exist
  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  // this will be passed to the component above as props
  return {
    props: {
      product: foundProduct,
    },
  };
}
