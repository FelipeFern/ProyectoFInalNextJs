export const validateNuevoUsuario = (
	datosUsuario  
) => {
	var regex = /^[a-zA-Z\s]+$/;
	var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let errores = {
		nombreError: '',
		apellidoError: '',
		emailError: '',
		passwordError: '',
		repeatedPasswordError: '',
	};

	if (datosUsuario.apellido == '' || !regex.test(datosUsuario.apellido)) {
		errores.apellidoError = 'Ingrese un Apellido válido';
	} else {
		errores.apellidoError = '';
	}

	if (datosUsuario.nombre == '' || !regex.test(datosUsuario.nombre)) {
		errores.nombreError = 'Ingrese un Nombre válido';
	} else {
		errores.nombreError = '';
	}

	if (datosUsuario.email == '' || !regexEmail.test(datosUsuario.email)) {
		errores.emailError = 'Ingrese un Email válido';
	} else {
		errores.emailError = '';
	}

	if (datosUsuario.password.length < 7 || datosUsuario.password.length === '') {
		errores.passwordError = 'Ingrese una contraseña mayor a 8 caracteres';
	} else {
		errores.passwordError = '';
	}

	if (datosUsuario.repeatedPassword.length == 0 || datosUsuario.repeatedPassword !== datosUsuario.password ) {
		errores.repeatedPasswordError = 'Las contraseñas no coinciden';
	} else {
		errores.repeatedPasswordError = '';
	}

	return errores;
};


