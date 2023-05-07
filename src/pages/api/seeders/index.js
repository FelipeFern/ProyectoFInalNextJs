import {
	collection,
	addDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../../common/db/firebase.js';
import {
	localidad,
	tipoConsulta,
	empresasDenunciadas,
	sectorOmic,
	users,
	denunciantes,
} from '../../../common/seeders/data.js';
import { HTTPMethod } from '../../../common/api/methods.js';
import APIRouteHelper from '../../../common/api/APIRouteHelper';
import { permissionName } from '../../../common/types/permissions.js';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_Seeders)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.handle();
}

async function onGET(req, res) {
	const localidadRef = collection(db, 'localidad');
	await addDocumentsToCollection(localidadRef, localidad);

	const tipoConsultaRef = collection(db, 'tipoConsulta');
	addDocumentsToCollection(tipoConsultaRef, tipoConsulta);

	const empresasDenunciadasRef = collection(db, 'empresasDenunciadas');
	await seedWithLocalidad(empresasDenunciadasRef, empresasDenunciadas);

	// const sectorOmicRef = collection(db, 'sectorOmic');
	// addDocumentsToCollection(sectorOmicRef, sectorOmic);

	const denunciantesRef = collection(db, 'denunciantes');
	seedWithLocalidad(denunciantesRef, denunciantes);

	res.status(200).json({ data: 'Data uploaded in the DB.' });
}

async function addDocumentsToCollection(collectionRef, data) {
	for (let obj of data) {
		try {
			const docRef = await addDoc(collectionRef, obj);
			const id = docRef.id;
			await updateDoc(doc(collectionRef, id), { id });
			console.log(`Document created with ID: ${id}`);
		} catch (error) {
			console.error('Error creating document: ', error);
		}
	}
}

async function seedWithLocalidad(collectionRef, data) {
	const localidadRef = collection(db, 'localidad');
	const localidadDocs = await getDocs(localidadRef);
	const localidades = localidadDocs.docs.map((doc) => doc.data());
	for (let obj of data) {
		try {
			let randonLocalidad = Math.floor(Math.random() * localidades.length);
			let localidadId = localidades[randonLocalidad].id;
			const docRef = await addDoc(collectionRef, {
				obj,
				localidad: localidadId,
			});
			const id = docRef.id;
			await updateDoc(doc(collectionRef, id), { id });
			console.log(`Document created with ID: ${id}`);
		} catch (error) {
			res.status(404).json({ error });
		}
	}
}

// Ejemplo de actualizar algo en el array:>

// import {doc, updateDoc} from 'firebase/firestore';
// import {db} from '../db/firebase';

// const ciudadRef = doc(db, 'ciudades', 'idDeLaCiudad');

// // Agregar un nuevo denunciante
// const nuevoDenunciante = {
//   nombre: 'Juan',
//   telefono: '123456789'
// };

// await updateDoc(ciudadRef, {
//   denunciantes: [...denunciantes, nuevoDenunciante]
// });
