import React, { useState, useEffect } from 'react';

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
		direccionCalle: '',
		direccionNumero: '',
		direccionPiso: '',
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
		direccionError: '',
		emailError: '',
		localidadError: '',
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
		if (datosPersonales.dni !== 'ada') {
			setErrores((prevErrors) => ({
				...prevErrors,
				dniError: 'Tiene que tener 5 digitos',
			}));
		} else {
			setErrores((prevErrors) => ({
				...prevErrors,
				dniError: '',
			}));
		}
		console.log('errores', errores);
		console.log('Consulta guardada');
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
				response = await fetch('/api/localidades');
				data = await response.json();
				setEmpresas(data.data);
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
				{/* <div className='flex items-center mb-8'>
					<div className='w-1/4'>
						<p>Avatar</p>
					</div>
					<div className='flex-1'>
						<div className='relative mb-2'>
							<img
								src='https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulgar-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg'
								className='w-28 h-28 object-cover rounded-lg'
							/>
							<label
								htmlFor='avatar'
								className='absolute bg-gray-300 p-2 rounded-full hover:cursor-pointer -top-2 left-24'
							>
								<RiEdit2Line />
							</label>
							<input type='file' id='avatar' className='hidden' />
						</div>
						<p className='text-gray-500 text-sm'>
							Allowed file types: png, jpg, jpeg.
						</p>
					</div>
				</div> */}
				{/* NOMBRE */}
				<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Nombre completo <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1 flex items-center gap-4'>
						<div className='w-full'>
							<input
								type='text'
								name='nombre'
								value={datosPersonales.nombre}
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
								placeholder='Nombre(s)'
								onChange={handleInputChange}
							/>
						</div>
						<div className='w-full'>
							<input
								type='text'
								name='apellido'
								value={datosPersonales.apellido}
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Apellido(s)'
								onChange={handleInputChange}
							/>
						</div>
						{errores.nombreError !== '' && (
							<div className='text-red-500'>
								Error: El dni tiene que tener 5 digitos.{' '}
							</div>
						)}
					</div>
				</div>
				{/* DNI */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							DNI <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='DNI'
							name='dni'
							value={datosPersonales.dni}
							onChange={handleInputChange}
						/>
						{errores.dniError !== '' && (
							<div className='text-red-500'>
								Error: El dni tiene que tener 5 digitos.{' '}
							</div>
						)}
					</div>
				</div>
				{/* CUIL */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>CUIL</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='CUIL'
							name='cuil'
							value={datosPersonales.cuil}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* Telefono Celular */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Teléfono Celular <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Teléfono celular'
							name='telefonoCelular'
							value={datosPersonales.telefonoCelular}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* Telefono Fijo */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
					</div>
				</div>
				{/* Domicilio */}
				<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Domicilio Constituido <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1 flex items-center gap-4'>
						<div className='md:w-1/2 w-full'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
								placeholder='Dirección'
								name='direccionCalle'
								value={datosPersonales.direccionCalle}
								onChange={handleInputChange}
							/>
						</div>
						<div className='md:w-1/4 w-full '>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Número'
								name='direccionNumero'
								value={datosPersonales.direccionNumero}
								onChange={handleInputChange}
							/>
						</div>
						<div className='md:w-1/4 w-full'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Piso'
								name='direccionPiso'
								value={datosPersonales.direccionPiso}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				{/* Email */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
					</div>
				</div>
				{/* Localidad */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
					</div>
				</div>

				{/* Tipo de consulta */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
							<option value='ReintegroDeDinero'>Reintegro de dinero</option>
							<option value='BajaDelServicio'>Baja del servicio</option>
							<option value='CambioDelProducto'>Cambio del producto</option>
							<option value='CancelacionDeLaDeuda'>
								Cancelación de la deuda
							</option>
							<option value='Refacturacion'>Refacturación</option>
							<option value='InformaciónClaraCiertaDetallada'>
								Informacion clara, cierta y detallada
							</option>
							<option value='otro'>Otros</option>
						</select>
					</div>
				</div>
				{/* Otro tipo de consulta */}
				{tipoConsulta === 'otro' && (
					<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
						<div className='w-full md:w-1/4'>
							<p>
								Otro tipo de consulta <span className='text-red-500'>*</span>
							</p>
						</div>
						<div className='flex-1'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Descripción'
							/>
						</div>
					</div>
				)}
				{/* Empresa */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
								Seleccione el pais
							</option>
							<option value='Argentina' className='text-blue'>
								Argentina
							</option>
							<option value='Colombia'>Colombia</option>
							<option value='México'>Mexico</option>
							<option value='Perú'>Perú</option>
							<option value='Uruguay'>Uruguay</option>
							<option value='Venezuela'>Venezuela</option>
						</select>
					</div>
				</div>
				{/* Descripcion */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Descripción <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Descripción'
						/>
					</div>
				</div>
				{/* Documentos */}
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
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
