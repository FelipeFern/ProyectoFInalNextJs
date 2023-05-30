import Link from 'react-router-dom';
import {
	RiSearchLine,
	RiArrowDownLine,
	RiFilter3Fill,
	RiCloseLine,
} from 'react-icons/ri';

const Content = () => {
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
						>
							<option value='' disabled hidden>
								Filter options
							</option>
							<option>Localidad</option>
							<option>All</option>
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
						>
							<option>Values</option>
						</select>
					</div>
				</form>
			</div>

			{/* Spans Filters */}

			<div className='flex items-center gap-4 flex-wrap'>
				<span className='bg-white flex items-center gap-4 py-2 px-4 rounded-full '>
					<button className='bg-gray-500 p-1 rounded-full text-gray-300 text-sm'>
						<RiCloseLine />
					</button>
					<span className='text-gray-500'> {''} Bahia Blanca </span>
				</span>
				<span className='bg-white flex items-center gap-4 py-2 px-4 rounded-full '>
					<button className='bg-gray-500 p-1 rounded-full text-gray-300 text-sm'>
						<RiCloseLine />
					</button>
					<span className='text-gray-500'> {''} Felipe Fernandez </span>
				</span>
				<span className='bg-white flex items-center gap-4 py-2 px-4 rounded-full '>
					<button className='bg-gray-500 p-1 rounded-full text-gray-300 text-sm'>
						<RiCloseLine />
					</button>
					<span className='text-gray-500'> {''} Activo </span>
				</span>
				<button className='ml-4 rounded-full text-gray-500 '>
					{''} Clear all
				</button>
			</div>
		</div>
	);
};

export default Content;
