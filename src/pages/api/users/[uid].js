import { HTTPMethod } from '@/common/api/methods';
import { permissionName } from '@/common/types/permissions';
import {
	collection,
	doc,
	query,
	where,
	deleteDoc,
	getDocs,
	getDoc,
	deleteDoc,
} from 'firebase/firestore';
import APIRouteHelper from '@/common/api/APIRouteHelper';
import { db } from '@/common/db/firebase';

const { uid } = req.query;

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_users)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.setMethod(HTTPMethod.DELETE, {
			handle: onDELETE,
		})
		.setMethod(HTTPMethod.PUT, {
			handle: onPUT,
		})
		.handle();
}

async function onGET(req, res) {
	try {
		const docRef = doc(db, 'users', uid);
		const userDoc = await getDoc(docRef);
		if (!userDoc.exists()) {
			res.status(404).json({ error: 'User not found' });
			return;
		}
		res.status(200).json({ data: userDoc.data });
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onDELETE(req, res) {
	try {
		const usersRef = collection(db, 'users');
		const usersQuery = query(usersRef, where('id', '==', uid));
		const usersDocs = await getDoc(usersQuery);

		if (usersDocs.docs.length === 0) {
			res.status(404).json({ error: 'User not found' });
			return;
		}
		await deleteDoc(doc(usersQuery));
		//  await deleteDoc(usersRef, where('id', '==', id));
		res.status(200).json('User deleted');
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onPUT(req, res) {
	try {
		let id = uid;
		const usersRef = collection(db, 'users');
		const usersDocs = await getDoc(query(usersRef, where('id', '==', id)));
		if (usersDocs.exists() === false) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		await updateDoc(doc(usersRef, id), req.body);
		console.log(
			`User updated created with ID: ${id} and with body: ${req.body}`
		);
		res.status(200).json({ data: 'User updated' });
	} catch (error) {
		res.status(404).json({ error });
	}
}
