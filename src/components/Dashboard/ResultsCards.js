import { useEffect, useState } from 'react';
import Card from './Cards';

const ResultsCards = ({ results }) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			setLoading(true);
			if (results.length > 0) {
				setCards(results);
			}
			setLoading(false);

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	}, [results]);

	return (
		<>
			<div className='lg:p-12 lg:pb-8 p-4 md:p-8 bg-gray-200 flex items-center justify-between'>
				<p className='text-gray-600'>
					We found<span className='font-semibold'> {results.length}</span>{' '}
					consultas
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
							location={card.codigoPostal}
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
			</div>
		</>
	);
};

export default ResultsCards;
