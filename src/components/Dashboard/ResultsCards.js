import { useEffect, useState } from 'react';
import Card from './Cards';

const ResultsCards = () => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				const response = await fetch('/api/users');
				const data = await response.json();
				setCards(data.data);
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
		<>
			<div className='lg:p-12 lg:pb-8 p-4 md:p-8 bg-gray-200 flex items-center justify-between'>
				<p className='text-gray-600'>
					We found<span className='font-semibold'> {532}</span> consultas
				</p>

				<div className='text-gray-600 flex items-center gap-2'>
					Sort by
					<div className='relative '>
						<select
							type='text'
							placeholder='Buscar'
							className='bg-white p-2 outline-none pl-4 pr-4 w-full hover:cursor-pointer rounded-full'
							defaultValue={''}
						>
							<option value=''>Date</option>
							<option>Localidad</option>
							<option>Nombre</option>
						</select>
					</div>
				</div>
			</div>
			<div className='lg:pr-12 lg:pl-12  md:pr-8 md:pl-8 p-4'>
				{loading ? (
					<p className='text-gray-600'>Loading...</p>
				) : cards.length === 0 ? (
					<p className='text-gray-600'>No se encontraron resultados</p>
				) : (
					cards.map((card, index) => (
						<Card
							key={index + 1}
							name={card.nombre}
							location={card.apellido}
							salary={card.id}
							posted={card.sectorOmic}
						/>
					))
				)}

				<Card
					name='Felipe Fernandez 2'
					location='Warzawa'
					salary='8.8 - 13.7k PLN'
					posted='2 days ago'
				/>
				<Card
					name='Felipe Fernandez'
					location='Warzawa'
					salary='8.8 - 13.7k PLN'
					posted='2 days ago'
				/>
				<Card
					name='Felipe Fernandez'
					location='Warzawa'
					salary='8.8 - 13.7k PLN'
					posted='2 days ago'
				/>
			</div>
		</>
	);
};

export default ResultsCards;
