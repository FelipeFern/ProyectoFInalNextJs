export const validateDataNuevaConsulta = (datos, localidad, empresa, tipoConsulta) => {
	console.log('DATOS', datos);
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
		emailError: '',
		localidadError: '',
		tipoConsultaError:'',
		empresaError: '',
	};

	if (datos.apellido == '' || !regex.test(datos.apellido)) {
		errores.nombreError = 'Ingrese un Apellido válido';
	}

	if (datos.nombre == '' || !regex.test(datos.nombre)) {
		errores.nombreError = 'Ingrese un Nombre válido';
	}

	if ((datos.nombre == '' || !regex.test(datos.nombre))  && (datos.apellido == '' || !regex.test(datos.apellido))) {
		errores.nombreError = 'Ingrese Nombre y Apellido válidos';
	}

	if (datos.dni.length < 7 || datos.dni.length === '') {
		errores.dniError = 'Ingrese DNI válido';
	}

	if (datos.cuil.length < 7 && datos.cuil.length > 1) {
		errores.cuilError = 'Ingrese CUIL válido';
	}

	if (datos.telefonoCelular == '' || datos.telefonoCelular.length < 7) {
		errores.telefonoCelularError = 'Ingrese un Teléfono Celular válido';
	}

	if (datos.telefonoFijo.length < 7 && datos.telefonoFijo.length > 1) {
		errores.telefonoFijoError = 'Ingrese un Teléfono Fijo válido';
	}

	if (datos.domicilioNumero == '' || datos.domicilioNumero < 0 || !regexDomicilioNumero.test(datos.domicilioNumero)) {
		errores.domicilioError = 'Ingrese un Número de Dirección válido';
	}

	if (
		datos.domicilioCalle == '' ||
		!regexdomicilio.test(datos.domicilioCalle)
	) {
		errores.domicilioError = 'Ingrese una Dirección válida';
	}

	if (datos.email == '' || !regexEmail.test(datos.email)) {
		errores.emailError = 'Ingrese un Email válido';
	}

	if (localidad == '' || !regex.test(localidad)) {
		errores.localidadError = 'Seleccione una Localidad válida';
	}

	if (tipoConsulta == '' || !regex.test(tipoConsulta)) {
		errores.tipoConsultaError = 'Seleccione un Tipo de Consulta válida';
	}

	if (empresa == '' || !regex.test(empresa)) {
		errores.empresaError = 'Seleccione una Empresa válida';
	}

	return errores;
};
