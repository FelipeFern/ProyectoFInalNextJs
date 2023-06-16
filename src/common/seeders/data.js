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
		nombre: 'Solicitud',
		descripcion:
			'La más básica, donde el ciudadano decide o pide por algo.',
	},
	{
		nombre: 'Mediacion Comunitaria',
		descripcion:
			'Gestiones de reclamos, donde se realiza una mediación entre las partes',
	},
	{
		nombre: 'Registro de Administradores de Edificios',
		descripcion:
			'Audiencias de conciliación, donde se realiza una mediación y se realiza una audiencia (expecie de juicio)',
	},
	{
		nombre: 'Audiencia',
		descripcion:
			'Audiencias de conciliación, donde se realiza una mediación y se realiza una audiencia (expecie de juicio)',
	},
];

export const tipoSolicitudes = [
	{
		nombre: 'Reintegro de dinero',
		documentacionObligatoria:[
			'Factura de compra',
			'Factura de servicio',
			'Contrato',
			'Certificado de garantía',
			'Informes del servicio téccnico',
			'Fotocopia de DNI'
		]
	},
	{
		nombre: 'Baja del servicio',
		documentacionObligatoria:[
			'Factura de compra',
			'Factura de servicio',
			'Contrato',
			'Certificado de garantía',
			'Informes del servicio téccnico',
			'Fotocopia de DNI'
		]
	},
	{
		nombre: 'Cambio del producto',
		documentacionObligatoria:[
			'Factura de compra',
			'Factura de servicio',
			'Contrato',
			'Certificado de garantía',
			'Informes del servicio téccnico',
			'Fotocopia de DNI'
		]
	},
	{
		nombre: 'Refacturación',
		documentacionObligatoria:[
			'Factura de compra',
			'Factura de servicio',
			'Contrato',
			'Certificado de garantía',
			'Informes del servicio téccnico',
			'Fotocopia de DNI'
		]
	},
	{
		nombre: 'Cancelación de la deuda',
		documentacionObligatoria:[
			'Factura de compra',
			'Factura de servicio',
			'Contrato',
			'Certificado de garantía',
			'Informes del servicio téccnico',
			'Fotocopia de DNI'
		]
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
		nombre: 'EDES',
		domicilio: 'Moreno 79',
		telefono: '456 2727',
		enteReguladorNombre: 'OCEBA',
		enteReguladorNombreCompleto: 'Organismo de Control de Energía Eléctrica de la Provincia de Buenos Aires',
		enteReguladorDomicilio: 'Berutti 425',
		enteReguladorTelefono: '456 1148',
		enteReguladorWEB: 'http://www.oceba.gba.gov.ar/',
	},
	{
		nombre: 'ABSA',
		domicilio: 'Zelarrayán 640',
		telefono: '455 8400',
		enteReguladorNombre: 'OCABA',
		enteReguladorNombreCompleto: 'Organismo de Control de Aguas de Buenos Aires',
		enteReguladorDomicilio: 'Vieytes 330',
		enteReguladorTelefono: '452 2830',
		enteReguladorWEB: 'http://www.ocaba.mosp.gba.gov.ar',
	},
	{
		nombre: 'CAMUZZI',
		domicilio: 'Av. Colón 790',
		telefono: '459 5821',
		enteReguladorNombre: 'ENARGAS',
		enteReguladorNombreCompleto: 'Ente Nacional Regulador del Gas',
		enteReguladorDomicilio: 'Belgrano 321',
		enteReguladorTelefono: '454 4599',
		enteReguladorWEB: 'http://www.enargas.gov.ar',
	},
	{
		nombre: 'Telefónica de Argentina',
		domicilio: 'Berutti 62',
		telefono: '455 6552',
		enteReguladorNombre: 'CNC',
		enteReguladorNombreCompleto: 'Comisión Nacional de Comunicaciones ',
		enteReguladorDomicilio: 'Las Heras 24',
		enteReguladorTelefono: '450 2475',
		enteReguladorWEB: 'https://www.enacom.gob.ar/',
	},
];

export const denunciantes = [
	{
		nombre: 'CAMUZZI',
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
