// import Image from 'next/image';
// import { Inter } from 'next/font/google';
// import Login from '../components/Login/Login.js';
// import Head from 'next/head';
// import { useAuth } from '../common/context/AuthContext';
// import UserDashboard from '../components/UserDashboard/UserDashboard.js';

// const inter = Inter({ subsets: ['latin'] });

// export default function Home() {
// 	// const { currentUser } = useAuth();
// 	// console.log(currentUser);
// 	return (
// 		<main>
// 			<Head>
// 				<title>Next.js + Tailwind CSS</title>
// 			</Head>
// 			{/* {!currentUser && <Login />}
//       {currentUser && <UserDashboard />} */}
// 		</main>
// 	);
// }

import Dashboard from '@/components/DashboardLocalidades/Dashboard';
import Head from 'next/head';
import MainLayout from '@/components/Layout/MainLayout';

export default function Home() {
	return (
		<>
			<h1>Home</h1>
		</>
	);
}
