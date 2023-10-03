import React, { useState, useEffect } from 'react';
import { validateDataNuevaMediacion } from '@/common/validation/nuevaMediacion/validator';

function index() {
	const [localidades, setLocalidades] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);

	const [datosPersonales, setDatosPersonales] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		telefonoCelular: '',
		domicilioCalle: '',
		domicilioNumero: '',
		domicilioPiso: '',
		domicilioDpto: '',
		email: '',
		barrio: '',
		motivoRequerimiento: '',
	});

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);

	const [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		telefonoCelularError: '',
		domicilioError: '',
		barrioError: '',
		emailError: '',
		localidadError: '',
		empresaError: '',
		motivoRequerimientoError: '',
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === 'localidad') {
			setLocalidad(value);
		} else if (name === 'empresa') {
			console.log('empresa:' + value);
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

		let errors = await validateDataNuevaMediacion(
			datosPersonales,
			localidad,
			empresa
		);
		setErrores(errors);
		console.log(localidad + 'EMPreSA');

		const noExistenErrores = Object.values(errors).every(
			(valor) => valor === ''
		);
		console.log(noExistenErrores + 'No ecisten]');
		console.log(Object.values(errors));
		if (noExistenErrores) {
			try {
				const formData = new FormData();

				formData.append('nombre', datosPersonales.nombre);
				formData.append('apellido', datosPersonales.apellido);
				formData.append('dni', datosPersonales.dni);
				formData.append('email', datosPersonales.email);
				formData.append('barrio', datosPersonales.barrio);
				formData.append(
					'motivoRequerimiento',
					datosPersonales.motivoRequerimiento
				);
				formData.append('telefonoCelular', datosPersonales.telefonoCelular);
				formData.append('domicilioCalle', datosPersonales.domicilioCalle);
				formData.append('domicilioNumero', datosPersonales.domicilioNumero);
				formData.append('domicilioPiso', datosPersonales.domicilioPiso);
				formData.append('domicilioDpto', datosPersonales.domicilioDpto);
				formData.append('empresa', empresa);
				formData.append('localidad', localidad);
				for (let i = 0; i < files.length; i++) {
					formData.append(`archivos`, files[i]);
				}

				const response = await fetch('/api/solicitudes/nuevaMediacion', {
					method: 'POST',
					body: formData,
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
		}
	};

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
		<div>
			<div className='mb-8'>
				<h1 className='text-3xl font-semibold'>Cargar nueva mediación</h1>
			</div>
			<div className='bg-white p-8 rounded-xl mb-8'>
				<h2 className='text-xl text-titles'>Requirente</h2>
				<hr className='my-4 border-gray-500/30' />
				<form onSubmit={saveConsulta} id='formMediacion'>
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
										value={datosPersonales.nombre}
										className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
										placeholder='Nombre(s) *'
										onChange={handleInputChange}
									/>
								</div>
								<div className='w-full'>
									<input
										type='text'
										name='apellido'
										value={datosPersonales.apellido}
										className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
										className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
										placeholder='Dirección *'
										name='domicilioCalle'
										value={datosPersonales.domicilioCalle}
										onChange={handleInputChange}
									/>
								</div>
								<div className='md:w-1/4 w-full '>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
										placeholder='Número *'
										name='domicilioNumero'
										value={datosPersonales.domicilioNumero}
										onChange={handleInputChange}
									/>
								</div>
								<div className='md:w-1/4 w-full'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
					{/* Barrio */}
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
						<div className='w-full md:w-1/4'>
							<p>
								Barrio <span className='text-red-500'>*</span>
							</p>
						</div>
						<div className='flex-1'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Barrio'
								name='barrio'
								value={datosPersonales.barrio}
								onChange={handleInputChange}
							/>
							{errores.barrioError !== '' && (
								<div className='text-red-500 '> {errores.barrioError}</div>
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
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'
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

					<h2 className='text-xl mt-8 text-titles'>
						Entidad Intermedia interviniente
					</h2>
					<hr className='my-4 border-gray-500/30' />
					{/* Empresa */}
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
						<div className='w-full md:w-1/4'>
							<p>
								Empresa <span className='text-red-500'>*</span>
							</p>
						</div>
						<div className='flex-1 '>
							<select
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'
								name='empresa'
								value={empresa}
								onChange={handleInputChange}
							>
								<option value='' disabled hidden>
									Seleccione la empresa
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
					{/* Motivos */}
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
						<div className='w-full md:w-1/4'>
							<p>
								Motivo del requerimiento <span className='text-red-500'>*</span>
							</p>
						</div>
						<div className='flex-1 '>
							<textarea
								type='text'
								name='motivoRequerimiento'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 h-48'
								placeholder='Motivos del requerimiento'
								onChange={handleInputChange}
							/>
							{errores.motivoRequerimientoError !== '' && (
								<div className='text-red-500 '>
									{errores.motivoRequerimientoError}
								</div>
							)}
						</div>
					</div>

					{/* Documentos */}
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 '>
						<div className='w-full md:w-1/4'>
							<p>Documentación adicional</p>
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

					<hr className='my-8 border-gray-500/30' />
					<div className='flex justify-end'>
						<button className='bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors'>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default index;
