export const users = [
	{
		email: 'bart@gmail.com',
		name: 'Bart',
		apellido: 'Simpsons',
		password: 'asd',
		// sectorOmic: 'Atencion al cliente',
		consultas: [],
	},
	{
		email: 'homero@gmail.com',
		name: 'Homer',
		apellido: 'Simpsons',
		password: 'asd',
		// sectorOmic: '',
		consultas: [],
	},
	{
		email: 'lisa@gmail.com',
		name: 'Lisa',
		apellido: 'Simpsons',
		password: 'asd',
		// sectorOmic: '',
		consultas: [],
	},
	{
		email: 'marge@gmail.com',
		name: 'Marge',
		apellido: 'Simpsons',
		password: 'asd',
		// sectorOmic: '',
		consultas: [],
	},
	{
		email: 'maggie@gmail.com',
		name: 'Maggie',
		apellido: 'Simpsons',
		password: 'asd',
		// sectorOmic: '',
		consultas: [],
	},
];

export const localidad = [
	{
		nombre: 'Bahia Blanca',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8000,
	},
	{
		nombre: 'Ingeniero White',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8103,
	},
	{
		nombre: 'General Daniel Cerri',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8105,
	},
	{
		nombre: 'Grünbein',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8101,
	},
	{
		nombre: 'Cabildo',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8118,
	},
	{
		nombre: 'Villa Espora',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8107,
	},
	{
		nombre: 'Villa Bordeu',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8000,
	},
	{
		nombre: 'La Vitícola',
		provincia: 'Buenos Aires',
		empresasDenunciadas: [],
		denunciantes: [],
		codigoPostal: 8122,
	},
];

export const tipoConsulta = [
	{
		nombre: 'Consulta',
		descripcion:
			'Consultas básicas sin reclamos, donde se brinda información al consumidor',
	},
	{
		nombre: 'Conciliaciones',
		descripcion:
			'Gestiones de reclamos, donde se realiza una mediación entre las partes',
	},
	{
		nombre: 'Audiencia',
		descripcion:
			'Audiencias de conciliación, donde se realiza una mediación y se realiza una audiencia (expecie de juicio)',
	},
];

export const sectorOmic = [
	{
		nombre: 'Audiencias-Abogacia Audiencias',
		area: 'Audiencias',
		empleados: [],
	},
	{
		nombre: 'Direccion-Director',
		area: 'Direccion',
		empleados: [],
	},
	{
		nombre: 'Administracion-Consultas',
		area: 'Administracion',
		empleados: [],
	},
	{
		nombre: 'Administracion-Conciliaciones',
		area: 'Administracion',
		empleados: [],
	},
];

export const empresasDenunciadas = [
	{
		nombre: 'Empresa 1',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'empresa1@gmail.com',
		direccion: 'Direccion 1',
		// localidad: 'Bahia Blanca',
	},
	{
		nombre: 'Empresa 2',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'empresa2@gmail.com',
		direccion: 'Direccion 2',
		// localidad: 'Bahia Blanca',
	},
	{
		nombre: 'Empresa 3',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'empresa3@gmail.com',
		direccion: 'Direccion 3',
		// localidad: 'Bahia Blanca',
	},
];

export const denunciantes = [
	{
		nombre: 'Denunciante 1',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'denunciante1@gmail.com',
		direccion: 'Direccion 1',
		telefonoFijo: '2911234567',
		telefonoCelular: '2911234567',
		domicilio: 'Domicilio 1',
		// localidad: 'Bahia Blanca',
	},
	{
		nombre: 'Denunciante 1',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'denunciante1@gmail.com',
		direccion: 'Direccion 1',
		telefonoFijo: '2911234567',
		telefonoCelular: '2911234567',
		domicilio: 'Domicilio 1',
		// localidad: 'Bahia Blanca',
	},
	{
		nombre: 'Denunciante 1',
		cuit: '123456789',
		telefono: '2911234567',
		email: 'denunciante1@gmail.com',
		direccion: 'Direccion 1',
		telefonoFijo: '2911234567',
		telefonoCelular: '2911234567',
		domicilio: 'Domicilio 1',
		// localidad: 'Bahia Blanca',
	},
];

export const estadoConsulta = [
	{
		nombre: 'En proceso',
		descripcion: 'La consulta se encuentra en proceso',
		// consulta: consulta.id,
		// tipoConsulta: tipoConsulta.id,
		// sectorOmic: sectorOmic.id,
		// empleadoAsignado: empleado.id,
	},
];

export const consultas = [
	{
		archivos: [],
		// ultimoEstadoConsulta: estadoConsulta.id,
		estadosConsulta: [],
		// empresaDenunciada: empresasDenunciadas.id,
		// denunciante: denunciantes.id,
	},
];
