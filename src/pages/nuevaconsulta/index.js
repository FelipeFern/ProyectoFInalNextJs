import React, { useState, useEffect } from 'react';

function index() {
	const [localidades, setLocalidades] = useState([]);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [dni, setDni] = useState('');
	const [cuil, setCuil] = useState('');
	const [telefonoCelular, setTelefonoCelular] = useState('');
	const [telefonoFijo, setTelefonoFijo] = useState('');
	const [direccionCalle, setDireccionCalle] = useState('');
	const [direccionNumero, setDireccionNumero] = useState('');
	const [direccionPiso, setDireccionPiso] = useState('');
	const [email, setEmail] = useState('');

	const [localidad, setLocalidad] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [tipoConsulta, setTipoConsulta] = useState('');

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		switch (name) {
			case 'nombre':
				console.log('nombre', value);
				setNombre(value);
				break;
			case 'apellido':
				setApellido(value);
				break;
			case 'dni':
				setDni(value);
				break;
			case 'cuil':
				setCuil(value);
				break;
			case 'telefonoCelular':
				setTelefonoCelular(value);
				break;
			case 'telefonoFijo':
				setTelefonoFijo(value);
				break;
			case 'direccionCalle':
				setDireccionCalle(value);
				break;
			case 'direccionNumer':
				setDireccionNumero(value);
				break;
			case 'direccionPiso':
				setDireccionPiso(value);
				break;
			// Otros casos para actualizar otros estados...
			default:
				break;
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
	}, []);

	return (
		<div className='bg-white p-8 rounded-xl mb-8'>
			<h1 className='text-xl text-titles'>Cargar nueva consulta</h1>
			<hr className='my-6 border-gray-500/30' />
			<form>
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
								value={nombre}
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 deault'
								placeholder='Nombre(s)'
								onChange={handleInputChange}
							/>
						</div>
						<div className='w-full'>
							<input
								type='text'
								name='apellido'
								value={apellido}
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Apellido(s)'
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
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
							name='DNI'
							value={dni}
							onChange={handleInputChange}
						/>
					</div>
				</div>
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
							value={cuil}
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
							value={telefonoCelular}
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
							value={telefonoFijo}
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
								value={direccionCalle}
								onChange={handleInputChange}
							/>
						</div>
						<div className='md:w-1/4 w-full '>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Número'
								name='direccionNumero'
								value={direccionNumero}
								onChange={handleInputChange}
							/>
						</div>
						<div className='md:w-1/4 w-full'>
							<input
								type='text'
								className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
								placeholder='Piso'
								name='direccionPiso'
								value={direccionPiso}
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
							type='mail'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Email'
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
							defaultValue={'default'}
						>
							<option value='default' disabled hidden>
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
							defaultValue={'default'}
						>
							<option value='default' disabled hidden>
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
							defaultValue={'default'}
						>
							<option value='default' disabled hidden>
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
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Tipo de Consulta <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200'
							placeholder='Nombre(s)'
						/>
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							País <span className='text-red-500'>*</span>
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
				<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-8'>
					<div className='w-full md:w-1/4'>
						<p>
							Ciudad <span className='text-red-500'>*</span>
						</p>
					</div>
					<div className='flex-1'>
						<select className='w-full py-2 px-4 outline-none rounded-lg bg-gray-200 appearance-none'>
							<option value='Barquisiméto'>Barquisiméto</option>
							<option value='Bogotá'>Bogotá</option>
							<option value='Buga'>Buga</option>
							<option value='Chihuahua'>Chihuahua</option>
							<option value='Ciudad de México'>Ciudad de México</option>
							<option value='Lima'>Lima</option>
							<option value='Montevideo'>Montevideo</option>
							<option value='Caracas'>Caracas</option>
							<option value='Venezuela'>Venezuela</option>
						</select>
					</div>
				</div>
			</form>
			<hr className='my-8 border-gray-500/30' />
			<div className='flex justify-end'>
				<button className='bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors'>
					Guardar
				</button>
			</div>
		</div>
	);
}

export default index;
