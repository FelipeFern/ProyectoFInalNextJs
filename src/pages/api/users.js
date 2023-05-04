import {HTTPMethod} from '../../common/api/methods';
import {permissionName} from '../../common/types/permissions';
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
import {db} from '../../common/db/firebase';

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
	let users = [];
	const usersRef = collection(db, 'users');

	const usersDocs = await getDocs(usersRef);
	const data = usersDocs.docs.map((doc) => doc.data());

	res.status(200).json({data});
}

async function onDELETE(req, res) {
	let id = req.data.id;
	const usersRef = doc(db, 'users');
	await deleteDoc(usersRef, where('id', '==', id));
}
