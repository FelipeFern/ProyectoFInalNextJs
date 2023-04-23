import Image from 'next/image';
import { Inter } from 'next/font/google';
import Login from '../components/Login/Login.js';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <Head>
        <title>Next.js + Tailwind CSS</title>
      </Head>
      <Login />
      <p>Algo por ahi</p>
      <h2>OMIC Bahia Blanca</h2>
    </main>
  );
}
