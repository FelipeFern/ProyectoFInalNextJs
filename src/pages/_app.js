import Dashboard from '@/components/Dashboard/Dashboard';
import { AuthProvider } from '../common/context/AuthContext';
import '../styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function App({ Component, pageProps }) {
	// return (
	// 	<AuthProvider>
	// 		<Layout>
	// 			<Component {...pageProps} />
	// 		</Layout>
	// 	</AuthProvider>
	// );
	// useEffect(() => {
	// 	document.title = 'Dashboard';
	// }, []);
	return (
		<BrowserRouter>
			<Component {...pageProps} />
		</BrowserRouter>
	);
}
