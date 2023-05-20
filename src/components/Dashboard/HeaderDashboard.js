import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	RiNotification3Line,
	RiArrowDownSLine,
	RiSearchLine,
	RiCheckboxBlankCircleFill,
} from 'react-icons/ri';

const HeaderDashboard = () => {
	return (
		<header className='flex flex-col md:flex-row gap-4 items-center justify-between  p-4 md:pl-8 md:px-8 lg:px-12 lg:pl-12  w-full bg-white'>
			{/* Search */}
			<form className='md:w-[45%] lg:w-[30%] w-full order-1 md:order-none'>
				<div className='relative '>
					<RiSearchLine className='absolute left-2 top-3' />
					<input
						type='text'
						placeholder='Buscar'
						className='bg-gray-200 p-2 outline-none rounded-lg pl-8 pr-4 w-full'
					/>
				</div>
			</form>
			{/* Notifications */}
			<nav className='w-full md:w-[55%] lg:w-[70%] flex justify-center md:justify-end '>
				<ul className='flex items-center gap-4'>
					<li>
						<Link to='/' className='relative'>
							<RiNotification3Line className='text-xl' />
							<RiCheckboxBlankCircleFill className='absolute -right-1 -top-1 text-xs text-red-500' />
						</Link>
					</li>
					<li>
						<Link className='flex gap-1 items-center' to='/'>
							Felipe Fernandez
							<RiArrowDownSLine />
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default HeaderDashboard;
