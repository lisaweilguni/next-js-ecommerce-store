import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the store" />
      </Head>
      <h1>Home</h1>
      <Image src="/1-riva.jpeg" alt="Riva bike" width="300" height="300" />
    </div>
  );
}
