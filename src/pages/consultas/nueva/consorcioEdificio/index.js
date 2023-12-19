import React, { useState, useEffect } from 'react';
import { validateDataNuevoConsorcio } from '@/common/validation/nuevaPropiedadEdificio/validator';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useSession, signOut } from 'next-auth/react';

function Index() {
	const [localidades, setLocalidades] = useState([]);
	const [loading, setLoading] = useState(true);
	const { data: session, status, update } = useSession();
	const router = useRouter();

	// if (status === 'loading') {
	// 	return <p>Cargando...</p>;
	// }

	// const isAuthenticated = (session?.user && session.user.role === 'Ciudadano') || session.user.role === 'Admin';
	// if (typeof window !== 'undefined') {
	// 	if (!isAuthenticated) {
	// 		router.push('/');
	// 	}
	// }


	const [datosSolicitudInscripcion, setDatosSolicitudInscripcion] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		cuit: '',
		sexo: '',
		razonSocial: '',
		representanteLegal: '',
	});

	const [datosDomicilio, setDatosDomicilio] = useState({
		domicilioCalle: '',
		domicilioNumero: '',
		domicilioPiso: '',
		domicilioDpto: '',
		codigoPostal: '',
		telefonoCelular: '',
		telefonoFijo: '',
		partido: 'Bahía Blanca',
		provincia: 'Buenos Aires',
	});

	const [localidad, setLocalidad] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);

	let [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		cuitError: '',
		razonSocialError: '',
		representanteLegalError: '',
		domicilioError: '',
		codigoPostalError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		emailError: '',
		localidadError: '',
		tipoConsultaError: '',
	});

	const handleInputChangeSolicitud = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		setDatosSolicitudInscripcion((datosSolicitudInscipcion) => ({
			...datosSolicitudInscipcion,
			[name]: value,
		}));
	};

	function handleInputLocalidad(event) {
		const target = event.target;
		const value = target.value;
		setLocalidad(value);
	}

	const handleInputChangeDomicilio = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		setDatosDomicilio((datosDomicilio) => ({
			...datosDomicilio,
			[name]: value,
		}));
	};

	const handleFilesSelected = async (event) => {
		const files = event.target.files;
		const _files = Array.from(event.target.files);
		console.log(files);
		setFiles(_files);
		const fileNames = Array.from(files).map((file) => file.name);
		setSelectedFiles(fileNames);
	};

	const saveConsulta = async (event) => {
		event.preventDefault();

		let errors = validateDataNuevoConsorcio(
			datosSolicitudInscripcion,
			datosDomicilio,
			localidad
		);
		setErrores(errors);
		const noExistenErrores = Object.values(errors).every(
			(valor) => valor === ''
		);
		if (noExistenErrores) {
			try {
				const formData = new FormData();

				formData.append('nombre', datosSolicitudInscripcion.nombre);
				formData.append('apellido', datosSolicitudInscripcion.apellido);
				formData.append('dni', datosSolicitudInscripcion.dni);
				formData.append('cuit', datosSolicitudInscripcion.cuit);
				formData.append('sexo', datosSolicitudInscripcion.sexo);
				formData.append('razonSocial', datosSolicitudInscripcion.razonSocial);
				formData.append(
					'representanteLegal',
					datosSolicitudInscripcion.representanteLegal
				);

				formData.append('telefonoCelular', datosDomicilio.telefonoCelular);
				formData.append('telefonoFijo', datosDomicilio.telefonoFijo);
				formData.append('domicilioCalle', datosDomicilio.domicilioCalle);
				formData.append('domicilioNumero', datosDomicilio.domicilioNumero);
				formData.append('domicilioPiso', datosDomicilio.domicilioPiso);
				formData.append('domicilioDpto', datosDomicilio.domicilioDpto);
				formData.append('localidad', localidad);
				formData.append('partido', 'Bahía Blanca');
				formData.append('provincia', 'Buenos Aires');
				formData.append('responsable', session.user.id)
				formData.append('email', session.user.email)

				for (let i = 0; i < files.length; i++) {
					formData.append(`archivos`, files[i]);
				}

				console.log(files);
				const response = await fetch('/api/solicitudes/consorcioEdificio', {
					method: 'POST',
					body: formData,
				});

				if (response.ok) {
					const data = await response.json();
					const id = data.id;
					toast.success(
						'Nuevo solicitud de Registro de Administradored de Edificio guardada correctamente!'
					);
					router.push(`/consultas/detalles/${id}`);
				} else {
					response.json().then((errorData) => {
						setErrores((prevErrores) => ({
							...prevErrores,
							documentosError: errorData.error,
						}));
						console.log('Mensaje de error: ' + errorData.error);
					});
				}
			} catch (error) {
				console.error('Error en la solicitud POST:', error);

				// Realizar cualquier acción adicional aquí, como mostrar un mensaje de error
			}
		} else {
			toast.error('Se han encontrado errores en el formulario');
		}
	};

	function checkErrors(errors) {}

	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				let response = await fetch('/api/localidades');
				let data = await response.json();
				let localidadesArray = data.data.sort((a, b) =>
					a.nombre.localeCompare(b.nombre)
				);
				setLocalidades(localidadesArray);

				setLoading(false);
			};

			fetchData().catch((error) => {
				console.error(error);
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<PageLayout title='Nuevo consorcio edificio'>
			<div className='mt-4 px-4  text-center md:px-8 md:mt-8  lg:px-20 lg:mt-10 md:text-left'>
				<div className='px-8'>
					<h1 className='text-3xl font-semibold'>
						Cargar registro propiedad de edificios
					</h1>
					<br></br>
					<h4 className='text-lg text-titles'>
						Programa de Información y Ordenamiento de la Actividad de
						Administradores de Consorcios de Propiedad Horizontal
					</h4>
				</div>
				<div className='bg-white p-8 rounded-xl mb-8'>
					<h3 className='text-xl font-bold'>Solicitud de Inscripción</h3>
					<hr className='my-6 border-gray-500/30' />
					<form onSubmit={saveConsulta} encType='multipart/form-data'>
						{/* NOMBRE */}
						<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Nombre completo <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<div className='flex items-center gap-4'>
									<div className='w-full'>
										<input
											type='text'
											name='nombre'
											value={datosSolicitudInscripcion.nombre}
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border deault'
											placeholder='Nombre(s) *'
											onChange={handleInputChangeSolicitud}
										/>
									</div>
									<div className='w-full'>
										<input
											type='text'
											name='apellido'
											value={datosSolicitudInscripcion.apellido}
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Apellido(s) *'
											onChange={handleInputChangeSolicitud}
										/>
									</div>
								</div>

								{errores.nombreError !== '' && (
									<div className='text-red-500 '> {errores.nombreError}</div>
								)}
							</div>
						</div>
						{/* DNI */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									DNI <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='DNI *'
									name='dni'
									value={datosSolicitudInscripcion.dni}
									onChange={handleInputChangeSolicitud}
								/>
								{errores.dniError !== '' && (
									<div className='text-red-500'> {errores.dniError}</div>
								)}
							</div>
						</div>
						{/* CUIT */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>CUIT</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='CUIT *'
									name='cuit'
									value={datosSolicitudInscripcion.cuit}
									onChange={handleInputChangeSolicitud}
								/>

								{errores.cuitError !== '' && (
									<div className='text-red-500 '> {errores.cuitError}</div>
								)}
							</div>
						</div>
						{/* Sexo */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>Sexo </p>
							</div>
							<div className='flex-1'>
								<select
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border appearance-none'
									name='sexo'
									value={datosSolicitudInscripcion.sexo}
									onChange={handleInputChangeSolicitud}
								>
									<option value='' disabled hidden>
										Seleccionar sexo
									</option>
									<option value='Femenino'>Femenino</option>
									<option value='Masculino'>Masculino</option>
								</select>

								{errores.sexoError !== '' && (
									<div className='text-red-500 '> {errores.sexoError}</div>
								)}
							</div>
						</div>
						{/* Razon social */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>Razón Social</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Razón Social *'
									name='razonSocial'
									value={datosSolicitudInscripcion.razonSocial}
									onChange={handleInputChangeSolicitud}
								/>

								{errores.razonSocialError !== '' && (
									<div className='text-red-500 '>
										{' '}
										{errores.razonSocialError}
									</div>
								)}
							</div>
						</div>
						{/* Representante Legal */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>Representante Legal </p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Representante Legal *'
									name='representanteLegal'
									value={datosSolicitudInscripcion.representanteLegal}
									onChange={handleInputChangeSolicitud}
								/>

								{errores.representanteLegalError !== '' && (
									<div className='text-red-500 '>
										{' '}
										{errores.representanteLegalError}
									</div>
								)}
							</div>
						</div>

						<hr className='my-6 border-gray-500/30' />
						<h3 className='text-xl  my-6 text-titles'>Domicilio</h3>

						{/* Domicilio */}
						<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Domicilio Constituido <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<div className='flex items-center gap-4'>
									<div className='md:w-1/8 w-full'>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border deault'
											placeholder='Dirección *'
											name='domicilioCalle'
											value={datosDomicilio.domicilioCalle}
											onChange={handleInputChangeDomicilio}
										/>
									</div>
									<div className='md:w-1/2 w-full '>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Número *'
											name='domicilioNumero'
											value={datosDomicilio.domicilioNumero}
											onChange={handleInputChangeDomicilio}
										/>
									</div>
									<div className='md:w-1/2 w-full'>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Piso'
											name='domicilioPiso'
											value={datosDomicilio.domicilioPiso}
											onChange={handleInputChangeDomicilio}
										/>
									</div>
									<div className='md:w-1/2 w-full'>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Depto'
											name='domicilioDpto'
											value={datosDomicilio.domicilioDpto}
											onChange={handleInputChangeDomicilio}
										/>
									</div>
								</div>

								{errores.domicilioError !== '' && (
									<div className='text-red-500 '> {errores.domicilioError}</div>
								)}
							</div>
						</div>

						{/* Telefono Celular */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Teléfono Celular <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Teléfono celular *'
									name='telefonoCelular'
									value={datosDomicilio.telefonoCelular}
									onChange={handleInputChangeDomicilio}
								/>
								{errores.telefonoCelularError !== '' && (
									<div className='text-red-500 '>
										{errores.telefonoCelularError}
									</div>
								)}
							</div>
						</div>
						{/* Telefono Fijo */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>Teléfono Fijo</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Teléfono Fijo'
									name='telefonoFijo'
									value={datosDomicilio.telefonoFijo}
									onChange={handleInputChangeDomicilio}
								/>
								{errores.telefonoFijoError !== '' && (
									<div className='text-red-500 '>
										{errores.telefonoFijoError}
									</div>
								)}
							</div>
						</div>

				
						{/* Localidad */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Localidad <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<select
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border appearance-none'
									name='localidad'
									value={localidad}
									onChange={handleInputLocalidad}
								>
									<option value='' disabled hidden>
										Localidad
									</option>
									{localidades.map((localidad) => (
										<option key={localidad.nombre} value={localidad.nombre}>
											{localidad.nombre}
										</option>
									))}
								</select>
								{errores.localidadError !== '' && (
									<div className='text-red-500 '>{errores.localidadError}</div>
								)}
							</div>
						</div>

						{/* Partido */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Partido <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1'>
								<input
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Partido'
									name='partido'
									value={datosDomicilio.partido}
									onChange={handleInputChangeDomicilio}
									readOnly
								/>
								{errores.partidoError !== '' && (
									<div className='text-red-500 '> {errores.partidoError}</div>
								)}
							</div>
						</div>
						{/* Provincia */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Provincia <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<input
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Provincia'
									name='provincia'
									value={datosDomicilio.provincia}
									onChange={handleInputChangeDomicilio}
									readOnly
								/>
								{errores.provinciaError !== '' && (
									<div className='text-red-500 '>{errores.provinciaError}</div>
								)}
							</div>
						</div>

						<hr className='my-6 border-gray-500/30' />
						<h3 className='text-xl  my-6 text-titles'>Documentación adjunta</h3>

						{/* Documentos */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 '>
							<div className='w-full md:w-1/4'>
								<p>
									Documentos (Original y copia)
									<span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<div>
									<input
										type='file'
										id='archivos'
										name='archivos'
										className='hidden md:w-1/2'
										multiple
										onChange={handleFilesSelected}
									/>
									<label
										htmlFor='archivos'
										className='w-full md:w-1/2 flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white  leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
									>
										Seleccionar documentos
									</label>
									{errores.documentosError !== '' && (
										<div className='text-red-500 '>
											{errores.documentosError}
										</div>
									)}
								</div>

								<div
									id='lista-archivos'
									className='flex  flex-wrap gap-2 text-gray-400 text-sm mt-4'
								>
									{selectedFiles.map((fileName, index) => (
										<React.Fragment key={fileName}>
											{index > 0 && index < selectedFiles.length - 1 && '-'}
											<span>{fileName}</span>
										</React.Fragment>
									))}
								</div>
							</div>
						</div>
						{/* Documentacion */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>Documentos obligatorios</p>
							</div>
							<div className='flex-1 '>
								<div className='w-full text-xs mt-4'>
									{' '}
									<ul>
										<li>* Inscripción en AFIP.</li>
										<li>* Inscripción en ARBA.</li>
										<li>
											* Currículum Vitae con acreditación de: Documentación de
											títulos y/o estudios relacionados con la actividad y
											acreditación de experiencia (si los tuviera).
										</li>
										<li>
											* Nómima de consorcios administrados, indicando el
											domicilio de los mismos, detalle de Compañia Aseguradora,
											número de póliza y cobertura vigente.
										</li>
										<li>
											* Certificado expedido por el Registro Nacional de
											Reincidencia.
										</li>
										<li>
											* Informe expedido por el Registro de Juicios Universales
										</li>
									</ul>{' '}
								</div>
							</div>
						</div>
						<hr className='my-8 border-gray-500/30' />
						<div className='flex justify-end'>
							<button className='bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors'>
								Guardar
							</button>
						</div>
					</form>
				</div>
			</div>
		</PageLayout>
	);
}

export default Index;
