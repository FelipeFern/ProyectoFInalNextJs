import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import {
	collection,
	getDocs,
	doc,
	addDoc,
	updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';
import formidable, { formidableErrors } from 'formidable';

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
	try {
		const form = formidable({});

		form.parse(req, (err, fields, files) => {
			console.log(fields);
			if (err) {
				console.log(err);
				res.status(500).json({ error: 'Error al procesar el formulario' });
				return;
			}

			// Realiza cualquier procesamiento necesario con fields y files aquí.
			console.log('Campos:', fields);
			console.log('Archivos:', files);
			// Envía la respuesta una vez que hayas terminado de procesar.
			res.status(200).json({ mensaje: 'Procesamiento completado' });
		});
	} catch (error) {
		res.status(500).json({ error: 'Error al procesar' });
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
// async function onPOST(req, res) {
// 	try {
// 		let {
// 			nombre,
// 			apellido,
// 			dni,
// 			cuil,
// 			telefonoCelular,
// 			telefonoFijo,
// 			domicilioCalle,
// 			domicilioNumero,
// 			domicilioPiso,
// 			email,
// 			localidad,
// 			empresa,
// 			tipoConsulta,
// 			archivos,
// 		} = req.body;

// 		const form = new formidable.IncomingForm();
// 		console.log('form');
// 		form.parse(req, (err, fields, files) => {
// 			console.log('entre');
// 			if (err) {
// 				res.status(500).json({ error: 'Error al procesar el formulario' });
// 				return;
// 			}
// 			console.log('files');
// 			// const formData = await req.formData();
// 			// const formDataEntryValues = Array.from(formData.values());
// 			// console.log(formDataEntryValues);
// 			console.log(`New Solicitud created with ID: `);
// 			res.status(200).json('Llegamos al final');
// 		});
// 		console.log('salimos');
// 		// res.status(200).json('Llegamos al final');
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: 'Error al procesar;' });
// 	}
// }

// Old POST request working.

// async function onPOST(req, res) {
// 	try {
// 		let {
// 			nombre,
// 			apellido,
// 			dni,
// 			cuil,
// 			telefonoCelular,
// 			telefonoFijo,
// 			domicilioCalle,
// 			domicilioNumero,
// 			domicilioPiso,
// 			email,
// 			localidad,
// 			empresa,
// 			tipoConsulta,
// 			archivos,
// 		} = req.body;

// 		const firebaseCollection = collection(db, 'Solicitudes');
// 		const docRef = await addDoc(firebaseCollection, {
// 			...req.body,

// 			createdAt: new Date(),
// 		});
// 		const id = docRef.id;
// 		await updateDoc(doc(firebaseCollection, id), { id });
// 		console.log(`New Solicitud created with ID: ${id}`);

// 		res.status(200).json({ id: id });
// 	} catch (error) {
// 		console.error(e);
// 		res.status(500).json({ data: null, error: 'Internal Server Error' });
// 	}
// }
