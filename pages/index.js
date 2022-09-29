import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vintage Road Bicycles</title>
        <meta name="description" content="Overview of the store" />
      </Head>
      <h1>Vintage Road Bicycles</h1>
      <Image
        src="/1-mercier.jpeg"
        alt="Mercier bike"
        width="652.5"
        height="466.2"
      />
    </div>
  );
}
