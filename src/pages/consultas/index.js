import ConsultasLayout from '@/layouts/ConsultasLayout';
import { useConsultasContext } from '@/context/ConsultasContext';

export default function ConsultasPage() {
	const { allConsultas } = useConsultasContext();

	return <ConsultasLayout allConsultas={allConsultas} query='' />;
}
