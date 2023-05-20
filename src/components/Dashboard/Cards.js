import { Link } from 'react-router-dom';
import { RiDropboxFill } from 'react-icons/ri';

const Cards = () => {
	return (
		<div className='lg:pr-12 lg:pl-12  md:pr-8 md:pl-8 p-4'>
			{/* Card */}
			<Link
				to='/'
				className='bg-white rounded-2xl p-8 flex gap-8 flex-col md:flex-row w-full drop-shadow-lg items-center border-2 border-transparent hover:border-purple-400 transition-all mb-4'
			>
				{/* Icon */}
				<div className=' w-full md:w-[10%] flex items-center  justify-startmd:justify-center'>
					<RiDropboxFill className=' text-7xl bg-purple-100 text-purple-500 p-4' />
				</div>
				{/* Middle */}
				<div className='w-full md:w-[70%]'>
					<h1 className='text-xl flex items-center gap-4 mb-2'>
						{' '}
						Felipe Fernandez
						<span className='text-xs py-1 px-2 bg-purple-100 rounded-full text-purple-600 font-bold'>
							{' '}
							Remote{' '}
						</span>
						<span className='text-xs py-1 px-2 bg-green-100 rounded-full text-green-600 font-bold'>
							Sketch
						</span>
					</h1>
					<p className='text-gray-500'> Dropbox --- Warzawa</p>
				</div>
				{/* Right Side */}
				<div className='w-full md:w-[20%] '>
					<h3 className='text-xl flex items-center gap-4 mb-2 text-gray-600 font-medium'>
						{' '}
						8.8 - 13.7k PLN
					</h3>
					<p className='text-gray-600 '> 2 days ago</p>
				</div>
			</Link>
			<Link
				to='/'
				className='bg-white rounded-2xl p-8 flex gap-8 flex-col md:flex-row w-full drop-shadow-lg items-center border-2 border-transparent hover:border-purple-400 transition-all mb-4'
			>
				{/* Icon */}
				<div className=' w-full md:w-[10%] flex items-center  justify-startmd:justify-center'>
					<RiDropboxFill className=' text-7xl bg-purple-100 text-purple-500 p-4' />
				</div>
				{/* Middle */}
				<div className='w-full md:w-[70%]'>
					<h1 className='text-xl flex items-center gap-4 mb-2'>
						{' '}
						Felipe Fernandez
						<span className='text-xs py-1 px-2 bg-purple-100 rounded-full text-purple-600 font-bold'>
							{' '}
							Remote{' '}
						</span>
						<span className='text-xs py-1 px-2 bg-green-100 rounded-full text-green-600 font-bold'>
							Sketch
						</span>
					</h1>
					<p className='text-gray-500'> Dropbox --- Warzawa</p>
				</div>
				{/* Right Side */}
				<div className='w-full md:w-[20%] '>
					<h3 className='text-xl flex items-center gap-4 mb-2 text-gray-600 font-medium'>
						{' '}
						8.8 - 13.7k PLN
					</h3>
					<p className='text-gray-600 '> 2 days ago</p>
				</div>
			</Link>
			<Link
				to='/'
				className='bg-white rounded-2xl p-8 flex gap-8 flex-col md:flex-row w-full drop-shadow-lg items-center border-2 border-transparent hover:border-purple-400 transition-all mb-4'
			>
				{/* Icon */}
				<div className=' w-full md:w-[10%] flex items-center  justify-startmd:justify-center'>
					<RiDropboxFill className=' text-7xl bg-purple-100 text-purple-500 p-4' />
				</div>
				{/* Middle */}
				<div className='w-full md:w-[70%]'>
					<h1 className='text-xl flex items-center gap-4 mb-2'>
						{' '}
						Felipe Fernandez
						<span className='text-xs py-1 px-2 bg-purple-100 rounded-full text-purple-600 font-bold'>
							{' '}
							Remote{' '}
						</span>
						<span className='text-xs py-1 px-2 bg-green-100 rounded-full text-green-600 font-bold'>
							Sketch
						</span>
					</h1>
					<p className='text-gray-500'> Dropbox --- Warzawa</p>
				</div>
				{/* Right Side */}
				<div className='w-full md:w-[20%] '>
					<h3 className='text-xl flex items-center gap-4 mb-2 text-gray-600 font-medium'>
						{' '}
						8.8 - 13.7k PLN
					</h3>
					<p className='text-gray-600 '> 2 days ago</p>
				</div>
			</Link>
			<Link
				to='/'
				className='bg-white rounded-2xl p-8 flex gap-8 flex-col md:flex-row w-full drop-shadow-lg items-center border-2 border-transparent hover:border-purple-400 transition-all mb-4'
			>
				{/* Icon */}
				<div className=' w-full md:w-[10%] flex items-center  justify-startmd:justify-center'>
					<RiDropboxFill className=' text-7xl bg-purple-100 text-purple-500 p-4' />
				</div>
				{/* Middle */}
				<div className='w-full md:w-[70%]'>
					<h1 className='text-xl flex items-center gap-4 mb-2'>
						{' '}
						Felipe Fernandez
						<span className='text-xs py-1 px-2 bg-purple-100 rounded-full text-purple-600 font-bold'>
							{' '}
							Remote{' '}
						</span>
						<span className='text-xs py-1 px-2 bg-green-100 rounded-full text-green-600 font-bold'>
							Sketch
						</span>
					</h1>
					<p className='text-gray-500'> Dropbox --- Warzawa</p>
				</div>
				{/* Right Side */}
				<div className='w-full md:w-[20%] '>
					<h3 className='text-xl flex items-center gap-4 mb-2 text-gray-600 font-medium'>
						{' '}
						8.8 - 13.7k PLN
					</h3>
					<p className='text-gray-600 '> 2 days ago</p>
				</div>
			</Link>
		</div>
	);
};

export default Cards;
