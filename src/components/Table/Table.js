const { useEffect } = require('react');

export function Table() {
	const state = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<table className='table'>
			<thead className='table__head'>
				<tr className='table__row'>
					<th className='table__cell'>Full name</th>
					<th className='table__cell'>Email</th>
					<th className='table__cell'>Address</th>
					<th className='table__cell'>Phone</th>
					<th className='table__cell'>Actions</th>
				</tr>
			</thead>
			<tbody className='table__body'>
				{state.users.map((user) => (
					<tr className='table__row' key={user.id}>
						<td className='table__cell'>
							{user.nombre} {user.apellido}
						</td>
						<td className='table__cell'>{user.email}</td>
						<td className='table__cell'>{user.direccion}</td>
						<td className='table__cell'>{user.telefono}</td>
						<td className='table__cell'>
							<button
								className='table__button btn btn__compact btn__edit'
								onClick={() => {
									dispatch(setSelectedUser(user.id));
									dispatch(setModal(true));
								}}
							>
								Edit
							</button>
							<button
								className='table__button btn btn__compact btn__delete'
								onClick={() => {
									dispatch(deleteUser(user.id));
								}}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
