import React, { useState, useEffect } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Link from 'next/link';
import TableCardResults from '@/components/Consultas/TableCard';
import TicketCard from '@/components/Consultas/TicketCard';

export default function Localidades() {
	const [localidades, setLocalidades] = useState([]);
	const [loading, setLoading] = useState(true);

	const [nuevasConsultas, setNuevasConsultas] = useState([]);
	const [mediaciones, setMedaciones] = useState([]);
	const [consorcioEdificios, setConsorcioEdificios] = useState([])


	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				let response = await fetch('/api/localidades');
				let data = await response.json();
				setLocalidades(data.data);

				response = await fetch('/api/solicitudes/nuevaConsulta');
				data = await response.json();
				let nuevasConsultas = data.data.sort((a, b) =>
					a.nombre.localeCompare(b.nombre)
				);
				setNuevasConsultas(data.data);
	
				response = await fetch('/api/solicitudes/nuevaMediacion');
				data = await response.json();
				let mediaciones = data.data.sort((a, b) =>
					a.nombre.localeCompare(b.nombre)
				);
				setMedaciones(data.data);

				response = await fetch('/api/solicitudes/consorcioEdificio');
				data = await response.json();
				let consultasEdificios = data.data.sort((a, b) =>
					a.nombre.localeCompare(b.nombre)
				);
				setConsorcioEdificios(data.data);

				setLoading(false);
			};

			fetchData().catch((error) => {
				console.error(error);
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<div className='bg-gray-200 p-8'>
			<div className='flex items-center justify-between mb-10'>
				<h1 className='text-4xl'>Consultas realizadas</h1>
				<div className='flex items-center gap-2 text-3xl'>
					<RiArrowLeftSLine className='hover:cursor-pointer hover:text-white transition-colors' />
					<RiArrowRightSLine className='hover:cursor-pointer hover:text-white transition-colors' />
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{/* Card */}
				<TableCardResults
					ticket='total'
					totalTickets='145,000'
					text='Tickets totales'
				/>
				<TableCardResults
					ticket='pending'
					totalTickets='5,000'
					text='Nuevas Consultas'
				/>
				<TableCardResults
					ticket='inProcess'
					totalTickets='130,000'
					text='Tickets en proceso'
				/>
				<TableCardResults
					ticket='close'
					totalTickets='10,000'
					text='Tickets cerrados'
				/>
			</div>
			<div>
				<h1 className='text-2xl  my-10'>Tickets más recientes</h1>
			</div>
			<div className='bg-white p-8 rounded-xl'>
				<div className='hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4'>
					<h5>ID</h5>
					<h5>Descripción</h5>
					<h5>Estatus</h5>
					<h5>Fecha</h5>
					<h5>Acciones</h5>
				</div>
				<TicketCard
					id='123'
					descripcion='Alguna Descripcion'
					status='Abiertos'
					fechaCreacion='10/12/2022'
				/>
				<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl'>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>ID</h5>
						<span>#25546</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Descripción</h5>
						<p>Mi computadora no prende</p>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Estatus</h5>
						<span className='py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg'>
							Abierto
						</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Fecha</h5>
						<span>28 octubre 2022</span>
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
				<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl'>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>ID</h5>
						<span>#25546</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>
							Descripción123
						</h5>
						<p>Mi computadora no prende</p>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Estatus</h5>
						<span className='py-1 px-2 bg-blue-500/10 text-blue-500 rounded-lg'>
							En proceso
						</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Fecha</h5>
						<span>28 octubre 2022</span>
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
				<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl'>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>ID</h5>
						<span>#25546</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Descripción</h5>
						<p>Mi computadora no prende</p>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Estatus</h5>
						<span className='py-1 px-2 bg-green-500/10 text-green-500 rounded-lg'>
							Cerrado
						</span>
					</div>
					<div>
						<h5 className='md:hidden text-white font-bold mb-2'>Fecha</h5>
						<span>28 octubre 2022</span>
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
			</div>
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
