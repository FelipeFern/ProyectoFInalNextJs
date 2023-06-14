export const validateDataNuevaConsulta = (datos) => {
	console.log('DATOS', datos);
	var regex = /^[a-zA-Z\s]+$/;
	var regexDireccion = /^[a-zA-Z0-9\s]+$/;
	var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let errores = {
		nombreError: '',
		dniError: '',
		cuilError: '',
		telefonoCelularError: 'asd',
		telefonoFijoError: '',
		direccionError: 'asd',
		emailError: 'ads',
		localidadError: 'asd',
	};

	if (datos.apellido == '' || !regex.test(datos.apellido)) {
		errores.nombreError = 'Ingrese un Apellido válido';
	}

	if (datos.nombre == '' || !regex.test(datos.nombre)) {
		errores.nombreError = 'Ingrese un Nombre válido';
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

	if (datos.direccionNumero == '') {
		errores.direccionError = 'Ingrese un Número de Dirección válido';
	}

	if (
		datos.direccionCalle == '' ||
		!regexDireccion.test(datos.direccionCalle)
	) {
		errores.direccionError = 'Ingrese una Dirección válida';
	}

	if (datos.email == '' || !regexEmail.test(datos.email)) {
		errores.emailError = 'Ingrese un Email válido';
	}

	return errores;
};
