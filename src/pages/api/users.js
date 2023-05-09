import { HTTPMethod } from '../../common/api/methods';
import { permissionName } from '../../common/types/permissions';
import {
	collection,
	doc,
	query,
	where,
	deleteDoc,
	getDoc,
	docs,
	getDocs,
} from 'firebase/firestore';
import APIRouteHelper from '../../common/api/APIRouteHelper';
import { db } from '../../common/db/firebase';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_users)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.setMethod(HTTPMethod.DELETE, {
			handle: onDELETE,
		})
		.handle();
}

async function onGET(req, res) {
	try {
		let users = [];
		const usersRef = collection(db, 'users');

		const usersDocs = await getDocs(usersRef);
		const data = usersDocs.docs.map((doc) => doc.data());

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onDELETE(req, res) {
	try {
		let id = req.data.id;
		const usersRef = collection(db, 'users');
		const user = getDoc(doc(usersRef, id));
		if (user.docs.length === 0) {
			res.status(404).json({ error: 'User not found' });
			return;
		}
		await deleteDoc(usersRef, where('id', '==', id));
	} catch (error) {
		res.status(400).json({ error });
	}
}
