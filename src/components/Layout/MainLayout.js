import HeaderDashboard from '../Dashboard/HeaderDashboard';
import Sidebar from '../Dashboard/Sidebar';

export default function MainLayout({ children }) {
	return (
		<div className='min-h-screen grid grid-col-1 lg:grid-cols-6'>
			{/* Sidebar */}
			<Sidebar />
			{/* Content */}
			<div className=' col-span-5 bg-gray-200'>
				<HeaderDashboard />
				{children}
			</div>
		</div>
	);
}
