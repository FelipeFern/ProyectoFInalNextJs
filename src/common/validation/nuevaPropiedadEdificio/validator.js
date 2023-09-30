export const validateDataNuevoConsorcio = (
	datosSolicitudInscripcion,
    datosDomicilio,
	localidad,
) => {
	var regex = /^[a-zA-Z\s]+$/;
	var regexdomicilio = /^[a-zA-Z0-9\s]+$/;
	var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var regexDomicilioNumero = /^[0-9]+$/;

	let errores = {
		nombreError: '',
		dniError: '',
		cuitError: '',
        razonSocialError: '',
		sexoError: '',	
        representanteLegalError: '',
		domicilioError: '',
        codigoPostalError: '',
		telefonoCelularError: '',
		telefonoFijoError: '',
		emailError: '',
		localidadError: '',
	};

	if (datosSolicitudInscripcion.apellido == '' || !regex.test(datosSolicitudInscripcion.apellido)) {
		errores.nombreError = 'Ingrese un Apellido válido';
	}

	if (datosSolicitudInscripcion.nombre == '' || !regex.test(datosSolicitudInscripcion.nombre)) {
		errores.nombreError = 'Ingrese un Nombre válido';
	}

	if (
		(datosSolicitudInscripcion.nombre == '' || !regex.test(datosSolicitudInscripcion.nombre)) &&
		(datosSolicitudInscripcion.apellido == '' || !regex.test(datosSolicitudInscripcion.apellido))
	) {
		errores.nombreError = 'Ingrese Nombre y Apellido válidos';
	}

	if (datosSolicitudInscripcion.dni.length < 7 || datosSolicitudInscripcion.dni.length === '') {
		errores.dniError = 'Ingrese DNI válido';
	}

	if (datosSolicitudInscripcion.cuit.length > 13 || datosSolicitudInscripcion.cuit.length ==0 ) {
		errores.cuitError = 'Ingrese CUIT válido';
	}
	
    if (datosSolicitudInscripcion.sexo.length < 2 ) {
		errores.sexoError = 'Ingrese una Sexo válido';
	}

	if (datosSolicitudInscripcion.razonSocial == '') {
		errores.razonSocialError = 'Ingrese una Razón Social válida';
	}


    if (datosSolicitudInscripcion.representanteLegal == '') {
		errores.representanteLegalError = 'Ingrese un Representante Legal válido';
	}

	if (datosDomicilio.telefonoCelular == '' || datosDomicilio.telefonoCelular.length < 7) {
		errores.telefonoCelularError = 'Ingrese un Teléfono Celular válido';
	}

	if (datosDomicilio.telefonoFijo.length < 7 && datosDomicilio.telefonoFijo.length > 1) {
		errores.telefonoFijoError = 'Ingrese un Teléfono Fijo válido';
	}

	if (
		datosDomicilio.domicilioNumero == '' ||
		datosDomicilio.domicilioNumero < 0 ||
		!regexDomicilioNumero.test(datosDomicilio.domicilioNumero)
	) {
		errores.domicilioError = 'Ingrese un Número de Dirección válido';
	}

	if (
		datosDomicilio.domicilioCalle == '' ||
		!regexdomicilio.test(datosDomicilio.domicilioCalle)
	) {
		errores.domicilioError = 'Ingrese un Domicilio válida';
	}

	if (datosDomicilio.email == '' || !regexEmail.test(datosDomicilio.email)) {
		errores.emailError = 'Ingrese un Email válido';
	}

	if (localidad == '' || !regex.test(localidad.nombre)) {
		errores.localidadError = 'Seleccione una Localidad válida';
	}

	return errores;
};
