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
import { Link, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HeaderDashboard from './HeaderDashboard';
import Content from './Content';
import ResultsCards from './ResultsCards';
import Cards from './Cards';

export default function Dashboard() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const hoverCollor = 'bg-purple-500';

	useEffect(() => {
		document.title = 'Dashboard';
	}, []);

	const handleSidebar = () => {
		setOpenSidebar(!openSidebar);
	};

	return (
		<div className='min-h-screen grid grid-col-1 lg:grid-cols-6'>
			{/* Sidebar */}
			<div
				className={`fixed lg:static top-0 w-[81%] md:w-[40%] lg:w-full z-50 bg-white transition-all ${
					openSidebar ? '-left-0' : '-left-full'
				}  w-full h-full overflow-y-scroll col-span-1 p-8 border-r`}
			>
				<div className='text-center p-8'>
					<h1 className='uppercase font-bold tracking-[4px]'>Tu Logo</h1>
				</div>

				<div className=' h-[800px] flex flex-col justify-between'>
					{/* Menu */}
					<nav>
						<ul>
							<li>
								<Link
									to='/'
									className={`flex items-center gap-4  hover:{$hoverCollor} p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold`}
								>
									<RiMapPin2Line /> Localidades
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiTable2 /> Sector OMIC
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiBriefcase3Line /> Empresas
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
								>
									<RiFileUserLine /> Empleados
								</Link>
							</li>
						</ul>
					</nav>
					{/* Images and logoout */}
					<div className='flex flex-col gap-4'>
						<img src='/images/img.svg' className='wf' alt='Image' />
						<div className='bg-purple-100 p-8 flex flex-col gap-4 rounded-2xl'>
							<h3 className='text-xl text-center'>Get upgrade</h3>
							<p className='text-gray-500 text-center'>
								Upgrade to a premium account today
							</p>
							<button className=' bg-purple-600 text-white p-2 rounded-lg'>
								learn more
							</button>
						</div>
						<Link
							to='/'
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
			<div className=' col-span-5 bg-gray-200'>
				<HeaderDashboard />
				<Content />
				<ResultsCards />
				<Cards />
			</div>
		</div>
	);
}
