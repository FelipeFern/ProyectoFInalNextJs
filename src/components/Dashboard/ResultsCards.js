import Link from 'react-router-dom';
import {
	RiSearchLine,
	RiArrowDownLine,
	RiFilter3Fill,
	RiCloseLine,
} from 'react-icons/ri';

const ResultsCards = () => {
	return (
		<div className='lg:p-12 p-4 md:p-8 bg-gray-200'>
			<p className='text-gray-600'>
				We found<span className='font-semibold'> {532}</span> consultas
			</p>
			<p>Sort by</p>
		</div>
	);
};

export default ResultsCards;
