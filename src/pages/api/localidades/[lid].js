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
	return new APIRouteHelper(req, res, permissionName.API_localidades)
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
		const docRef = doc(db, 'localidad', lid);
		const localidad = await getDoc(docRef);
		if (!localidad.exists()) {
			res.status(404).json({ error: 'Localidad not found' });
			return;
		}
		res.status(200).json({ data: localidad.data });
	} catch (error) {
		res.status(400).json({ error });
	}
}

async function onDELETE(req, res) {
	try {
		let id = req.data.id;
		const localidadCollection = collection(db, 'localidad');
		const localidad = getDoc(doc(localidadCollection, id));
		if (localidad.docs.length === 0) {
			res.status(404).json({ error: 'Localidad not found' });
			return;
		}
		await deleteDoc(localidadCollection, where('id', '==', lid));
	} catch (error) {
		res.status(400).json({ error });
	}
}
