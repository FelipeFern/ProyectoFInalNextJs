import Link from 'next/link';

import PageLayout from '@/layouts/PageLayout';

export default function Custom404() {
  return (
    <PageLayout title="Página no encontrada" footer={false}>
      <div className="h-[calc(100vh-12rem)] flex flex-col justify-center items-center text-center">
        <figure className="w-44 md:w-52 relative flex justify-center items-center">
          <span className="text-[10rem] md:text-[17rem] font-extrabold text-secondary/40 leading-none z-0">
            404
          </span>
        </figure>
        <p className="font-bold text-2xl mt-14 md:mt-12">PÁGINA NO ENCONTRADA</p>
        <p>La página a la que se intenta acceder no existe</p>
        <Link href="/" className="button-primary bg-secondary mt-4 text-white">
          Volver a Inicio
        </Link>
      </div>
    </PageLayout>
  );
}
