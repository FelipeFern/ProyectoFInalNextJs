import Head from 'next/head';
import { ReactNode } from 'react';

// import Header from '@/components/Header/HeaderDashboard';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
// import Footer from '@/components/Footer';



export default function PageLayout({ title, children, className, footer = true }) {
  const isPreviewEnv = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

  const pageTitle = `${isPreviewEnv ? 'Preview | ' : ''}MaxWood | ${title}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create manu app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className={`flex-1 mt-16 ${className || ''}`} style={{marginTop:'4rem'}} >{children}</main>
        {footer && <Footer />}
      </div>
    </>
  );
}