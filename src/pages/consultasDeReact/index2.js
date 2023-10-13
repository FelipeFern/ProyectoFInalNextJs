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
	const [consorcioEdificios, setConsorcioEdificios] = useState([]);
	const [ultimasConsultas, setUltimasConsultas] = useState([]);

	function getUltimasConsultas() {
		let todasLasConsultas = [
			...nuevasConsultas,
			...mediaciones,
			...consorcioEdificios,
		];
		let ultimasConsultas = ordenarPorFecha(todasLasConsultas);
		setUltimasConsultas(ultimasConsultas);
		console.log(ultimasConsultas);
	}

	function formatDate(createdAt) {
		const fecha = new Date(
			createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
		);

		// Obtiene los componentes de la fecha (día, mes, año)
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1; // Los meses en JavaScript son 0-based (0 = enero)
		const año = fecha.getFullYear();

		// Formatea la fecha como DD/MM/AAAA
		const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes
			.toString()
			.padStart(2, '0')}/${año}`;
		return fechaFormateada;
	}

	function ordenarPorFecha(arreglo) {
		return arreglo.sort((a, b) => {
			const fechaA =
				a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
			const fechaB =
				b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
			return fechaB - fechaA; // Ordena de la más nueva a la más vieja
		});
	}

	function getStatus() {
		let status
		const numeroAleatorio = Math.floor(Math.random() * 4);

		// Utiliza una estructura condicional para asignar el valor en función del número aleatorio
		switch (numeroAleatorio) {
			case 0:
				status = 'Cancelada';
				break;
			case 1:
				status = 'En proceso';
				break;
			case 2:
				status = 'Cerrado';
				break;
			case 3:
				status = 'Pendiente de revisión';
				break;
			default:
				status = 'Desconocido';
		}
		return status
	}

	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				let response = await fetch('/api/localidades');
				let data = await response.json();
				setLocalidades(data.data);

				if (nuevasConsultas.length < 1) {
					response = await fetch('/api/solicitudes/nuevaConsulta');
					data = await response.json();
					setNuevasConsultas(data.data);
					console.log('Entre');
				}

				if (mediaciones.length < 1) {
					response = await fetch('/api/solicitudes/nuevaMediacion');
					data = await response.json();
					setMedaciones(data.data);
					let lar = data.data;
					console.log(data.data);
				}

				if (consorcioEdificios.length < 1) {
					response = await fetch('/api/solicitudes/consorcioEdificio');
					data = await response.json();
					setConsorcioEdificios(data.data);
				}
				console.log('Reenderice');
				setLoading(false);
				if (ultimasConsultas.length < 1) {
					getUltimasConsultas();
				}
			};

			fetchData().catch((error) => {
				console.error(error);
			});
		} catch (error) {
			console.error(error);
		}
	}, [consorcioEdificios]);

	return (
		<div className='bg-gray-200 p-8'>
			<div className='flex items-center justify-between mb-10'>
				<h1 className='text-4xl'>Índice de Consultas</h1>
				<div className='flex items-center gap-2 text-3xl'>
					<RiArrowLeftSLine className='hover:cursor-pointer hover:text-white transition-colors' />
					<RiArrowRightSLine className='hover:cursor-pointer hover:text-white transition-colors' />
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{/* Card */}

				<TableCardResults
					ticket='pending'
					totalTickets='Consultas'
					text={nuevasConsultas.length}
				/>
				<TableCardResults
					ticket='inProcess'
					totalTickets='Mediaciones'
					text={mediaciones.length}
				/>
				<TableCardResults
					ticket='close'
					totalTickets='Consorcios'
					text={consorcioEdificios.length}
				/>
				<TableCardResults
					ticket='total'
					totalTickets='Denuncias'
					text='Denuncias'
				/>
			</div>
			<div>
				<h1 className='text-2xl  my-10'>Consultas más recientes</h1>
			</div>
			<div className='bg-white p-8 rounded-xl'>
				<div className='hidden md:grid grid-cols-1 md:grid-cols-5 gap-4  p-4'>
					<h5> Tipo de Consulta</h5>
					<h5>Nombre Ciudadano</h5>
					<h5>Estatus</h5>
					<h5>Fecha creación</h5>
					<h5>Acciones</h5>
				</div>
				<hr className='border border-dashed border-gray-500/50 my-4' />
				{ultimasConsultas.map((consulta) => (
					<TicketCard
						key={consulta.id}
						tipo={consulta.tipo}
						nombre={`${consulta.nombre} ${consulta.apellido}`}
						estatus={getStatus()}
						fechaCreacion={formatDate(consulta.createdAt)}
					/>
				))}
			</div>
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
