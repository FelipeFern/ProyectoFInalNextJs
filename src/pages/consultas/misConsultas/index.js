import ConsultasLayout from '@/layouts/ConsultasLayout';
import { useConsultasContext } from '@/context/ConsultasContext';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ConsultasPage() {
	const { data: session, status, update } = useSession();
	const { allConsultas } = useConsultasContext();
	const router = useRouter();
	if (status === 'loading') {
		return <p>Cargando...</p>;
	}
	const isAuthenticated = session?.user && session.user.role === 'Ciudadano';
	if (typeof window !== 'undefined') {
		if (!isAuthenticated) {
			router.push('/');
			return
		}
	}
	let consultas = [];
	if (session !== undefined && session.user !== undefined) {
		let id = session.user.id;
		consultas = allConsultas.filter((objeto) => objeto.responsable === id);
	}

	return <ConsultasLayout allConsultas={consultas} query='' />;
}
