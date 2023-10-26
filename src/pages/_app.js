import '../styles/globals.css';
import React, { useEffect } from 'react';
import { initFirebaseClient } from '@/common/db/firebase';
import { SessionProvider } from 'next-auth/react';
import { ConsultasProvider } from '@/context/ConsultasContext';
import { Toaster} from 'sonner';


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
					<Toaster position='top-center' richColors duration={4000}/>
				</ConsultasProvider>
			</SessionProvider>
		</>
	);
}
