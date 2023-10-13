import ConsultaCard from './ConsultaCard';

export default function ConsultasList({
	filtersOppened,
	consultas,
	setOrderBy,
}) {
	const handleChange = (e) => {
		setOrderBy(e.target.value);
	};

	return (
		<div className='md:w-full'>
			<section className={`w-full px-6 ${filtersOppened ? 'hidden' : 'block'}`}>
				<div className='text-light-gray flex justify-between items-center text-sm '>
					<span className='block md:text-left '>
						Mostrando 1-{consultas.length} de {consultas.length} consultas
					</span>
					<select
						id='orderBy'
						name='orderBy'
						className='cursor-pointer text-gray-900 text-sm rounded-lg py-1 hidden md:block'
						onChange={handleChange}
					>
						<option defaultValue='default' hidden>
							Ordenar por
						</option>
						<option value='asc'>Fecha más reciente</option>
						<option value='des'>Fecha menos reciente</option>
					</select>
				</div>
				<div
					id='productList'
					className='my-4 grid grid-cols-list-cards gap-8 px-4 md:px-0'
				>
					{consultas &&
						consultas.map((consulta) => (
							<ConsultaCard
                                key={consulta.id}
								consulta={consulta}
							/>
						))}
				</div>
			</section>
		</div>
	);
}
