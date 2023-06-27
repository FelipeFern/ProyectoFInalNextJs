import React, { useState, useEffect } from 'react';
import { validateDataNuevaConsulta } from '@/common/validation/nuevaConsulta/validator';

function index() {
	const [localidades, setLocalidades] = useState([]);
	const [loading, setLoading] = useState(true);

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
		email: '',
		localidad: '',
		partido: '',
		provincia: '',
	});

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]);

	const [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		cuitError: '',
		razonSocialError: '',
		sexoError: '',
		representanteLegalError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		domicilioError: '',
		emailError: '',
		localidadError: '',
		tipoConsultaError: '',
		empresaError: '',
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

	const handleInputChangeDomicilio = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		setDatosSolicitudInscripcion((datosSolicitudInscipcion) => ({
			...datosSolicitudInscipcion,
			[name]: value,
		}));
	};

	const saveConsulta = async (event) => {
		event.preventDefault();

		let errors = validateDataNuevaConsulta(
			datosPersonales,
			localidad,
			empresa,
			tipoConsulta
		);
		setErrores(errors);
		for (let i = 0; i < errors.length; i++) {}

		try {
			const datosPersonales1 = {
				nombre: 'Nombre',
				apellido: 'Apellido',
				dni: 'DNI',
				cuit: 'CUIL',
				telefonoCelular: 'Celular',
				telefonoFijo: 'Fijo',
				domicilioCalle: 'Direccion Calle',
				domicilioNumero: 'Direccion Numero',
				domicilioPiso: 'Direccion Piso',
				email: 'email@gmail.com',
			};

			let consultaID = new Date();

			const response = await fetch('/api/solicitudes/tiposSolicitudes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...datosPersonales1,
					localidad: localidad,
					empresa: empresa,
					tipoConsulta: tipoConsulta,
				}),
			});

			if (response.ok) {
				// La solicitud fue exitosa
				console.log('Solicitud POST exitosa');
				// Realizar cualquier acción adicional aquí, como mostrar un mensaje de éxito
			} else {
				// La solicitud no fue exitosa
				console.log('Error en la solicitud POST');
				// Realizar cualquier acción adicional aquí, como mostrar un mensaje de error
			}
		} catch (error) {
			console.error('Error en la solicitud POST:', error);
			// Realizar cualquier acción adicional aquí, como mostrar un mensaje de error
		}
	};

	const handleFilesSelected = (event) => {
		const files = event.target.files;
		const fileNames = Array.from(files).map((file) => file.name);
		setSelectedFiles(fileNames);
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			// Llamar a la función externa pasando el archivo como argumento
			handleFileUpload(file);
		}
	};

	const handleFileUpload = (file) => {
		// Aquí puedes realizar las acciones necesarias con el archivo seleccionado
		console.log('Archivo seleccionado:', file.name);
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
		<div className='bg-white p-8 rounded-xl mb-8'>
			<h1 className='text-xl text-titles'>
				Cargar registro propiedad de edificios
			</h1>
			<hr className='my-6 border-gray-500/30' />
			<h4 className='text-xl text-titles'>
				Programa de Información y Ordenamiento de la Actividad de
				Administradores de Consorcios de Propiedad Horizontal
			</h4>

			<h3 className='text-xl text-titles'>Solicitud de Inscripción</h3>
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
							<div className='w-full'>
								<input
									type='text'
									name='nombre'
									value={datosSolicitudInscripcion.nombre}
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
									placeholder='Nombre(s) *'
									onChange={handleInputChangeSolicitud}
								/>
							</div>
							<div className='w-full'>
								<input
									type='text'
									name='apellido'
									value={datosSolicitudInscripcion.apellido}
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Razón Social *'
							name='razonSocial'
							value={datosSolicitudInscripcion.razonSocial}
							onChange={handleInputChangeSolicitud}
						/>

						{errores.razonSocialError !== '' && (
							<div className='text-red-500 '> {errores.razonSocialError}</div>
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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

				<h3 className='text-xl text-titles'>Domicilio</h3>
				<hr className='my-6 border-gray-500/30' />

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
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
									placeholder='Dirección *'
									name='domicilioCalle'
									value={datosDomicilio.domicilioCalle}
									onChange={handleInputChangeDomicilio}
								/>
							</div>
							<div className='md:w-1/2 w-full '>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
									placeholder='Número *'
									name='domicilioNumero'
									value={datosDomicilio.domicilioNumero}
									onChange={handleInputChangeDomicilio}
								/>
							</div>
							<div className='md:w-1/2 w-full'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
									placeholder='Piso'
									name='domicilioPiso'
									value={datosDomicilio.domicilioPiso}
									onChange={handleInputChangeDomicilio}
								/>
							</div>
							<div className='md:w-1/2 w-full'>
								<input
									type='text'
									className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
									placeholder='Depto'
									name='domicilioDpto'
									value={datosDomicilio.domicilioPiso}
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Teléfono Fijo'
							name='telefonoFijo'
							value={datosDomicilio.telefonoFijo}
							onChange={handleInputChangeDomicilio}
						/>
						{errores.telefonoFijoError !== '' && (
							<div className='text-red-500 '>{errores.telefonoFijoError}</div>
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Email'
							name='email'
							value={datosDomicilio.email}
							onChange={handleInputChangeDomicilio}
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
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'
							name='localidad'
							value={datosDomicilio.localidad}
							onChange={handleInputChangeDomicilio}
						>
							<option value='' disabled hidden>
								Localidad
							</option>
							{localidades.map((localidad) => (
								<option key={localidad.nombre} value={localidad.id}>
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
							type='email'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Partido'
							name='partido'
							value={datosDomicilio.partido}
							onChange={handleInputChangeDomicilio}
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
							type='email'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Provincia'
							name='provincia'
							value={datosDomicilio.provincia}
							onChange={handleInputChangeDomicilio}
						/>
						{errores.provinciaError !== '' && (
							<div className='text-red-500 '>{errores.provinciaError}</div>
						)}
					</div>
				</div>

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
								className='w-full md:w-1/2 flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
							>
								Seleccionar documentos
							</label>
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
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
					<div className='w-full md:w-1/4'>
						<p>Documentos obligatorios</p>
					</div>
					<div className='flex-1 '>
						<div className='w-full text-xs mt-4'>
							{' '}
							<ul>
								<li>Inscripción en AFIP.</li>
								<li>Inscripción en ARBA.</li>
								<li>
									Currículum Vitae con acreditación de: Documentación de títulos
									y/o estudios relacionados con la actividad y acreditación de
									experiencia (si los tuviera).
								</li>
								<li>
									Nómima de consorcios administrados, indicando el domicilio de
									los mismos, detalle de Compañia Aseguradora, número de póliza
									y cobertura vigente.
								</li>
								<li>
									Certificado expedido por el Registro Nacional de Reincidencia.
								</li>
								<li>Informe expedido por el Registro de Juicios Universales</li>
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
	);
}

export default index;