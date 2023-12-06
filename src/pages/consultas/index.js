import ConsultasLayout from '@/layouts/ConsultasLayout';
import { useConsultasContext } from '@/context/ConsultasContext';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ConsultasPage() {
	const { allConsultas } = useConsultasContext();
	const { data: session, status, update } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return <p>Cargando...</p>;
	}

	const isAuthenticated = session?.user && session.user.role === 'Admin';
	if (typeof window !== 'undefined') {
		if (!isAuthenticated) {
			router.push('/');
		}
	}

	return <ConsultasLayout allConsultas={allConsultas} query='' />;
}
