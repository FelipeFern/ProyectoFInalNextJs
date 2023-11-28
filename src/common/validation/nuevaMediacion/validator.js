export const validateDataNuevaMediacion = async (datos, localidad, empresa) => {
	var regex = /^[a-zA-Z\s]+$/;
	var regexdomicilio = /^[a-zA-Z0-9\s]+$/;
	var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var regexDomicilioNumero = /^[0-9]+$/;

	let errores = {
		nombreError: '',
		dniError: '',
		telefonoCelularError: '',
		domicilioError: '',
		barrioError: '',
		localidadError: '',
		empresaError: '',
		motivoRequerimientoError: '',
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

	if (datos.telefonoCelular == '' || datos.telefonoCelular.length < 7) {
		errores.telefonoCelularError = 'Ingrese un Teléfono Celular válido';
	} else {
		errores.telefonoCelularError = '';
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

	if (datos.barrio == '') {
		errores.barrioError = 'Ingrese un Barrio válido';
	} else {
		errores.barrioError = '';
	}


	if (localidad == '' || !regex.test(localidad)) {
		errores.localidadError = 'Seleccione una Localidad válida';
	} else {
		errores.localidadError = '';
	}

	if (datos.motivoRequerimiento == '') {
		errores.motivoRequerimientoError =
			'Ingrese el motivo del requimiento para la Mediación';
	} else {
		errores.motivoRequerimientoError = '';
	}

	if (empresa == '') {
		errores.empresaError = 'Seleccione una Empresa válida';
	} else {
		errores.empresaError = '';
	}

	return errores;
};
