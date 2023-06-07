import { useEffect, useState } from 'react';
import Card from '../ResultCard/Cards';

const ResultsCards = ({ results, filtersToShow }) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortByOptions, setSortByOptions] = useState([]);
	const [sortBy, setSortBy] = useState('');

	function convertWord(palabra) {
		const palabras = palabra.split(/(?=[A-Z])/);
		const resultado = palabras.map(
			(palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)
		);
		return resultado.join(' ');
	}

	const handleSortValue = (event) => {
		let filterKey = event.target.value;
		setSortBy(filterKey);
		let values = [...cards];

		values.sort((a, b) => {
			if (Array.isArray(a[filterKey]) && Array.isArray(b[filterKey])) {
				// Ordenar por la longitud de los arreglos
				return a[filterKey].length - b[filterKey].length;
			} else if (
				typeof a[filterKey] === 'number' &&
				typeof b[filterKey] === 'number'
			) {
				// Ordenar números de forma numérica
				return a[filterKey] - b[filterKey];
			} else {
				// Ordenar cadenas de texto de forma alfabética
				return a[filterKey].localeCompare(b[filterKey]);
			}
		});
		setCards(values);
	};

	useEffect(() => {
		try {
			setLoading(true);
			if (results.length > 0) {
				let cardValues = results.sort((a, b) =>
					a.apellido.localeCompare(b.apellido)
				);
				setCards(cardValues);
			}
			setLoading(false);

			const values = Object.keys(filtersToShow).map((key) => [
				key,
				filtersToShow[key],
			]);
			if (values.length > 0) {
				values.sort((a, b) => {
					if (a[0] === 'apellido' && b[0] !== 'apellido') {
						return -1; // a debe ir antes que b
					} else if (a[0] !== 'apellido' && b[0] === 'apellido') {
						return 1; // b debe ir antes que a
					} else {
						return 0; // no se cambia el orden
					}
				});
				setSortByOptions(values);
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	}, [results, filtersToShow]);

	return (
		<>
			<div className='lg:p-12 lg:pb-8 p-4 md:p-8 bg-gray-200 flex items-center justify-between'>
				<p className='text-gray-600'>
					Se han encontrado{' '}
					<span className='font-semibold'> {results.length} </span> resultados
				</p>

				<div className='text-gray-600 flex items-center gap-2'>
					Ordenar por
					<div className='relative '>
						<select
							type='text'
							placeholder='Buscar'
							className='bg-white p-2 outline-none pl-4 pr-4 w-full hover:cursor-pointer rounded-full'
							defaultValue={'Apellido'}
							onChange={handleSortValue}
						>
							{sortByOptions.map((optionValue) => (
								<option key={optionValue[0]} value={optionValue[0]}>
									{convertWord(optionValue[0])}
								</option>
							))}
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
							name={card.apellido + ' ' + card.nombre}
							subTitle={'Sector: ' + card.sectorOmic}
							purple={card.roles[0]}
							green={card.roles[0]}
							rightTitle={'Cantidad de reclamos ' + card.roles.length}
							rightSubTitle={'Cantidad de denunciantes:'}
						/>
					))
				)}
			</div>
		</>
	);
};

export default ResultsCards;
