import { css } from '@emotion/react';
import Head from 'next/head';

const mainStyles = css`
  min-height: calc(100vh - 70px);
`;

const aboutPageLayoutStyles = css`
  display: flex;
  width: 100%;
  height: 500px;
  z-index: 2;
  background-color: grey;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(wall_compress.jpeg);
  background-size: cover;
  background-position: 25% 60%;
  margin-top: 20px;
`;

const contentSectionStyles = css`
  padding: 40px 100px;
  margin-left: 50px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const textSectionStyles = css`
  line-height: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
  text-align: justify;
  font-size: 14px;
`;

const imageSectionStyles = css`
  display: flex;
  width: 40%;
`;

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Information about the creator" />
      </Head>
      <div css={mainStyles}>
        <div css={aboutPageLayoutStyles} />
        <div css={contentSectionStyles}>
          <div css={textSectionStyles}>
            <h1>About</h1>
            <div>
              cycleria is a fictional ecommerce shop for vintage road bicycles
              built by Lisa Weilguni. I am a passionate cyclist with a special
              love for vintage road bikes. You might catch me cruising through
              the streets of Vienna on my retro Puch bike or cycling through the
              forest with my recently acquired gravel bike.
            </div>
            <div>
              This application was built from scratch for learning purposes. It
              was created using Next.js, JavaScript, CSS3, HTML5, Node.js,
              React.js, PostgreSQL, TypeScript and tested with Playwright and
              Jest.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
