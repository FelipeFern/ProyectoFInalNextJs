import PageLayout from '@/layouts/PageLayout';

export default function Home() {
	return (
		<PageLayout title='Sobre nosotros'>
			<div className='max-w-6xl mx-auto mb-28 mt-14 px-8 sm:px-16'>
				<h2 className='font-bold text-3xl md:text-4xl mb-8 uppercase'>
					Quienes Somos?
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10'>
					<div className='w-full'>
						<p className='text-lg'>
							La Oficina Municipal de Información al Consumidor es un organismo
							público dependiente del Honorable Concejo Deliberante de Bahía
							Blanca, instituida por medio de la Ordenanza Municipal 14.073,
							encontrándose dentro de sus competencias ser la autoridad de
							aplicación de la Ley Nacional Nº 24.240 de Defensa del Consumidor
							y de la Ley Provincial Nº 13.133, denominada “Código Provincial de
							Implementación de los Derechos de los Usuarios y Consumidores”,
							entre otras.
						</p>
					</div>

					<div className='w-full'>
						<p className='text-lg'>
							Dentro de las numerosas funciones y competencias que tiene la
							O.M.I.C., una de las más destacadas es la de{' '}
							<b>brindar información y asesoramiento</b> en forma totalmente
							gratuita a los consumidores y usuarios acerca de los derechos que
							les asisten como tales. Otra función importante de esta Oficina es
							la <b>educación </b> que se brinda también en forma gratuita a los
							consumidores y usuarios en general, sabiendo que a partir del
							conocimiento de nuestros derechos, podemos defendernos mejor
							frente a los abusos de los proveedores.
						</p>
					</div>
				</div>
			</div>
			<div className='max-w-6xl mx-auto my-32 px-8 sm:px-16'>
				<h2 className='font-bold text-3xl md:text-4xl mb-8 uppercase'>
					Derechos básicos de los consumidores y usuarios
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10'>
					<div className='w-full'>
						<span className='text-lg'>
							<ol className='list-disc pl-5'>
								<li>Protección de su salud y seguridad.</li>
								<li>Protección de sus intereses económicos.</li>
								<li>Contar con información adecuada y veraz.</li>
								<li>Libertad de elección.</li>
								<li>Recibir condiciones de trato digno y equitativo.</li>
								<li>Educación para el consumo.</li>
								<li>Calidad y eficiencia de los servicios públicos.</li>
							</ol>
						</span>
					</div>

					<div className='w-full'>
						<span className='text-lg'>
							<ol className='list-disc pl-5'>
								<li>
									Constitución de asociaciones de consumidores y usuarios.
								</li>
								<li>
									Contar con procedimientos eficaces para la prevención y
									solución de conflictos.
								</li>
								<li>
									La comuna establece que en los lugares de atención de
									establecimientos comerciales, y empresas de servicios
									públicos, deben exhibirse en forma visible y de fácil lectura
									los derechos básicos de consumidores y usuarios.
								</li>
							</ol>
						</span>
					</div>
				</div>
			</div>

			<div className='max-w-6xl mx-auto my-32 px-8 sm:px-16'>
				<h2 className='font-bold text-3xl md:text-4xl mb-8 uppercase'>
					Más de nosotros
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
					Denuncias
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10'>
					<div className='w-full'>
						<h3 className='text-2xl md:text-2xl font-semibold my-4'>
							¿Cómo iniciar un reclamo?
						</h3>
						<p className='text-lg'>
							Simplemente inicie sesión, seleccione la opción 'registrar
							reclamo' y complete el formulario.
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
