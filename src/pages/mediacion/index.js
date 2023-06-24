import React, { useState, useEffect } from 'react';
import { validateDataNuevaConsulta } from '@/common/validation/nuevaConsulta/validator';

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
		email: '',
		barrio: '',
		motivos: '',
	});

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [documentos, setDocumentos] = useState([]);

	const [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		telefonoCelularError: '',
		domicilioError: '',
		emailError: '',
		localidadError: '',
		tipoConsultaError: '',
		empresaError: '',
		barrioError: '',
		motivosError: '',
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === 'localidad') {
			setLocalidad(value);
		} else if (name === 'empresa') {
			setEmpresa(value);
		} else if (name === 'tipoConsulta') {
			setTipoConsulta(value);
		} else {
			setDatosPersonales((prevDatosPersonales) => ({
				...prevDatosPersonales,
				[name]: value,
			}));
		}
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
				cuil: 'CUIL',
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
	}, [tipoConsulta]);

	return (
		<div className='bg-white p-8 rounded-xl mb-8'>
			<h1 className='text-xl text-titles'>Cargar nueva mediación</h1>
			<hr className='my-6 border-gray-500/30' />
			<h2 className='text-xl text-titles'>Requirente</h2>
			<hr className='my-4 border-gray-500/30' />
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
				{/* Email */}
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
							name='motivos'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 h-48'
							placeholder='Motivos del requerimiento'
						/>
					</div>
				</div>
				{/* Documentos */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
					<div className='w-full md:w-1/4'>
						<p>
							Documentos <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1 '>
						<select className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'>
							<option value='Argentina'>Argentina</option>
							<option value='Colombia'>Colombia</option>
							<option value='México'>México</option>
							<option value='Perú'>Perú</option>
							<option value='Uruguay'>Uruguay</option>
							<option value='Venezuela'>Venezuela</option>
						</select>
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
