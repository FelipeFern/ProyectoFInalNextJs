import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {toast } from 'sonner';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import PageLayout from '@/layouts/PageLayout';
import {
	AtIcon,
	CheckIcon,
	CloseEyeIcon,
	OpenEyeIcon,
} from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import LoadingPage from '@/components/pages/LoadingPage';

// import { getNextAuthOptions } from './[... nextAuth]';
import { getNextAuthOptions } from '../api/auth/[...nextauth]';

export default function LoginPage() {
	const [submittingForm, setSubmittingForm] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const [loading, setLoading] = useState(true);

	const { status } = useSession();

	const router = useRouter();

	const [datosUsuario, setDatosUsuario] = useState({
		email: '',
		password: '',
	});

	const [errores, setErrores] = useState({
		emailError: '',
		passwordError: '',
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

	const logInUser = async (event) => {
		event.preventDefault();

		const result = await signIn('credentials', {
			email: datosUsuario.email,
			password: datosUsuario.password,
			redirect: false,
		});
		console.log(result)
		if (result?.error) {
			setLoginError(true);
			setSubmittingForm(false);
		}

		if (result?.ok && submittingForm) {
			toast.success('¡Sesión iniciada correctamente!');
			router.back();
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			setLoading(false);
		}
	}, [status]);

	const handleLogin = () => {
		if (!submittingForm) {
			setSubmittingForm(true);
		}
	};

	if (loading) return <LoadingPage />;

	return (
		<PageLayout title='Iniciar sesión' footer={false}>
			<div className='flex justify-center my-4  p-4'>
				<div className='border rounded-lg max-w-lg p-4'>
					<form
						onSubmit={logInUser}
						className='w-full max-w-sm mx-auto mt-10 px-10 flex flex-col items-center'
					>
						<h2 className='mb-6 font-bold text-2xl md:text-3xl'>
							Iniciar sesión
						</h2>
						{loginError && (
							<div className='bg-red-100 border border-red-600 text-red-600 p-1 mb-4 w-full text-center'>
								Email o contraseña incorrectos
							</div>
						)}
						<div className='pb-8 w-full flex justify-center relative'>
							<input
								type='email'
								id='email'
								name='email'
								onChange={handleInputChange}
								value={datosUsuario.email}
								placeholder='Email'
								className='input pr-8'
							/>
							<span className='absolute right-2 top-2'>
								<AtIcon size={18} />
							</span>
						</div>
						<div className='pb-8 w-full flex justify-center relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								name='password'
								onChange={handleInputChange}
								value={datosUsuario.password}
								placeholder='Contraseña'
								className='input pr-8'
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
						</div>

						{/* <label htmlFor="remember" className="flex self-start items-center cursor-pointer">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            onChange={handleInputChange}
            className="hidden"
          />
          <div
            className={`w-5 h-5 mr-2 cursor-pointer border-2 flex justify-center items-center transition-all rounded-sm ${
              values.remember ? 'border-secondary bg-secondary' : 'border-black'
            }`}
          >
            {values.remember && <CheckIcon size={14} />}
          </div>
          <span className="leading-none">Recordarme</span>
        </label> */}
						<button
							type='submit'
							onClick={handleLogin}
							className={`mt-6 button-primary text-white rounded-md py-1 w-36 h-10 block text-lg select-none ${
								submittingForm || !datosUsuario.email || !datosUsuario.password
									? 'pointer-events-none bg-sky-700'
									: 'bg-sky-700'
							}`}
						>
							{submittingForm ? <Loader size={24} /> : 'Iniciar sesión'}
						</button>
					</form>
					<div className='flex flex-col items-center gap-4 mt-6'>
						<Link
							href='/'
							className='text-sky-700 link-animation after:bg-sky-700'
						>
							Recuperar contraseña
						</Link>
						<div>
							<span>¿No tenés cuenta?</span>
							<Link
								href='/register'
								className='ml-4 text-sky-700 link-animation after:bg-sky-700'
							>
								Registrate
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export async function getServerSideProps(context) {
	// const session = await getSession(context);
	const session = await getServerSession(
		context.req,
		context.res,
		getNextAuthOptions(context.req, context.res)
	);

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
