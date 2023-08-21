import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import {
	collection,
	getDocs,
	doc,
	addDoc,
	updateDoc,
} from 'firebase/firestore';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_tipoSolicitudes)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.setMethod(HTTPMethod.POST, {
			handle: onPOST,
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

async function onPOST(req, res) {
	console.log(req.body);

	let {
		nombre,
		apellido,
		dni,
		cuil,
		telefonoCelular,
		telefonoFijo,
		domicilioCalle,
		domicilioNumero,
		domicilioPiso,
		email,
		localidad,
		empresa,
		tipoConsulta,
	} = req.body;

	const firebaseCollection = collection(db, 'Solicitudes');
	const docRef = await addDoc(firebaseCollection, {
		...req.body,

		createdAt: new Date(),
	});
	const id = docRef.id;
	await updateDoc(doc(firebaseCollection, id), { id });
	console.log(`New Solicitud created with ID: ${id}`);

	res.status(200).json({ id: id });
}
