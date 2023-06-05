import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Localidades() {
	const [localidades, setLocalidades] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				const response = await fetch('/api/localidades');
				const data = await response.json();
				setLocalidades(data.data);
				setLoading(false);
			};

			fetchData().catch((error) => {
				console.error(error);
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<div>
			<Dashboard results={localidades} />
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
