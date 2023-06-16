import React, { useState, useEffect } from 'react';
import { validateDataNuevaConsulta } from '@/common/validation/nuevaConsulta/validator';

function index() {
	const [localidades, setLocalidades] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [tiposConsultas, setTiposConsultas] = useState([]);
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
		email: '',
	});

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [tipoConsulta, setTipoConsulta] = useState('');

	const [errores, setErrores] = useState({
		nombreError: '',
		dniError: '',
		cuilError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		domicilioError: '',
		emailError: '',
		localidadError: '',
		tipoConsultaError:'',
		empresaError: '',
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

	const saveConsulta = (event) => {
		event.preventDefault();

		let errors = validateDataNuevaConsulta(datosPersonales, localidad, empresa, tipoConsulta);
		setErrores(errors);
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


				response = await fetch('/api/solicitudes/tiposSolicitudes');
				data = await response.json();
				let tiposArray = data.data.sort((a, b) =>
				a.nombre.localeCompare(b.nombre)
				);
				setTiposConsultas(tiposArray);
				
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
			<h1 className='text-xl text-titles'>Cargar nueva consulta</h1>
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
				{/* CUIL */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
					<div className='w-full md:w-1/4'>
						<p>CUIL</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
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
								<option key={localidad.nombre} value={localidad.id}>
									{localidad.nombre}
								</option>
							))}
						</select>
						{errores.localidadError !== '' && (
							<div className='text-red-500 '>
								 {errores.localidadError}
							</div>
						)}
					</div>
				</div>

				{/* Tipo de consulta */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
					<div className='w-full md:w-1/4'>
						<p>
							Tipo de Consulta <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1 '>
						<select
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'
							name='tipoConsulta'
							value={tipoConsulta}
							onChange={handleInputChange}
						>
							<option value='' disabled hidden>
								Seleccione el tipo de consulta
							</option>
							{tiposConsultas.map((solicitud) => (
								<option key={solicitud.nombre} value={solicitud.nombre}>
									{solicitud.nombre}
								</option>
							))}
							<option value='otro'>Otros</option>
						</select>
						{errores.tipoConsultaError !== '' && (
							<div className='text-red-500 '>
								 {errores.tipoConsultaError}
							</div>
						)}
					</div>
				</div>
				{/* Otro tipo de consulta */}
				{tipoConsulta === 'otro' && (
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
						<div className='w-full md:w-1/4'>
							<p>
								Otro tipo de consulta <span className='text-red-500'>*</span>
							</p>
						</div>
						<div className='flex-1'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Tipos de Consulta'
								name='tipoConsulta'
								value={tipoConsulta}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				)}
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
							<div className='text-red-500 '>
								 {errores.empresaError}
							</div>
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
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Hechos'
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
