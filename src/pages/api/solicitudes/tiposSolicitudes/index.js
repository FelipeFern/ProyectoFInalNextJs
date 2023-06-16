import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import { collection, getDocs } from 'firebase/firestore';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_tipoSolicitudes)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.handle();
}

async function onGET(req, res) {
	try {
		const firastoreCollection = collection(db, 'tipoSolicitudes');

		const firebaseDocs = await getDocs(firastoreCollection);
		const data = firebaseDocs.docs.map((doc) => doc.data());

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ error });
	}
}
