import { HTTPMethod } from '@/common/api/methods';
import { permissionName } from '@/common/types/permissions';
import {
	collection,
	doc,
	query,
	where,
	deleteDoc,
	getDocs,
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
		const usersRef = collection(db, 'users');
		const usersQuery = query(usersRef, where('id', '==', uid));
		const usersDocs = await getDocs(usersQuery);
		const data = usersDocs.docs[0].data();

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onDELETE(req, res) {
	try {
		const usersRef = collection(db, 'users');
		const usersQuery = query(usersRef, where('id', '==', uid));
		await deleteDoc(doc(usersQuery));
		//  await deleteDoc(usersRef, where('id', '==', id));
		res.status(200).json('User deleted');
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onPUT(req, res) {
	try {
		let randonLocalidad = Math.floor(Math.random() * localidades.length);
		let localidadId = localidades[randonLocalidad].id;
		const docRef = await addDoc(collectionRef, {
			obj,
			localidad: localidadId,
			createdAt: new Date(),
		});
		console.log(docRef);
		const id = docRef.id;
		await updateDoc(doc(collectionRef, id), { id });
		console.log(`Document created with ID: ${id}`);
	} catch (error) {
		res.status(404).json({ error });
	}
}
