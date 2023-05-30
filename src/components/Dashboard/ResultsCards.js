const ResultsCards = () => {
	return (
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
	);
};

export default ResultsCards;
