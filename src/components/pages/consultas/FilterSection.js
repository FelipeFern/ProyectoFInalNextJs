import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FilterIcon } from '@/components/shared/Icons';
import FilterItem from './FilterItem';

export default function FilterSection({
	filtersOppened,
	setFiltersOppened,
	filters,
	applyFilters,
	setOrderBy,
	resetFilters,
	updateFilters,
	filterValues,
}) {
	const handleFiltersOpen = () => {
		setFiltersOppened(!filtersOppened);
	};

	const handleChange = (e) => {
		setOrderBy(e.target.value);
	};

	return (
		<>
			<div
				id='buttonsFiltersMobile'
				className='md:hidden w-full my-4 px-6 flex justify-between text-light-gray'
			>
				<div onClick={handleFiltersOpen} className='flex items-center gap-2'>
					<span>Filtrar</span>
					<span>
						<FilterIcon color='light-gray' />
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<select
						id='orderBy'
						name='orderBy'
						className='cursor-pointer text-gray-900 text-sm rounded-lg py-1'
						onChange={handleChange}
					>
						<option hidden>Ordenar por</option>
						<option value='asc'>Precio menor a mayor</option>
						<option value='des'>Precio mayor a menor</option>
					</select>
				</div>
			</div>
			<aside
				className={`
              bg-white
              w-full
              py-4
              px-6
              transition-all
              duration-300
              absolute
              top-0
              h-screen
              md:h-fit
              z-10
              md:static
              md:flex
              md:w-1/3
            ${filtersOppened ? 'left-0' : '-left-full'}`}
			>
				<div className='flex justify-between text-light-gray'>
					<span className='md:hidden' onClick={handleFiltersOpen}>
						Cerrar
					</span>
					<span className='md:hidden' onClick={resetFilters}>
						Borrar filtros
					</span>
				</div>
				<div id='filters' className='p-4 w-full md:p-0'>
					<span className='text-2xl font-bold mb-4 block'>Filtros</span>
					<button
						className={`hidden button-primary border-2 border-gray-500 hover:border-gray-400 rounded-md ${
							!!updateFilters.tipoConsultas.length ||
							!!updateFilters.empresas.length ||
							!!updateFilters.localidades.length ||
              !! updateFilters.ciudadanos.length
								? // updateFilters.fechaMinMax[0] !== filters.fechaMinMax[0] ||
								  // updateFilters.fechaMinMax[1] !== filters.fechaMinMax[1]
								  'md:block'
								: ''
						}`}
						onClick={resetFilters}
					>
						Borrar filtros
					</button>
					<div className='flex flex-col gap-4'>
          <FilterItem title='Tipo de Consulta'>
							{filters?.tipoConsultas
								.filter((tipoConsulta) => tipoConsulta !== undefined)
								.map((tipoConsulta) => (
									<label
										key={tipoConsulta}
										className='cursor-pointer'
										htmlFor={tipoConsulta}
									>
										<input
											id={tipoConsulta}
											type='checkbox'
											name={tipoConsulta}
											className='mr-2'
											onChange={applyFilters.updateTipoConsulta}
											checked={!!filterValues[tipoConsulta]}
										/>
										<span className='first-letter:capitalize inline-block'>
											{tipoConsulta}
										</span>
									</label>
								))}
						</FilterItem>

						<FilterItem title='Localidad'>
							{filters?.localidades
								.filter((empresa) => empresa !== 'undefined')
								.map((localidad) => (
									<label
										key={localidad}
										className='cursor-pointer'
										htmlFor={localidad}
									>
										<input
											id={localidad}
											type='checkbox'
											name={localidad}
											className='mr-2'
											onChange={applyFilters.updateLocalidades}
											checked={!!filterValues[localidad]}
										/>
										<span className='first-letter:capitalize inline-block'>
											{localidad}
										</span>
									</label>
								))}
						</FilterItem>
						<FilterItem title='Empresa'>
							{filters?.empresas
								.filter((empresa) => empresa !== undefined)
								.map((empresa) => (
									<label
										key={empresa}
										className='cursor-pointer'
										htmlFor={empresa}
									>
										<input
											id={empresa}
											type='checkbox'
											name={empresa}
											className='mr-2'
											onChange={applyFilters.updateEmpresas}
											checked={!!filterValues[empresa]}
										/>
										<span className='first-letter:capitalize inline-block'>
											{empresa}
										</span>
									</label>
								))}
						</FilterItem>

						<FilterItem title='Ciudadano'>
            {filters?.ciudadanos
								.filter((ciudadano) => ciudadano !== undefined)
								.map((ciudadano) => (
									<label
										key={ciudadano}
										className='cursor-pointer'
										htmlFor={ciudadano}
									>
										<input
											id={ciudadano}
											type='checkbox'
											name={ciudadano}
											className='mr-2'
											onChange={applyFilters.updateCiudadanos}
											checked={!!filterValues[ciudadano]}
										/>
										<span className='first-letter:capitalize inline-block'>
											{ciudadano}
										</span>
									</label>
								))}
						</FilterItem>
					</div>
				</div>
			</aside>
		</>
	);
}
