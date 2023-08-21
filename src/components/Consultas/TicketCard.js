import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Link from 'next/link';
const TicketCard = (props) => {
	const { id, descripcion, status, fechaCreacion } = props;

	return (
		<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-gray-200 p-4 rounded-xl'>
			<div>
				<h5 className='md:hidden text-white font-bold mb-2'>ID</h5>
				<span>#{id}</span>
			</div>
			<div>
				<h5 className='md:hidden text-white font-bold mb-2'>Descripción</h5>
				<p>{descripcion}</p>
			</div>
			<div>
				<h5 className='md:hidden text-white font-bold mb-2'>Estatus</h5>
				<span className='py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg'>
					{status}
				</span>
			</div>
			<div>
				<h5 className='md:hidden text-white font-bold mb-2'>Fecha</h5>
				<span>{fechaCreacion}</span>
			</div>
			<div>
				<h5 className='md:hidden text-white font-bold mb-2'>Acciones</h5>
				<Menu
					menuButton={
						<MenuButton className='flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors'>
							Acciones
						</MenuButton>
					}
					align='end'
					arrow
					arrowClassName='bg-secondary-100'
					transition
					menuClassName='bg-secondary-100 p-4'
				>
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							href='/perfil'
							className='rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1'
						>
							Dashboard tickets
						</Link>
					</MenuItem>
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							href='/perfil'
							className='rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1'
						>
							Información
						</Link>
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
};

export default TicketCard;
