import React, { useState, useEffect } from 'react';
import Content from './Content';
import ResultsCards from './ResultsCards';

export default function Dashboard({ results, handleFilters }) {
	const hoverCollor = 'bg-purple-500';

	const [filters, setFilters] = useState([]);
	const [filteredResults, setFilteredResults] = useState(results);
	const [filtersToShow, setFiltersToShow] = useState([]);

	const updateFiltersFromChild = (data) => {
		setFilters(data);
		applyFilters(data);
	};

	const applyFilters = (filters) => {
		let cardsToShow = results;
		const filteredData = cardsToShow.filter((item) => {
			return filters.every((filter) => {
				const { key, value } = filter;
				const itemValue = item[key].toString();
				return itemValue === value;
			});
		});
		setFilteredResults(filteredData);
		setFilteredResults(filteredData);
	};

	const setFiltersNamesAndValues = () => {
		let nuevoArreglo = [];

		for (const obj of results) {
			for (const key in obj) {
				if (key !== 'id') {
					if (!(key in nuevoArreglo)) {
						nuevoArreglo[key] = [obj[key]];
					} else if (
						!nuevoArreglo[key].includes(obj[key]) &&
						obj[key] !== undefined
					) {
						if (Array.isArray(obj[key])) {
							if (obj[key].length > 0) {
								nuevoArreglo[key].push(obj[key]);
							}
						} else {
							nuevoArreglo[key].push(obj[key]);
						}
					}
				}
			}
		}
		setFiltersToShow(nuevoArreglo);
	};

	useEffect(() => {
		setFilteredResults(results);

		if (filters.length > 0) {
			applyFilters(filters);
		}

		if (filtersToShow.length === 0) {
			setFiltersNamesAndValues();
		}
	}, [filters, results]);

	return (
		<div>
			<Content
				handleFilters={updateFiltersFromChild}
				filtersToShow={filtersToShow}
			/>

			<ResultsCards results={filteredResults} filtersToShow={filtersToShow} />
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.