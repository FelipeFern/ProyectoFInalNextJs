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
import PageLayout from '@/layouts/PageLayout';
import Hero from '@/components/pages/home/Hero';
import Servicios from '@/components/pages/home/Servicios';

export default function Home() {
	return (
		<PageLayout title='Inicio'>
			<Hero />

			<section className='h-20 bg-primary flex items-center justify-center px-12'>
				<p className='text-white font-bold text-center md:text-xl'>
					Muebles hechos 100% a mano con lujo de detalle
				</p>
			</section>
			<Servicios />
		</PageLayout>
	);
}
