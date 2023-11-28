export const validateDataNuevaConsulta = (datos, localidad, empresa) => {
	var regex = /^[a-zA-Z\s]+$/;
	var regexdomicilio = /^[a-zA-Z0-9\s]+$/;
	var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var regexDomicilioNumero = /^[0-9]+$/;

	let errores = {
		nombreError: '',
		dniError: '',
		cuilError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		domicilioError: '',
		localidadError: '',
		empresaError: '',
		hechosError: '',
	};

	if (datos.apellido == '' || !regex.test(datos.apellido)) {
		errores.nombreError = 'Ingrese un Apellido válido';
	} else if (datos.nombre == '' || !regex.test(datos.nombre)) {
		errores.nombreError = 'Ingrese un Nombre válido';
	} else if (
		(datos.nombre == '' || !regex.test(datos.nombre)) &&
		(datos.apellido == '' || !regex.test(datos.apellido))
	) {
		errores.nombreError = 'Ingrese Nombre y Apellido válidos';
	} else {
		errores.nombreError = '';
	}

	if (datos.dni.length < 7 || datos.dni.length === '') {
		errores.dniError = 'Ingrese DNI válido';
	} else {
		errores.dniError = '';
	}

	if (datos.cuil.length < 7 && datos.cuil.length > 1) {
		errores.cuilError = 'Ingrese CUIL válido';
	} else {
		errores.cuilError = '';
	}

	if (datos.telefonoCelular == '' || datos.telefonoCelular.length < 7) {
		errores.telefonoCelularError = 'Ingrese un Teléfono Celular válido';
	} else {
		errores.telefonoCelularError = '';
	}

	if (datos.telefonoFijo.length < 7 && datos.telefonoFijo.length > 1) {
		errores.telefonoFijoError = 'Ingrese un Teléfono Fijo válido';
	} else {
		errores.telefonoFijoError = '';
	}

	if (
		datos.domicilioNumero == '' ||
		datos.domicilioNumero < 0 ||
		!regexDomicilioNumero.test(datos.domicilioNumero)
	) {
		errores.domicilioError = 'Ingrese un Número de Dirección válido';
	} else if (
		datos.domicilioCalle == '' ||
		!regexdomicilio.test(datos.domicilioCalle)
	) {
		errores.domicilioError = 'Ingrese una Dirección válida';
	} else {
		errores.domicilioError = '';
	}

	if (localidad == '' || !regex.test(localidad)) {
		errores.localidadError = 'Seleccione una Localidad válida';
	} else {
		errores.localidadError = '';
	}

	if (empresa == '' || !regex.test(empresa)) {
		errores.empresaError = 'Seleccione una Empresa válida';
	} else {
		errores.empresaError = '';
	}

	if (datos.hechos == '') {
		errores.hechosError =
			'Ingrese los hechos correspondientes a la nueva consulta';
	} else {
		errores.hechosError = '';
	}

	return errores;
};
