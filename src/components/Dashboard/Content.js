import {
	RiSearchLine,
	RiArrowDownLine,
	RiFilter3Fill,
	RiCloseLine,
} from 'react-icons/ri';
import React, { useState, useEffect } from 'react';

const Content = ({ filtersToShow, handleFilters }) => {
	const [filterKeySelected, setFilterKeySelected] = useState('');
	const [filterValueSelected, setFilterValueSelected] = useState('');
	const [filterValuesToShow, setFilterValuesToShow] = useState([]);
	const [allFiltersToShow, setAllFiltersToShow] = useState([]);
	const [filtersCreated, setFiltersCreated] = useState([]);

	const handleSelectKeyChange = (event) => {
		let filterKey = event.target.value;
		setFilterKeySelected(filterKey);
		setFilterValuesToShow([]);
		setFilterValuesToShow(filtersToShow[filterKey]);
	};

	const handleFilterValueChange = (event) => {
		let filterValue = event.target.value;
		setFilterValueSelected(filterValue);
	};

	function createFilter() {
		createNewFilter(filterKeySelected, filterValueSelected);
	}

	function convertWord(palabra) {
		const palabras = palabra.split(/(?=[A-Z])/);
		const resultado = palabras.map(
			(palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)
		);
		return resultado.join(' ');
	}

	function createNewFilter(filterKey, filterValues) {
		// Verificar si ya existe un filtro con la misma clave
		const existingFilter = filtersCreated.find(
			(filter) => filter.key === filterKey
		);

		// Si existe, no se agrega el filtro nuevamente
		if (existingFilter) {
			console.log('El filtro ya existe');
			return;
		}

		const newFilter = {
			key: filterKey,
			value: filterValues,
		};
		const newArray = [...filtersCreated, newFilter];
		setFiltersCreated(newArray);
		handleFilters(newArray);
	}

	const removeFilter = (value) => {
		let filterValue = value;
		let filters = filtersCreated;
		filters = filters.filter((filter) => filter.value !== filterValue);

		setFiltersCreated(filters);
		handleFilters(filters);
	};

	const removeAllFilters = () => {
		console.log('entre');
		setFiltersCreated([]);
		handleFilters([]);
	};

	useEffect(() => {
		const values = Object.keys(filtersToShow).map((key) => [
			key,
			filtersToShow[key],
		]);
		if (values.length > 0) {
			values.sort((a, b) => a[0].localeCompare(b[0]));
			setAllFiltersToShow(values);
		}
	}, [filtersToShow, filtersCreated]);

	return (
		<div className='lg:p-12 p-4 md:p-8 bg-gray-200'>
			<div className='mb-8'>
				<h1 className='text-3xl font-semibold'>Job Board</h1>
			</div>
			{/* Filters */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6'>
				<form className='col-span-1 md:col-span-2'>
					<div className='relative text-gray-600'>
						<RiSearchLine className='absolute left-2 top-3 text-purple-600 text-lg' />
						<input
							type='text'
							placeholder='Buscar'
							className='bg-white p-2 outline-none pl-8 pr-4 w-full '
						/>
					</div>
				</form>
				<form className='col-span-1'>
					<div className='relative text-gray-600'>
						<RiArrowDownLine className='absolute left-2 top-3 text-purple-600 text-lg' />
						<select
							type='text'
							placeholder='Buscar'
							className='bg-white p-2 outline-none pl-8 pr-4 w-full hover:cursor-pointer '
							defaultValue={''}
							onChange={handleSelectKeyChange}
						>
							<option value='' disabled hidden>
								Filter options
							</option>
							{allFiltersToShow.map((filterValue) => (
								<option key={filterValue[0]} value={filterValue[0]}>
									{convertWord(filterValue[0])}
								</option>
							))}
						</select>
					</div>
				</form>
				<form className='col-span-1'>
					<div className='relative text-gray-600'>
						<RiFilter3Fill className='absolute left-2 top-3 text-purple-700 text-lg' />
						<select
							type='text'
							selec='Buscar'
							className='bg-white p-2 outline-none pl-8 pr-4 w-full hover:cursor-pointer'
							onChange={handleFilterValueChange}
							defaultValue={''}
						>
							<option value='' disabled hidden>
								Values
							</option>
							{filterValuesToShow.map((filterValue) => (
								<option key={filterValue} value={filterValue}>
									{filterValue}
								</option>
							))}
						</select>
					</div>
				</form>
			</div>

			{/* Spans Filters */}

			<div className='flex items-center gap-4 flex-wrap'>
				<span className='bg-white flex items-center gap-4 py-2 px-4 rounded-full lg:ml-auto lg:order-last'>
					<button className='text-gray-500' onClick={createFilter}>
						{''} Apply filter{' '}
					</button>
				</span>

				{filtersCreated.map((filterValue) => (
					<span
						className='bg-white flex items-center gap-4 py-2 px-4 rounded-full '
						key={filterValue.value}
					>
						<button
							className='bg-gray-500 p-1 rounded-full text-gray-300 text-sm'
							onClick={() => removeFilter(filterValue.value)}
						>
							<RiCloseLine />
						</button>
						<span className='text-gray-500'>
							{''} {filterValue.value}{' '}
						</span>
					</span>
				))}
				{filtersCreated.length > 0 && filtersCreated && (
					<button
						className='ml-4 rounded-full text-gray-500 '
						key={'ClearAll'}
						onClick={removeAllFilters}
					>
						{''} Clear all
					</button>
				)}
			</div>
		</div>
	);
};

export default Content;
