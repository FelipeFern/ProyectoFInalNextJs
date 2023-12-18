import Link from 'next/link';
import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout';
import { toast } from 'sonner';
import {
	AtIcon,
	CheckIcon,
	CloseEyeIcon,
	ErrorIcon,
	OpenEyeIcon,
	UserIcon,
} from '@/components/shared/Icons';
import { validateNuevoUsuario } from '@/common/validation/register/validator';

export default function RegisterPage() {
	const [submitted, setSubmitted] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showrepeatedPassword, setShowrepeatedPassword] = useState(false);
	const router = useRouter();

	const [datosUsuario, setDatosUsuario] = useState({
		nombre: '',
		apellido: '',
		email: '',
		password: '',
		repeatedPassword: '',
	});

	const [errores, setErrores] = useState({
		nombreError: '',
		apellidoError: '',
		emailError: '',
		passwordError: '',
		repeatedPasswordError: '',
	});

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		setDatosUsuario((prevDatosUsuario) => ({
			...prevDatosUsuario,
			[name]: value,
		}));
	};

	const saveUser = async (event) => {
		event.preventDefault();

		let errors = validateNuevoUsuario(datosUsuario);
		setErrores(errors);
		const noExistenErrores = Object.values(errors).every(
			(valor) => valor === ''
		);
		if (noExistenErrores) {
			try {
				const response = await fetch('/api/auth/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(datosUsuario), // Convierte el objeto a una cadena JSON
				});

				if (response.ok) {
					const data = await response.json();
					const id = data.id;
					
					const result = await signIn('credentials', {
						email: datosUsuario.email,
						password: datosUsuario.password,
						redirect: false,
					});

					if (result?.ok ) {
						toast.success('¡Usuario registrado correctamente!');
						router.push(`/`);
					}


					// toast.success('¡Usuario registrado correctamente!');
					// router.push(`/`);
				} else {
					response.json().then((errorData) => {
						setErrores((prevErrores) => ({
							...prevErrores,
							documentosError: errorData.error,
						}));
						console.log('Mensaje de error: ' + errorData.error);
					});
				}
			} catch (error) {
				console.error('Error en la solicitud POST:', error);
				// Realizar cualquier acción adicional aquí, como mostrar un mensaje de error
			}
		}
	};

	return (
		<PageLayout title='Registro' footer={false}>
			<div className='flex justify-center my-4  p-4'>
				<div className='border rounded-lg max-w-lg p-4'>
					<form
						onSubmit={saveUser}
						className='w-full  mx-auto my-10 px-10 flex flex-col items-center '
					>
						<h2 className='mb-6 font-bold text-2xl md:text-3xl'>Registro</h2>
						<div className='flex flex-col items-center gap-1 mb-8'>
							<p className='text-gray-400 text-sm'>Registrate en el sistema</p>
						</div>
						<div className='pb-8 w-full flex justify-start relative '>
							<input
								type='text'
								id='nombre'
								name='nombre'
								onChange={handleInputChange}
								value={datosUsuario.nombre}
								placeholder='Nombre'
								className={`input  pr-8 ${
									submitted && errores.nombreError ? 'border-red-600' : null
								}`}
							/>
							<span className='absolute right-2 top-2'>
								<UserIcon size={18} />
							</span>
							<div
								className={`input-error-message overflow-hidden ${
									submitted && errores.nombreError
										? 'opacity-100 h-auto'
										: 'opacity-0 h-0'
								}`}
							>
								<span>{errores.nombreError}</span>
							</div>
						</div>
						<div className='pb-8 w-full flex justify-start relative'>
							<input
								type='text'
								id='apellido'
								name='apellido'
								onChange={handleInputChange}
								value={datosUsuario.apellido}
								placeholder='Apellido'
								className={`input pr-8 ${
									submitted && errores.apellidoError ? 'border-red-600' : null
								}`}
							/>
							<span className='absolute right-2 top-2'>
								<UserIcon size={18} />
							</span>
							<div
								className={`input-error-message overflow-hidden ${
									submitted && errores.apellidoError
										? 'opacity-100 h-auto'
										: 'opacity-0 h-0'
								}`}
							>
								<span>{errores.apellidoError}</span>
							</div>
						</div>
						<div className='pb-8 w-full flex justify-start relative'>
							<input
								type='text'
								id='email'
								name='email'
								onChange={handleInputChange}
								value={datosUsuario.email}
								placeholder='Email'
								className={`input pr-8 ${
									submitted && errores.emailError ? 'border-red-600' : null
								}`}
							/>
							<span className='absolute right-2 top-2'>
								<AtIcon size={18} className='bg-sky-500' />
							</span>
							<div
								className={`input-error-message overflow-hidden ${
									submitted && errores.emailError
										? 'opacity-100 h-auto'
										: 'opacity-0 h-0'
								}`}
							>
								<span>{errores.emailError}</span>
							</div>
						</div>
						<div className='pb-8 w-full flex justify-start relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								name='password'
								onChange={handleInputChange}
								value={datosUsuario.password}
								placeholder='Contraseña'
								className={`input pr-8 ${
									submitted && errores.passwordError ? 'border-red-600' : null
								}`}
							/>
							<span
								className='absolute right-1 top-1 cursor-pointer hover:bg-gray-200 rounded-full p-1'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<OpenEyeIcon size={21} />
								) : (
									<CloseEyeIcon size={20} />
								)}
							</span>
							<div
								className={`input-error-message overflow-hidden ${
									submitted && errores.passwordError
										? 'opacity-100 h-auto'
										: 'opacity-0 h-0'
								}`}
							>
								<span>{errores.passwordError}</span>
							</div>
						</div>
						<div className='pb-8 w-full flex justify-start relative'>
							<input
								type={showrepeatedPassword ? 'text' : 'password'}
								id='repeatedPassword'
								name='repeatedPassword'
								onChange={handleInputChange}
								value={datosUsuario.repeatedPassword}
								placeholder='Repetir contraseña'
								className={`input pr-8 ${
									submitted && errores.repeatedPasswordError
										? 'border-red-600'
										: null
								}`}
							/>
							<span
								className='absolute right-1 top-1 cursor-pointer hover:bg-gray-200 rounded-full p-1'
								onClick={() => setShowrepeatedPassword(!showrepeatedPassword)}
							>
								{showrepeatedPassword ? (
									<OpenEyeIcon size={21} />
								) : (
									<CloseEyeIcon size={20} />
								)}
							</span>
							<div
								className={`input-error-message overflow-hidden ${
									submitted && errores.repeatedPasswordError
										? 'opacity-100 h-auto'
										: 'opacity-0 h-0'
								}`}
							>
								<span>{errores.repeatedPasswordError}</span>
							</div>
						</div>

						{/* <div className='flex items-center gap-1'>
							<label
								htmlFor='terms'
								className=' self-start items-center cursor-pointer'
							>
								<div className='flex items-center'>
									<input
										type='checkbox'
										id='terms'
										name='terms'
										onChange={handleInputChange}
										className='hidden'
									/>
									<div
										className={`w-5 h-5 mr-2 cursor-pointer border-2 flex justify-start items-center transition-all rounded-sm ${
											submitted && errores.terms
												? 'border-red-600'
												: datosUsuario.terms
												? 'border-secondary bg-secondary'
												: 'border-black'
										}`}
									>
										{datosUsuario.terms && <CheckIcon size={14} />}
									</div>
									<span className='leading-none'>Acepto los</span>
								</div>
							</label>
							<Link
								href='/terminos-y-condiciones'
								target='_blank'
								className='leading-none text-secondary cursor-pointer'
							>
								términos y condiciones
							</Link>
						</div> 
						 {submitted && errores.terms ? (
							<div className='flex items-center gap-2'>
								<span className='text-sm text-red-600'>{errores.terms}</span>
							</div>
						) : null} */}
						<button
							type='submit'
							onClick={() => setSubmitted(true)}
							className='mt-6 button-primary bg-sky-700 text-white rounded-md py-1 text-lg'
						>
							Registrarme
						</button>
					</form>
					<div className='flex flex-col items-center gap-4 my-6'>
						<div>
							<span>¿Ya tenés cuenta?</span>
							<Link
								href='/login'
								className='ml-4 text-sky-700 link-animation after:bg-sky-700'
							>
								Iniciar sesión
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (session && session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
