import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
	BorderedHeartIcon,
	BurgerMenuIcon,
	CloseIcon,
	UserIcon,
} from '@/components/shared/Icons';
import { toast } from 'sonner';

export default function Header() {
	const { data: session, status, update } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenu = () => {
		setMenuOpen(!menuOpen);
		if (!menuOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	};

	const handleSignOut = () => {
		toast.error('¡Sesión finalizada correctamente!');
		signOut();
	};

	const isPreviewEnv = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

	return (
		<header className='bg-white z-40 h-16 shadow-md px-6 fixed w-full flex items-center justify-between mb-16'>
			<div className='md:flex-1 ml-2'>
				<Link href='/' className='block w-fit'>
					{isPreviewEnv ? (
						<h1 className='font-bold text-3xl'>OMIC</h1>
					) : (
						<h1 className='font-black text-3xl'>OMIC</h1>
					)}
				</Link>
			</div>

			<nav>
				<ul className='hidden md:flex gap-4'>
					<li className='link-animation'>
						<Link href='/'>Inicio</Link>
					</li>
					{status === 'authenticated' && session.user.role === 'Ciudadano' ? (
						<li>
							<div className='relative group'>
								<button className=' link-animation'>Crear nuevo reclamo</button>
								<ul className='absolute bg-white text-gray-800 mt-2 p-2 space-y-1 w-40 border border-gray-200 rounded-lg opacity-0 invisible transition-all duration-300 transform scale-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
									<li>
										<a
											href='/consultas/nueva/consultaGeneral'
											className=' px-4 py-2 hover:bg-gray-100 link-animation hidden group-hover:block'
										>
											Consulta General
										</a>
									</li>{' '}
									<li>
										<a
											href='/consultas/nueva/mediacion'
											className='hidden group-hover:block link-animation px-4 py-2 hover:bg-gray-100'
										>
											Mediación
										</a>
									</li>
									<li>
										<a
											href='/consultas/nueva/denuncia'
											className='hidden group-hover:block link-animation px-4 py-2 hover:bg-gray-100'
										>
											Denuncia
										</a>
									</li>
									<li>
										<a
											href='/consultas/nueva/consorcioEdificio'
											className='hidden group-hover:block link-animation px-4 py-2 hover:bg-gray-100'
										>
											Registro Consorcio Edificio
										</a>
									</li>
								</ul>
							</div>
						</li>
					) : null}

					{status === 'authenticated' && session.user.role === 'Ciudadano' ? (
						<li className='link-animation'>
							<Link href='/consultas'> Mis Consultas</Link>
						</li>
					) : null}
					{status === 'authenticated' && session.user.role === 'Admin' ? (
						<li className='link-animation'>
							<Link href='/consultas'>Consultas</Link>
						</li>
					) : null}

					<li className='link-animation'>
						<Link href='/sobre-nosotros'>Sobre Nosotros</Link>
					</li>
				</ul>

				<ul
					id='menuMobile'
					className={`z-20 absolute bg-white text-xl w-screen h-screen flex flex-col items-center gap-6 py-6 px-8 top-0 transition-all duration-300 ${
						menuOpen ? 'opacity-100 right-0' : 'opacity-0 -right-full'
					} `}
				>
					<li onClick={handleMenu} className='self-end'>
						<CloseIcon size={24} />
					</li>
					<li onClick={handleMenu}>
						<Link href='/'>Inicio</Link>
					</li>
					<li onClick={handleMenu}>
						<Link href='/consultas'>Consultas</Link>
					</li>
					<li onClick={handleMenu}>
						<Link href='/consultas/nueva/consultaGeneral'>
							Nueva Consulta General
						</Link>
					</li>
					<li onClick={handleMenu}>
						<Link href='/consultas/nueva/mediacion'>Nueva Mediacion</Link>
					</li>
					<li onClick={handleMenu}>
						<Link href='/consultas/nueva/consorcioEdificio'>
							Nuevo Consorcio Edificio
						</Link>
					</li>
					<li onClick={handleMenu}>
						<Link href='/sobre-nosotros'>Sobre Nosotros</Link>
					</li>
					<div className='w-1/2 h-[2px] bg-gray-500' />
					{status === 'authenticated' ? (
						<>
							<li onClick={handleMenu}>
								<Link href='/cuenta' className='link-animation'>
									Mi cuenta
								</Link>
							</li>
							<li onClick={handleMenu}>
								<button
									type='button'
									onClick={handleSignOut}
									className='link-animation'
								>
									Cerrar sesión
								</button>
							</li>
						</>
					) : (
						<>
							<li onClick={handleMenu}>
								<Link href='/login'>Iniciar sesión</Link>
							</li>
							<li onClick={handleMenu}>
								<Link href='/register'>Registrarme</Link>
							</li>
						</>
					)}
				</ul>
			</nav>

			<div className='flex items-center gap-4 md:flex-1 md:justify-end'>
				{/* <Search /> */}
				<span className='hidden md:flex items-center relative group  '>
					{status === 'authenticated' && session.user ? (
						<span className='ml-2 pr-2'>
							{session.user.nombre} {session.user.apellido}{' '}
						</span>
					) : (
						<span className='ml-2 pr-2'>Iniciar sesión</span>
					)}

					<UserIcon />
					{status === 'authenticated' ? (
						<div className='opacity-0 top-full absolute -right-36 bg-gray-50 rounded-md shadow-md py-4 px-4 w-36 items-end gap-1 flex flex-col group-hover:-right-4 group-hover:opacity-100 transition-all duration-300'>
							<Link href='/cuenta' className='link-animation'>
								Mi cuenta
							</Link>
							<button
								type='button'
								onClick={handleSignOut}
								className='link-animation'
							>
								Cerrar sesión
							</button>
						</div>
					) : (
						<div className='opacity-0 top-full absolute -right-36 bg-gray-50 rounded-md shadow-md py-4 px-4 w-36 items-end gap-1 flex flex-col group-hover:-right-4 group-hover:opacity-100 transition-all duration-300'>
							<Link href='/login' className='link-animation'>
								Iniciar sesión
							</Link>
							<Link href='/register' className='link-animation'>
								Registrarme
							</Link>
						</div>
					)}
				</span>
				<span className='block md:hidden' onClick={handleMenu}>
					<BurgerMenuIcon />
				</span>
			</div>
			{/* <CartModal /> */}
		</header>
	);
}
