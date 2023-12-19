// import React, { useState, useEffect } from 'react';
// import Dashboard from '@/components/DashboardLocalidades/Dashboard';

// export default function UsersDashboard() {
// 	const [users, setUsers] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		try {
// 			const fetchData = async () => {
// 				setLoading(true);
// 				const response = await fetch('/api/users');
// 				const data = await response.json();
// 				setUsers(data.data);
// 				setLoading(false);
// 				console.log(data.data);
// 			};

// 			fetchData().catch((error) => {
// 				console.error(error);
// 				setLoading(false);
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}, []);

// 	return (
// 		<div>
// 			<Dashboard results={users} />
// 		</div>
// 	);
// }

// // Ponerlo derecho> 2:53:00 explica.
// // Poner la barra izq y la de arriba fijas.
