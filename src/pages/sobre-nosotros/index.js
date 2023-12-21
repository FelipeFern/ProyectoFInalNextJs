import PageLayout from '@/layouts/PageLayout';

export default function AboutUsPage() {
	return (
		<PageLayout title='Sobre nosotros'>


			<div className='max-w-6xl mx-auto my-14 px-8 sm:px-16'>
				<h2 className='font-bold text-3xl md:text-4xl mb-8 uppercase'>
					Sobre Nosotros
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10'>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							Asesoramiento
						</h3>
						<p className='text-lg'>
							Dentro del marco de servicios que presta esta Oficina, el
							asesoramiento se erige como uno de los más importantes, orientando
							a los consumidores y usuarios en cuanto a sus legítimos derechos,
							cómo hacerlos valer, cómo formular sus reclamos, etc. Este
							asesoramiento es totalmente gratuito en pos de garantizar un
							servicio accesible a toda la ciudadanía.
						</p>
					</div>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							Información
						</h3>
						<p className='text-lg'>
							Desde la OMIC se brinda información a quienes se acercan a
							nuestras oficinas sobre las materias que son propias del derecho
							del consumidor, como por ejemplo, telefonía celular, servicio de
							Internet, planes de ahorro, plazos de garantías, contratos
							bancarios, tarjetas de crédito, problemas con las bases de datos
							de deudores, electrodomésticos, automotores, prendas de vestir,
							juguetes, contratación de servicios en general, etc., y en todos
							sus casos, cómo reclamar ante las empresas.
						</p>
					</div>

					<div className='w-full '>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							Educación a los Consumidores y Usuarios
						</h3>
						<p className='text-lg'>
							A partir del presente año personal de la OMIC concurrirá
							gratuitamente a escuelas, institutos, entidades sociales y demás
							instituciones a efectos de dar charlas informativas sobre el
							derecho del consumidor en general, explicando de manera sencilla y
							dinámica los derechos que protegen a consumidores y usuarios, el
							funcionamiento de esta Dependencia, comentarios sobre algunos
							casos interesantes recibidos en la OMIC, además de la evacuación
							de consultas e inquietudes de los concurrentes. Cabe destacar que
							este servicio no se encuentra limitado para alumnos o estudiantes
							de determinadas edades, sino que la educación en este tema es un
							servicio que se presta a toda la comunidad en general.
						</p>
					</div>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							Protección y defensa de los consumidores y usuarios
						</h3>
						<p className='text-lg'>
							En tanto Autoridad de Aplicación de la Ley de Defensa del
							Consumidor y del Código Provincial de Implementación de los
							Derechos de los Consumidores y Usuarios de la provincia de Buenos
							Aires, tiene a su cargo la recepción de las denuncias, la
							realización de las audiencias de conciliación y la imputación a
							las empresas por presunta infracción a la normativa protectoria de
							los consumidores en los supuestos en que no se arribó a una
							solución conciliatoria y correspondiere dicha medida.
						</p>
					</div>
					<div className='w-full xl:col-span-2'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							Prevención y control
						</h3>
						<p className='text-lg'>
							Sin perjuicio de la facultad sancionatoria que posee la OMIC,
							también se desarrollan distintas actividades para prevenir la
							comisión de infracciones y el perjuicio a los consumidores y
							usuarios, intentando evitar los daños antes de que sucedan. En
							este orden, se realizan controles periódicos a través de los
							inspectores de la Oficina, controlando el fiel cumplimiento de la
							Ley 24.240 y de la Ley Provincial 13.133, labrando actas cuando es
							detectada alguna irregularidad que haga presumir la comisión de
							infracción a la normativa vigente.
						</p>
					</div>
				</div>
			</div>

			<div className='max-w-6xl mx-auto my-32 px-8 sm:px-16'>
				<h2 className='font-bold text-3xl md:text-4xl mb-8 uppercase'>
					Reclamos
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10'>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							¿Cómo iniciar un reclamo?
						</h3>
						<p className='text-lg'>
							Simplemente inicie sesión, seleccione la opción  &apos;registrar
							reclamo &apos; y complete el formulario.
						</p>
					</div>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							¿Cuánto tarda la respuesta?
						</h3>
						<p className='text-lg'>
							El tiempo de respuesta varía según el caso y la empresa
							involucrada, pero generalmente tarda entre 3 y 5 días hábiles.
						</p>
					</div>

					<div className='w-full '>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							¿Es confidencial mi información?
						</h3>
						<p className='text-lg'>
							Sí, nos tomamos muy en serio la privacidad de nuestros usuarios.
							Sus datos personales estarán protegidos en todo momento.
						</p>
					</div>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							¿Puedo dar seguimiento a mi reclamo?
						</h3>
						<p className='text-lg'>
							Claro, la plataforma permite el seguimiento en tiempo real de su
							reclamo y mantenerse informado de su estado.
						</p>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
