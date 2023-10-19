import { AuthProvider } from '../common/context/AuthContext';
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { initFirebaseClient } from '@/common/db/firebase';
import { SessionProvider } from 'next-auth/react';
import { ConsultasProvider } from '@/context/ConsultasContext';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {

	initFirebaseClient();

	return (
		<>
			<SessionProvider session={session}>
				<ConsultasProvider>
					<Component {...pageProps} />
				</ConsultasProvider>
			</SessionProvider>
		</>
	);
}
