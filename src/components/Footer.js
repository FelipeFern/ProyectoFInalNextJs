export default function Footer() {
	return (
		<div className='bg-white w-full p-8'>
			<hr className='my-4' />

			<div className='flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start '>
				<div className='max-w-xs text-center md:text-left'>
					<h1 className='text-3xl font-bold text-gray-900'>OMIC</h1>
					<p className='text-gray-600 text-justify'>
						La Oficina Municipal de Información al Consumidor es un organismo
						público dependiente del Honorable Concejo Deliberante de Bahía
						Blanca, instituida por medio de la Ordenanza Municipal 14.073
					</p>
				</div>
				<div className='flex justify-center gap-8'>
					<div>
						<h6 className='font-bold mb-6 uppercase'>Información</h6>
						<ul>
							<li>
								<a href='/' target='_blank'>
									Inicio
								</a>
							</li>
							<li>
								<a href='/quienes-somos'>Quienes somos</a>
							</li>
						</ul>
					</div>
					<div>
						<h6 className='font-bold mb-6 uppercase'>Oficina</h6>
						<ul>
							<li>
								<a href='https://www.bahia.gob.ar/gobierno/'>Secretaría de Gobierno</a>
							</li>
							<li>
								<a href='https://www.bahia.gob.ar/'>Bahía Blanca</a>
							</li>
							<li>
								<a
									href='https://maps.app.goo.gl/w2jBYxZ9XPrU7GBG6'
									target='_blank'
									referrerPolicy='no-referrer'
								>
									Maps
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='md:col-span-4 xl:col-span-3'>
					<h2 className='font-bold mb-6 uppercase'>Contacto</h2>
					<div className='flex flex-col gap-4'>
						<p className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
							Donado 242, Bahía Blanca
						</p>
						<p className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								'
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
								'
							</svg>
							Lunes a viernes de 8:00 a 13:00 horas.
						</p>

						<p className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
								/>
							</svg>
							denunciasomic@bahiablanca.gov.ar
						</p>

						<p className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
								/>
							</svg>
							+54 (291) 455 0383 / 0800 222 7024
						</p>
					</div>
				</div>
			</div>
			<hr className='my-1' />
        
		</div>
	);
}
