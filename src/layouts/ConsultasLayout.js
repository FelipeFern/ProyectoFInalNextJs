import { useState } from 'react';

import PageLayout from '@/layouts/PageLayout';
import FilterSection from '@/components/pages/consultas/FilterSection';
import useFilters from '@/hooks/useFilters';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ConsultasList from '@/components/pages/consultas/ConsultasList';

export default function ConsultasLayout({ allConsultas, query }) {
	const [filtersOppened, setFiltersOppened] = useState(false);

	const {
		consultas,
		consultasFilters,
		filters,
		setOrderBy,
		updateFilters,
		resetFilters,
		filterValues,
	} = useFilters(allConsultas);

	const pageTitle = query ? query : '';

	return (
		<PageLayout title={pageTitle} footer={!filtersOppened}>
			<Breadcrumb />
			{allConsultas.length === 0 ? (
				<div className='text-center pt-10 mt-16'>No hay consultas</div>
			) : (
				<div className='md:flex mt-16'>
					<FilterSection
						filtersOppened={filtersOppened}
						setFiltersOppened={setFiltersOppened}
						filters={consultasFilters}
						applyFilters={filters}
						setOrderBy={setOrderBy}
						updateFilters={updateFilters}
						resetFilters={resetFilters}
						filterValues={filterValues}
					/>
					<ConsultasList
						filtersOppened={filtersOppened}
						consultas={consultas}
						setOrderBy={setOrderBy}
					/>
				</div>
			)}
		</PageLayout>
	);
}
