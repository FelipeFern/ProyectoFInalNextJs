import { HTTPMethod } from '@/common/api/methods';
import { permissionName } from '@/common/types/permissions';
import {
	collection,
	doc,
	query,
	where,
	getDocs,
	getDoc,
	deleteDoc,
} from 'firebase/firestore';
import APIRouteHelper from '@/common/api/APIRouteHelper';
import { db } from '@/common/db/firebase';


export default async function handler(req, res) {
	return new APIRouteHelper(req, res, permissionName.API_users)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		// .setMethod(HTTPMethod.DELETE, {
		// 	handle: onDELETE,
		// })
		// .setMethod(HTTPMethod.PUT, {
		// 	handle: onPUT,
		// })
		.handle();
}

async function onGET(req, res) {
	try {
		const uid = req.query.uid;

		const usersCollection = collection(db, 'Users');
		const usersDocs = await getDocs(usersCollection);
		const users = usersDocs.docs.map((doc) => doc.data());
		// Check if user exists
		let email = uid
		const user = users.find((doc) => doc.email === email);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		let newUser  = {
			nombre: user.nombre,
			apellido: user.apellido,
			role: user.role,
			id: user.id,
			email: user.email,
			createdAt: user.createdAt
		}
		res.status(200).json({ data: newUser });
	} catch (error) {
		res.status(400).json({ error });
	}
}

// async function onDELETE(req, res) {
// 	try {
// 		const usersRef = collection(db, 'users');
// 		const usersQuery = query(usersRef, where('id', '==', uid));
// 		const usersDocs = await getDoc(usersQuery);

// 		if (usersDocs.docs.length === 0) {
// 			res.status(404).json({ error: 'User not found' });
// 			return;
// 		}
// 		await deleteDoc(doc(usersQuery));
// 		//  await deleteDoc(usersRef, where('id', '==', id));
// 		res.status(200).json('User deleted');
// 	} catch (error) {
// 		res.status(400).json({ error });
// 	}
// }

// async function onPUT(req, res) {
// 	try {
// 		let id = uid;
// 		const usersRef = collection(db, 'users');
// 		const usersDocs = await getDoc(query(usersRef, where('id', '==', id)));
// 		if (usersDocs.exists() === false) {
// 			res.status(404).json({ error: 'User not found' });
// 			return;
// 		}

// 		await updateDoc(doc(usersRef, id), req.body);
// 		console.log(
// 			`User updated created with ID: ${id} and with body: ${req.body}`
// 		);
// 		res.status(200).json({ data: 'User updated' });
// 	} catch (error) {
// 		res.status(404).json({ error });
// 	}
// }
