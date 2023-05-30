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
import React, { useState } from 'react';
import HeaderDashboard from '../Header/HeaderDashboard';
import Content from './Content';
import ResultsCards from './ResultsCards';
import Card from './Cards';
import Sidebar from '../Sidebar/Sidebar';

export default function Dashboard() {
	const hoverCollor = 'bg-purple-500';

	return (
		<div>
			<Content />
			<ResultsCards />
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
