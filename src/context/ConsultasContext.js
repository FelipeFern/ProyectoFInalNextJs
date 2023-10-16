import { createContext, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

const ConsultasContext = createContext({
	allConsultas: ['asd'],
	allMediaciones: [],
	allConsorcioEdificios: [],
	allConsultasGenerales: [],
	consultas: [],
	getConsultasByCategoria: () => ({}),
	loadingData: false,
	getConsultasBySearch: () => ({}),
	isCartModalOpen: false,
});

function ConsultasProvider({ children }) {

	const [allConsultas, setAllConsultas] = useState([]);
	const [allMediaciones, setAllMedaciones] = useState([]);
	const [allConsorcioEdificios, setAllConsorcioEdificios] = useState([]);
	const [	allConsultasGenerales, setAllConsultasGenerales] = useState([]);

	const [consultas, setConsultas] = useState([]);
	const [loadingData, setLoadingData] = useState(false);
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);
	// const { status } = useSession();

	useEffect(() => {
		const getAllConsultas = async () => {
			try {
				let response = await fetch('/api/solicitudes/nuevaConsulta');
				let dataConsultas = await response.json();
				let consultas = dataConsultas.data;
				setAllConsultasGenerales(consultas);

				response = await fetch('/api/solicitudes/nuevaMediacion');
				let dataMediaciones = await response.json();
				let mediaciones = dataMediaciones.data;
				setAllMedaciones(mediaciones);

				response = await fetch('/api/solicitudes/consorcioEdificio');
				let dataConsorcios = await response.json();
				let consorcios = dataConsorcios.data;
				setAllConsorcioEdificios(consorcios);

				getUltimasConsultas(consultas, mediaciones, consorcios);
			} catch (error) {
				console.error('Error fetching consultas:', error);
			}
		};
		getAllConsultas();
	}, []);

	function getUltimasConsultas(consultas, mediaciones, consorcios) {
		let todasLasConsultas = [...consultas, ...mediaciones, ...consorcios];
		let ultimasConsultas = ordenarPorFecha(todasLasConsultas);
		setAllConsultas(ultimasConsultas);
	}

	function ordenarPorFecha(arreglo) {
		return arreglo.sort((a, b) => {
			const fechaA =
				a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
			const fechaB =
				b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
			return fechaB - fechaA; // Ordena de la más nueva a la más vieja
		});
	}

	const getConsultasByCategoria = async (category) => {
		setLoadingData(true);
		let categoria;
		switch (category) {
			case 'Nueva Consulta':
				categoria = 'nuevaConsulta';
				break;
			case 'Nueva Mediación':
				categoria = 'nuevaMediacion';
				break;
			case 'Consorcio Edificio':
				categoria = 'consorcioEdificio';
				break;
			default:
				console.log('nuevaConsulta');
		}

		try {
			const response = await fetch(`/api/solicitudes/${category}`);
			const data = await response.json();
			setConsultas(data);
		} catch (error) {
			console.error('Error filtering consultas by category:', error);
		}
	};

	const getConsultasBySearch = async (category) => {
	}

	return (
		<ConsultasContext.Provider
			value={{
				allConsultas,
				allMediaciones,
				allConsorcioEdificios,
				allConsultasGenerales,
				consultas,
				getConsultasByCategoria,
				loadingData,
				getConsultasBySearch,
				isCartModalOpen,
			}}
		>
			{children}
		</ConsultasContext.Provider>
	);
}

const useConsultasContext = () => useContext(ConsultasContext);

export { ConsultasProvider, useConsultasContext };
