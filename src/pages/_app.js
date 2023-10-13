import { AuthProvider } from '../common/context/AuthContext';
import '../styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from '@/components/DashboardLocalidades/Dashboard';
import Head from 'next/head';
import MainLayout from '@/components/Layout/MainLayout';
import { initFirebaseClient } from '@/common/db/firebase';
import { SessionProvider } from 'next-auth/react';
import { ConsultasProvider } from '@/context/ConsultasContext';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	// return (
	// 	<AuthProvider>
	// 		<Layout>
	// 			<Component {...pageProps} />
	// 		</Layout>
	// 	</AuthProvider>
	// );

	initFirebaseClient();

	return (
		<>
			{/* <Head>
				<title>OMIC</title>
			</Head>*/}
			{/* <MainLayout> */}
			<SessionProvider session={session}>
				<ConsultasProvider>
					<Component {...pageProps} />
				</ConsultasProvider>
			</SessionProvider>
			{/* </MainLayout> */}
		</>
	);
}
