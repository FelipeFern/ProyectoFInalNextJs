import {
	RiDashboardLine,
	RiBuilding4Line,
	RiTable2,
	RiBriefcase3Line,
	RiFileUserLine,
} from 'react-icons/ri';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

export default function Dashboard() {
	return (
		<div className='min-h-screen grid grid-cols-6'>
			<div className=' col-span-1 p-8'>
				<div className='text-center p-8'>
					<h1 className='uppercase font-bold tracking-[4px]'>Tu Logo</h1>
				</div>

				<nav>
					<ul>
						<li>
							<Link
								to='/'
								className='flex items-center gap-4  hover:bg-purple-500 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold'
							>
								<RiBuilding4Line /> Localidades
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
			</div>

			<div className='bg-blue-500 col-span-5'> hola2</div>
		</div>
	);
}
