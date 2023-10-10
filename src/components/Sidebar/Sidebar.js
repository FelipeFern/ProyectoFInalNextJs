import {
	RiDashboardLine,
	RiBuilding4Line,
	RiTable2,
	RiBriefcase3Line,
	RiFileUserLine,
	RiLogoutBoxRLine,
	RiMenu2Line,
	RiCloseLine,
	RiMapPin2Line,
} from 'react-icons/ri';
import Link from 'next/link';

import React, { useState } from 'react';

export default function Sidebar() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const hoverColor = 'bg-purple-500';

	const handleSidebar = () => {
		setOpenSidebar(!openSidebar);
	};

	return (
		<>
			{/* Sidebar */}
			<div
				className={`fixed lg:static top-0 w-[80%] md:w-[40%] lg:w-full z-50 bg-white transition-all ${
					openSidebar ? '-left-0' : '-left-full'
				}  w-full h-screen  col-span-1 p-6 border-r`}
			>
				<div className='text-center p-8'>
					<h1 className='uppercase font-bold tracking-[4px]'>Tu Logo</h1>
				</div>

				<div className=' h-[85%] flex flex-col justify-between'>
					{/* Menu */}
					<nav>
						<ul>
							<li>
								<Link
									href='/localidades'
									className={`flex items-center gap-4  hover:${hoverColor} p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold`}
								>
									<RiMapPin2Line /> Localidades
								</Link>
							</li>
							<li>
								<Link
									href='/consultas'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiTable2 /> Consultas
								</Link>
							</li>
							<li>
								<Link
									href='/nuevaConsulta'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiBriefcase3Line /> Empresas
								</Link>
							</li>
							<li>
								<Link
									href='/users'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiFileUserLine /> Empleados
								</Link>
							</li>
							<li>
								<Link
									href='/nuevaConsulta'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiFileUserLine /> Nueva Consulta
								</Link>
							</li>
							<li>
								<Link
									href='/nuevaMediacion'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiFileUserLine /> Nueva Mediación
								</Link>
							</li>
							<li>
								<Link
									href='/consorcioEdificio'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiFileUserLine /> Consorcio Edificio
								</Link>
							</li>
						</ul>
					</nav>
					{/* Images and logoout */}
					<div className='flex flex-col gap-4'>
						{/* <img src='/images/img.svg' className='wf' alt='Image' />
						<div className='bg-purple-100 p-8 flex flex-col gap-4 rounded-2xl'>
							<h3 className='text-xl text-center'>Get upgrade</h3>
							<p className='text-gray-500 text-center'>
								Upgrade to a premium account today
							</p>
							<button className=' bg-purple-600 text-white p-2 rounded-lg'>
								learn more
							</button>
						</div> */}
						<Link
							href='/'
							className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
						>
							<RiLogoutBoxRLine /> Logout
						</Link>
					</div>
				</div>
			</div>

			{/* Btn menu movil */}
			<button
				onClick={() => handleSidebar()}
				className=' block lg:hidden fixed bottom-4 right-4 bg-purple-600 text-white p-2 rounded-full text-2xl z-40'
			>
				{openSidebar ? <RiCloseLine /> : <RiMenu2Line />}
			</button>
			{/* Content */}
		</>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
