import { ChangeEvent, useEffect, useState } from 'react';

const INITIAL_CONSULTAS_FILTERS = {
	tipoConsultas: [],
	empresas: [],
	localidades: [],
	ciudadanos: [],
	estados: [],
};

export default function useFilters(consultas) {
	const [consultasFilters, setConsultasFilters] = useState(
		INITIAL_CONSULTAS_FILTERS
	);
	const [applyFilters, setApplyFilters] = useState(INITIAL_CONSULTAS_FILTERS);
	const [filterValues, setFilterValues] = useState({});
	const [consultasFiltered, setConsultasFiltered] = useState([]);
	const [orderBy, setOrderBy] = useState('');

	useEffect(() => {
		const setAllFilters = () => {
			if (consultas.length > 0) {
				const tipoConsultas = consultas
					.map((consulta) => consulta.tipo)
					.filter((value, index, self) => self.indexOf(value) === index);

				const empresas = consultas
					.map((consulta) => consulta.empresa)
					.filter((value, index, self) => self.indexOf(value) === index);

				const localidadesUnicas = consultas
					.map((consulta) => consulta.localidad)
					.filter((value, index, self) => self.indexOf(value) === index);

				const ciudadanosUnicosNombre = consultas
					.map((consulta) => consulta.nombre + ' ' + consulta.apellido)
					.filter((value, index, self) => self.indexOf(value) === index);

				const estadosUnicas = consultas
					.map((consulta) => consulta.estado)
					.filter((value, index, self) => self.indexOf(value) === index);


				setConsultasFilters({
					tipoConsultas: tipoConsultas,
					empresas: empresas,
					localidades: localidadesUnicas,
					ciudadanos: ciudadanosUnicosNombre,
					estados: estadosUnicas
				});
			}
		};
		setAllFilters();
	}, [consultas]);

	useEffect(() => {
		const { tipoConsultas, empresas, localidades, ciudadanos , estados} = applyFilters;
		const isAnyFilter =
			!!tipoConsultas.length ||
			!!empresas.length ||
			!!localidades.length ||
			!!ciudadanos.length ||
			!!estados.length;

		if (isAnyFilter) {
			const newConsultas = consultas.filter((consulta) => {
				const hasTipoConsultaFilter = !!tipoConsultas.length
					? tipoConsultas.includes(consulta.tipo)
					: true;

				const hasEmpresaFilter = !!empresas.length
					? empresas.includes(consulta.empresa)
					: true;

				const hasLocalidadFilter = !!localidades.length
					? localidades.includes(consulta.localidad)
					: true;

				let name = consulta.nombre + ' ' + consulta.apellido;
				const hasCiudadanoFilter = !!ciudadanos.length
					? ciudadanos.includes(name)
					: true;

				const hasEstadoFilter = !!estados.length
					? estados.includes(consulta.estado)
					: true;

				// const hasMatchingPrice =
				// 	!!minPrice && !!maxPrice
				// 		? consulta.precio >= minPrice && consulta.precio <= maxPrice
				// 		: true;

				return (
					hasTipoConsultaFilter &&
					hasEmpresaFilter &&
					hasLocalidadFilter &&
					hasCiudadanoFilter &&
					hasEstadoFilter
				);
			});
			setConsultasFiltered(newConsultas);
		} else {
			setConsultasFiltered(consultas);
		}
	}, [applyFilters]);

	const filters = {
		updateEmpresas: (e) => {
			const empresa = e.target.name;
			const isChecked = e.target.checked;

			setApplyFilters((prevFilters) => ({
				...prevFilters,
				empresas: isChecked
					? [...prevFilters.empresas, empresa]
					: prevFilters.empresas.filter((cat) => cat !== empresa),
			}));

			updateFiltersValues(empresa, isChecked);
		},
		updateTipoConsulta: (e) => {
			const tipoConsulta = e.target.name;
			const isChecked = e.target.checked;

			setApplyFilters((prevFilters) => ({
				...prevFilters,
				tipoConsultas: isChecked
					? [...prevFilters.tipoConsultas, tipoConsulta]
					: prevFilters.tipoConsultas.filter((cat) => cat !== tipoConsulta),
			}));

			updateFiltersValues(tipoConsulta, isChecked);
		},
		// updatePrecioMinMax: (nuevoPrecioMin, nuevoPrecioMax) => {
		// 	setApplyFilters((prevFilters) => ({
		// 		...prevFilters,
		// 		precioMinMax: [nuevoPrecioMin, nuevoPrecioMax],
		// 	}));

		// 	updateFiltersValues('precioMinMax', [nuevoPrecioMin, nuevoPrecioMax]);
		// },
		updateLocalidades: (e) => {
			const localidad = e.target.name;
			const isChecked = e.target.checked;

			setApplyFilters((prevFilters) => ({
				...prevFilters,
				localidades: isChecked
					? [...prevFilters.localidades, localidad]
					: prevFilters.localidades.filter((cat) => cat !== localidad),
			}));

			updateFiltersValues(localidad, isChecked);
		},
		updateCiudadanos: (e) => {
			const ciudadano = e.target.name;
			const isChecked = e.target.checked;

			setApplyFilters((prevFilters) => ({
				...prevFilters,
				ciudadanos: isChecked
					? [...prevFilters.ciudadanos, ciudadano]
					: prevFilters.ciudadanos.filter((cat) => cat !== ciudadano),
			}));

			updateFiltersValues(ciudadano, isChecked);
		},
		updateEstados: (e) => {
			const estado = e.target.name;
			const isChecked = e.target.checked;
			console.log(estado);

			setApplyFilters((prevFilters) => ({
				...prevFilters,
				estados: isChecked
					? [...prevFilters.estados, estado]
					: prevFilters.estados.filter((cat) => cat !== estado),
			}));

			updateFiltersValues(estado, isChecked);
		},
	};

	const updateFiltersValues = (key, value) => {
		setFilterValues((prevValues) => ({
			...prevValues,
			[key]: value,
		}));
	};

	useEffect(() => {
		const newConsultas = [...consultas].sort((a, b) => {
			const fechaA =
				a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
			const fechaB =
				b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
			if (orderBy === 'asc') {
				return fechaB - fechaA; // Ordena de la más nueva a la más vieja
			} else {
				return fechaA - fechaB;
			}
		});

		setConsultasFiltered(newConsultas);
	}, [orderBy]);

	const resetFilters = () => {
		setApplyFilters({
			...INITIAL_CONSULTAS_FILTERS,
		});
		setFilterValues({});
	};

	const allConsultas =
		consultasFiltered.length > 0 ? consultasFiltered : consultas;

	return {
		consultas: allConsultas,
		consultasFilters,
		setApplyFilters,
		filters,
		updateFilters: applyFilters,
		setOrderBy,
		resetFilters,
		filterValues,
		setFilterValues,
	};
}
