import { RiArrowRightSLine } from 'react-icons/ri';
import {
	TbSquareRoundedLetterC,
	TbSquareRoundedLetterD,
	TbSquareRoundedLetterE,
	TbSquareRoundedLetterM,
} from 'react-icons/tb';

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

export default function ConsultaCard({ consulta }) {
	let status = '';
	let textColor = '';
	let estadoConsulta= '';


	if (consulta.estados !== undefined) {
		const largo = consulta.estados.length;
		if (largo < 1) {
			estadoConsulta = 'Estado';
		} else {
			if (consulta.estados[largo - 1].estado !== undefined) {
				estadoConsulta = consulta.estados[largo - 1].estado;
			}
			switch (estadoConsulta) {
				case 'Pendiente de Revisión':
					status = 'bg-yellow-500/10 text-yellow-500';
					textColor = 'text-yellow-500';
					break;
				case 'En Curso':
					status = 'bg-blue-500/10 text-blue-500';
					textColor = 'text-blue-500';
					break;
				case 'Finalizada':
					status = 'bg-green-500/10 text-green-500';
					textColor = 'text-green-500';
					break;
				case 'Cancelada':
					status = 'bg-pink-500/10 text-pink-500';
					textColor = 'text-pink-500';
					break;
			}
		}
	}

	return (
		<div className='w-full h-full max-w-sm mx-auto relative border-2 rounded-lg flex flex-col overflow-hidden'>
			<div className='flex flex-row items-center gap-4 mb-6 p-4'>
				<div className='bg-gray-100 flex items-center justify-center rounded-full w-12 h-12'>
					<MyComponent tipo={consulta.tipo} />
				</div>
				<div>
					<h3 className='font-medium'>{consulta.tipo}</h3>
					<p className='text-sm text-neutral-500'>
						{formatDate(consulta.createdAt) + ' - ' + consulta.localidad}
					</p>
				</div>
			</div>
			<div className='flex flex-row items-center justify-between gap-8 mb-2 px-4'>
				<div className='flex flex-col md:flex-row items-center gap-2'>
					<h5 className='text-neutral-500'>
						{consulta.nombre + ' ' + consulta.apellido}
					</h5>
				</div>
				<div className='flex flex-col md:flex-row items-center gap-2 text-neutral-500'>
					<h5>{consulta.empresa}</h5>
				</div>
			</div>
			<div className='flex items-center justify-between bg-gray-100 p-4 rounded-xl'>
				<h2 className={`text-xl font-medium  ${textColor}`}>
					{estadoConsulta}
				</h2>
				<a
					href={'/consultas/detalles/' + consulta.id}
					type='button'
					className='flex items-center gap-2 p-2 rounded-lg hover:bg-white transition-colors'
				>
					Detalles <RiArrowRightSLine />
				</a>
			</div>
		</div>
	);
}

const MyComponent = ({ tipo }) => {
	let ComponentToRender;
	let textColor;
	switch (tipo) {
		case 'Consulta general':
			ComponentToRender = TbSquareRoundedLetterC;
			textColor = 'text-yellow-500';
			break;
		case 'Consorcio edificio':
			ComponentToRender = TbSquareRoundedLetterE;
			textColor = 'text-blue-500';
			break;
		case 'Solicitud mediación':
			ComponentToRender = TbSquareRoundedLetterM;
			textColor = 'text-green-500';
			break;
		case 'Denuncia':
			ComponentToRender = TbSquareRoundedLetterD;
			textColor = 'text-pink-500';
			break;
	}

	return <ComponentToRender className={`text-xl ${textColor}`} />;
};
