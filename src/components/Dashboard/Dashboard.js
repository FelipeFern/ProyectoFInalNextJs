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
import Sidebar from './Sidebar';

export default function Dashboard() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const hoverCollor = 'bg-purple-500';

	useEffect(() => {
		document.title = 'Dashboard';
	}, []);

	return (
		<div className='min-h-screen grid grid-col-1 lg:grid-cols-6'>
			{/* Sidebar */}
			<Sidebar />
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

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
