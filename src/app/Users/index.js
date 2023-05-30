import React, { useState } from 'react';
import Content from '@/components/Dashboard/Content';
import ResultsCards from '@/components/Dashboard/ResultsCards';

export default function Dashboard() {
	return (
		<div>
			<Content />
			<ResultsCards />
		</div>
	);
}

// Ponerlo derecho> 2:53:00 explica.
// Poner la barra izq y la de arriba fijas.
