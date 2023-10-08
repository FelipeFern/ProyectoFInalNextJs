import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Link from 'next/link';
const TicketCard = (props) => {
	const { tipo, nombre, estatus, fechaCreacion } = props;

	let status = '';
	let textColor = '';

	switch (estatus) {
		case 'Pendiente de revisión':
			status = 'bg-yellow-500/10 text-yellow-500';
			textColor = 'text-yellow-500';
			break;
		case 'En proceso':
			status = 'bg-blue-500/10 text-blue-500';
			textColor = 'text-blue-500';
			break;
		case 'Cerrado':
			status = 'bg-green-500/10 text-green-500';
			textColor = 'text-green-500';
			break;
		case 'Cancelada':
			status = 'bg-pink-500/10 text-pink-500';
			textColor = 'text-pink-500';
			break;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-gray-200 p-4 rounded-xl'>
			<div>
				<h5 className='md:hidden text-gray-400 font-bold mb-2'>Tipo Consulta:</h5>
				<span>{tipo}</span>
			</div>
			<div>
				<h5 className='md:hidden text-gray-500 font-bold mb-2'>Nombre ciudadano</h5>
				<p>{nombre}</p>
			</div>
			<div>
				<h5 className='md:hidden text-gray-500 font-bold mb-2'>Estatus</h5>
				<span className={`py-1 px-2 rounded-lg ${textColor } ${status } `}>
					{estatus}
				</span>
			</div>
			<div>
				<h5 className='md:hidden text-gray-500 font-bold mb-2'>Fecha creación</h5>
				<span>{fechaCreacion}</span>
			</div>
			<div>
				<h5 className='md:hidden text-gray-500 font-bold mb-2'>Detalles</h5>
				<Menu
					menuButton={
						<MenuButton className='flex items-center gap-x-2 bg-gray-500/10 p-2 rounded-lg transition-colors'>
							Detalles
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
							className='rounded-lg transition-colors text-gray-500 hover:bg-gray-200 flex items-center gap-x-4 p-2 flex-1'
						>
							Dashboard tickets
						</Link>
					</MenuItem>
					<MenuItem className='p-0 hover:bg-transparent'>
						<Link
							href='/perfil'
							className='rounded-lg transition-colors text-gray-500 hover:bg-gray-200 flex items-center gap-x-4 p-2 flex-1'
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
