import Image from 'next/image';
import Link from 'next/link';

// import HeroImage from '/public/products/mueble-tv-moderno-gris.avif';

export default function Servicios() {
  return (
    <section className="flex flex-col lg:flex-row h-min">
      <figure className="relative w-full h-40 lg:h-auto">
        <div className="text-center text-xl font-bold lg:text-6xl lg:justify-center" >
            <p> OFICINA MUNICIAL DE INFORMACIÓN AL CONSUMIDOR</p>
        </div>
        {/* <Image src={HeroImage} alt="Set living Ink" fill className="object-cover" priority /> */}
      </figure>
      <div className="bg-gray-200 text-center p-4 flex flex-col gap-3 lg:w-2/5 lg:text-right lg:justify-center lg:p-8 lg:gap-8 lg:bg-opacity-90 lg:bg-white">
        <h3 className="text-xl font-bold lg:text-3xl">Datos de contacto</h3>
        <p className="text-wrap text-sm lg:text-lg">
          Celular/
          Email
          Direccion
          HOrarios de atencion
        </p>
        <Link
          href={`/productos/detalles/${encodeURIComponent('Mueble TV Rack Moderno').replace(
            '%20',
            '-',
          )}/21`}
          className="button-primary bg-primary text-white self-center lg:self-end"
        >
          Ver más
        </Link>
      </div>
    </section>
  );
}







// <div style="width: 1920px; height: 1225.60px; padding-left: 460px; padding-right: 460px; padding-top: 100px; padding-bottom: 100px; background: white; flex-direction: column; justify-content: center; align-items: center; gap: 40px; display: inline-flex">
//   <div style="height: 57.60px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//     <div style="align-self: stretch; height: 57.60px; padding-right: 831px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//       <div style="color: #0C1618; font-size: 48px; font-family: Staatliches; font-weight: 400; line-height: 57.60px; word-wrap: break-word">Servicios</div>
//     </div>
//   </div>
//   <div style="width: 1000px; justify-content: center; align-items: flex-start; gap: 100px; display: inline-flex">
//     <div style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
//       <div style="align-self: stretch; height: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 30px; padding-right: 321px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #0C1618; font-size: 20px; font-family: Nunito; font-weight: 400; line-height: 30px; word-wrap: break-word">Asesoramiento</div>
//         </div>
//       </div>
//       <div style="align-self: stretch; height: 168px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 168px; padding-right: 5px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #004643; font-size: 16px; font-family: Nunito; font-weight: 400; line-height: 24px; word-wrap: break-word">Dentro del marco de servicios que presta esta Oficina, <br/>el asesoramiento se erige como uno de los más <br/>importantes, orientando a los consumidores y usuarios <br/>en cuanto a sus legítimos derechos, cómo hacerlos <br/>valer, cómo formular sus reclamos, etc. Este <br/>asesoramiento es totalmente gratuito en pos de <br/>garantizar un servicio accesible a toda la ciudadanía.</div>
//         </div>
//       </div>
//     </div>
//     <div style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
//       <div style="align-self: stretch; height: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 30px; padding-right: 349px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #0C1618; font-size: 20px; font-family: Nunito; font-weight: 400; line-height: 30px; word-wrap: break-word">Información</div>
//         </div>
//       </div>
//       <div style="align-self: stretch; height: 216px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 216px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #004643; font-size: 16px; font-family: Nunito; font-weight: 400; line-height: 24px; word-wrap: break-word">Desde la OMIC se brinda información a quienes se <br/>acercan a nuestras oficinas sobre las materias que son <br/>propias del derecho del consumidor, como por ejemplo, <br/>telefonía celular, servicio de Internet, planes de ahorro, <br/>plazos de garantías, contratos bancarios, tarjetas de <br/>crédito, problemas con las bases de datos de deudores, <br/>electrodomésticos, automotores, prendas de vestir, <br/>juguetes, contratación de servicios en general, etc., y en <br/>todos sus casos, cómo reclamar ante las empresas.</div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div style="width: 1000px; justify-content: center; align-items: flex-start; gap: 100px; display: inline-flex">
//     <div style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
//       <div style="align-self: stretch; height: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 30px; padding-right: 98px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #0C1618; font-size: 20px; font-family: Nunito; font-weight: 400; line-height: 30px; word-wrap: break-word">Educación a los Consumidores y Usuarios</div>
//         </div>
//       </div>
//       <div style="align-self: stretch; height: 336px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 336px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #004643; font-size: 16px; font-family: Nunito; font-weight: 400; line-height: 24px; word-wrap: break-word">A partir del presente año personal de la OMIC <br/>concurrirá gratuitamente a escuelas, institutos, <br/>entidades sociales y demás instituciones a efectos de <br/>dar charlas informativas sobre el derecho del <br/>consumidor en general, explicando de manera sencilla y <br/>dinámica los derechos que protegen a consumidores y <br/>usuarios, el funcionamiento de esta Dependencia, <br/>comentarios sobre algunos casos interesantes recibidos <br/>en la OMIC, además de la evacuación de consultas e <br/>inquietudes de los concurrentes. Cabe destacar que <br/>este servicio no se encuentra limitado para alumnos o <br/>estudiantes de determinadas edades, sino que la <br/>educación en este tema es un servicio que se presta a <br/>toda la comunidad en general.</div>
//         </div>
//       </div>
//     </div>
//     <div style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
//       <div style="align-self: stretch; height: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 30px; padding-right: 5px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #0C1618; font-size: 20px; font-family: Nunito; font-weight: 400; line-height: 30px; word-wrap: break-word">Protección y defensa de los consumidores y usuarios</div>
//         </div>
//       </div>
//       <div style="align-self: stretch; height: 240px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 240px; padding-right: 5px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #004643; font-size: 16px; font-family: Nunito; font-weight: 400; line-height: 24px; word-wrap: break-word">En tanto Autoridad de Aplicación de la Ley de Defensa <br/>del Consumidor y del Código Provincial de <br/>Implementación de los Derechos de los Consumidores <br/>y Usuarios de la provincia de Buenos Aires, tiene a su <br/>cargo la recepción de las denuncias, la realización de <br/>las audiencias de conciliación y la imputación a las <br/>empresas por presunta infracción a la normativa <br/>protectoria de los consumidores en los supuestos en <br/>que no se arribó a una solución conciliatoria y <br/>correspondiere dicha medida.</div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div style="width: 1000px; justify-content: center; align-items: flex-start; display: inline-flex">
//     <div style="flex: 1 1 0; height: 216px; padding-top: 28px; padding-bottom: 28px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: inline-flex">
//       <div style="align-self: stretch; height: 30px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 30px; padding-right: 827px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #0C1618; font-size: 20px; font-family: Nunito; font-weight: 400; line-height: 30px; word-wrap: break-word">Prevención y control</div>
//         </div>
//       </div>
//       <div style="height: 120px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//         <div style="align-self: stretch; height: 120px; padding-right: 21px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//           <div style="color: #004643; font-size: 16px; font-family: Nunito; font-weight: 400; line-height: 24px; word-wrap: break-word">Sin perjuicio de la facultad sancionatoria que posee la OMIC, también se desarrollan distintas actividades para prevenir la <br/>comisión de infracciones y el perjuicio a los consumidores y usuarios, intentando evitar los daños antes de que sucedan. En <br/>este orden, se realizan controles periódicos a través de los inspectores de la Oficina, controlando el fiel cumplimiento de la <br/>Ley 24.240 y de la Ley Provincial 13.133, labrando actas cuando es detectada alguna irregularidad que haga presumir la <br/>comisión de infracción a la normativa vigente.</div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>