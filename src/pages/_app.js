import { AuthProvider } from '../common/context/AuthContext';
import '../styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from '@/components/Dashboard/Dashboard';
import Head from 'next/head';
import MainLayout from '@/components/Layout/MainLayout';

export default function App({ Component, pageProps }) {
	// return (
	// 	<AuthProvider>
	// 		<Layout>
	// 			<Component {...pageProps} />
	// 		</Layout>
	// 	</AuthProvider>
	// );
	return (
		<>
			<Head>
				<title>OMIC</title>
			</Head>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}
