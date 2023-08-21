import HeaderDashboard from '../Header/HeaderDashboard';
import Sidebar from '../Sidebar/Sidebar';

export default function MainLayout({ children }) {
	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-6'>
			{/* Sidebar */}
			<Sidebar />
			{/* Content */}
			<div className=' col-span-5 bg-gray-200'>
				<HeaderDashboard />
				<div className='h-[90vh] overflow-y-scroll bg-gray-200 p-8'>
					{children}
				</div>
				{/* {children} */}
			</div>
		</div>
	);
}
