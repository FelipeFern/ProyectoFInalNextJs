import React, { useState, useEffect } from 'react';
import { validateDataNuevaConsulta } from '@/common/validation/nuevaConsulta/validator';
import PageLayout from '@/layouts/PageLayout';


function index() {
	const [localidades, setLocalidades] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);

	const [datosPersonales, setDatosPersonales] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		cuil: '',
		telefonoCelular: '',
		telefonoFijo: '',
		domicilioCalle: '',
		domicilioNumero: '',
		domicilioPiso: '',
		domicilioDpto: '',
		email: '',
		hechos: '',
	});

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [otroTipoDeConsulta, setOtroTipoDeConsulta] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);

	const [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		cuilError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		domicilioError: '',
		emailError: '',
		localidadError: '',
		empresaError: '',
		hechosError: '',
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === 'localidad') {
			setLocalidad(value);
		} else if (name === 'empresa') {
			setEmpresa(value);
		} else {
			setDatosPersonales((prevDatosPersonales) => ({
				...prevDatosPersonales,
				[name]: value,
			}));
		}
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

		let errors = validateDataNuevaConsulta(datosPersonales, localidad, empresa);
		setErrores(errors);

		console.log(datosPersonales);
		console.log(localidad);
		console.log(empresa);
		try {
			const formData = new FormData();

			formData.append('nombre', datosPersonales.nombre);
			formData.append('apellido', datosPersonales.apellido);
			formData.append('dni', datosPersonales.dni);
			formData.append('cuil', datosPersonales.cuil);
			formData.append('telefonoCelular', datosPersonales.telefonoCelular);
			formData.append('telefonoFijo', datosPersonales.telefonoFijo);
			formData.append('domicilioCalle', datosPersonales.domicilioCalle);
			formData.append('domicilioNumero', datosPersonales.domicilioNumero);
			formData.append('domicilioPiso', datosPersonales.domicilioPiso);
			formData.append('domicilioDpto', datosPersonales.domicilioDpto);
			formData.append('email', datosPersonales.email);
			formData.append('hechos', datosPersonales.hechos);
			formData.append('localidad', localidad);
			formData.append('empresa', empresa);

			for (let i = 0; i < files.length; i++) {
				formData.append(`archivos`, files[i]);
			}

			const response = await fetch('/api/solicitudes/nuevaConsulta', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				console.log('Solicitud POST exitosa');
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

				response = await fetch('/api/empresas');
				data = await response.json();
				let empresasArray = data.data.sort((a, b) =>
					a.nombre.localeCompare(b.nombre)
				);
				setEmpresas(empresasArray);

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
		<PageLayout title='Nueva consulta general'>
			<div className='mt-4 px-4  text-center md:px-8 md:mt-8  lg:px-20 lg:mt-10 md:text-left'>
				<div className=' px-8'>
					<h1 className='text-4xl font-semibold'>Cargar nueva consulta</h1>
					<br></br>
					<h4 className='text-lg text-titles'>
						Consultas generales a fin de brindar información y asesoramiento en
						forma totalmente gratuita a los consumidores y usuarios acerca de
						los derechos que les asisten como tales.
					</h4>
				</div>
				<div className='bg-white p-8 rounded-xl mb-8'>
					<h1 className='text-xl font-bold'>Información correspondiente</h1>
					<hr className='my-6 border-gray-500/30' />
					<form onSubmit={saveConsulta}>
						{/* NOMBRE */}
						<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Nombre completo <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<div className='flex items-center gap-4'>
									<div className='w-full rounded-lg '>
										<input
											type='text'
											name='nombre'
											value={datosPersonales.nombre}
											className='w-full py-2 px-4  rounded-lg border-gray-400 border  '
											placeholder='Nombre(s) *'
											onChange={handleInputChange}
										/>
									</div>
									<div className='w-full'>
										<input
											type='text'
											name='apellido'
											value={datosPersonales.apellido}
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border '
											placeholder='Apellido(s) *'
											onChange={handleInputChange}
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
									value={datosPersonales.dni}
									onChange={handleInputChange}
								/>
								{errores.dniError !== '' && (
									<div className='text-red-500'> {errores.dniError}</div>
								)}
							</div>
						</div>
						{/* CUIL */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>CUIL</p>
							</div>
							<div className='flex-1'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='CUIL *'
									name='cuil'
									value={datosPersonales.cuil}
									onChange={handleInputChange}
								/>

								{errores.cuilError !== '' && (
									<div className='text-red-500 '> {errores.cuilError}</div>
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
									value={datosPersonales.telefonoCelular}
									onChange={handleInputChange}
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
									value={datosPersonales.telefonoFijo}
									onChange={handleInputChange}
								/>
								{errores.telefonoFijoError !== '' && (
									<div className='text-red-500 '>
										{errores.telefonoFijoError}
									</div>
								)}
							</div>
						</div>
						{/* Domicilio */}
						<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Domicilio Constituido <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<div className='flex items-center gap-4'>
									<div className='md:w-1/2 w-full'>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border default'
											placeholder='Dirección *'
											name='domicilioCalle'
											value={datosPersonales.domicilioCalle}
											onChange={handleInputChange}
										/>
									</div>
									<div className='md:w-1/4 w-full '>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Número *'
											name='domicilioNumero'
											value={datosPersonales.domicilioNumero}
											onChange={handleInputChange}
										/>
									</div>
									<div className='md:w-1/4 w-full'>
										<input
											type='text'
											className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
											placeholder='Piso'
											name='domicilioPiso'
											value={datosPersonales.domicilioPiso}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								{errores.domicilioError !== '' && (
									<div className='text-red-500 '> {errores.domicilioError}</div>
								)}
							</div>
						</div>
						{/* Email */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Email <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1'>
								<input
									type='email'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
									placeholder='Email'
									name='email'
									value={datosPersonales.email}
									onChange={handleInputChange}
								/>
								{errores.emailError !== '' && (
									<div className='text-red-500 '> {errores.emailError}</div>
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
									onChange={handleInputChange}
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

						{/* Empresa */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Empresa <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<select
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border appearance-none'
									name='empresa'
									value={empresa}
									onChange={handleInputChange}
								>
									<option value='' disabled hidden>
										Seleccionar la empresa
									</option>
									{empresas.map((empresa) => (
										<option key={empresa.nombre} value={empresa.nombre}>
											{empresa.nombre}
										</option>
									))}
								</select>
								{errores.empresaError !== '' && (
									<div className='text-red-500 '>{errores.empresaError}</div>
								)}
							</div>
						</div>
						{/* Hechos */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
							<div className='w-full md:w-1/4'>
								<p>
									Hechos <span className='text-red-500'>*</span>
								</p>
							</div>
							<div className='flex-1 '>
								<textarea
									name='hechos'
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border h-48'
									placeholder='Hechos'
									onChange={handleInputChange}
								/>
								{errores.hechosError !== '' && (
									<div className='text-red-500 '>{errores.hechosError}</div>
								)}
							</div>
						</div>
						{/* Documentos */}
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

export default index;
