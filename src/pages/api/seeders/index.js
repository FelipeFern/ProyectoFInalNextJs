import {
	collection,
	addDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../../common/db/firebase.js';
import {
	localidad,
	tipoConsulta,
	empresasDenunciadas,
	sectorOmic,
	users,
	denunciantes,
	consultas,
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
	try {
		// const localidadRef = collection(db, 'localidad');
		// await addDocumentsToCollection(localidadRef, localidad);

		// const tipoConsultaRef = collection(db, 'tipoConsulta');
		// addDocumentsToCollection(tipoConsultaRef, tipoConsulta);

		// const empresasDenunciadasRef = collection(db, 'empresasDenunciadas');
		// await seedWithLocalidad(empresasDenunciadasRef, empresasDenunciadas);

		// const sectorOmicRef = collection(db, 'sectorOmic');
		// addDocumentsToCollection(sectorOmicRef, sectorOmic);

		// const denunciantesRef = collection(db, 'denunciantes');
		// seedWithLocalidad(denunciantesRef, denunciantes);

		const consultasRef = collection(db, 'consultas');
		uploadConsultas(consultasRef, consultas);
	} catch (error) {
		res.status(400).json({ error });
	}

	res.status(200).json({ data: 'Data uploaded in the DB.' });
}

async function addDocumentsToCollection(collectionRef, data) {
	for (let obj of data) {
		try {
			const docRef = await addDoc(collectionRef, {
				obj,
				createdAt: new Date(),
			});
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
				createdAt: new Date(),
			});
			const id = docRef.id;
			await updateDoc(doc(collectionRef, id), { id });
			console.log(`Document created with ID: ${id}`);
		} catch (error) {
			res.status(404).json({ error });
		}
	}
}

async function uploadConsultas(consultasRef, data) {
	const estadoConsultaColRef = collection(db, 'estadoConsulta');
	const tipoConsultaRef = collection(db, 'tipoConsulta');
	const tipoConsultaQuery = query(
		tipoConsultaRef,
		where('nombre', '==', 'Consulta')
	);
	const tipoConsulta = await getDocs(tipoConsultaQuery);
	const tipoConsultaId = tipoConsulta.docs[0].data().id;

	const sectorOmicRef = collection(db, 'sectorOmic');
	const sectorOmicQuery = query(
		sectorOmicRef,
		where('nombre', '==', 'Administracion-Consultas')
	);
	const sectorOmic = await getDocs(sectorOmicQuery);
	const sectorOmicId = sectorOmic.docs[0].data().id;

	const empleadoAsignadoRef = collection(db, 'users');
	const empleadoAsignadoQuery = query(
		empleadoAsignadoRef,
		where('nombre', '==', 'Felipe')
	);
	const empleadoAsignado = await getDocs(empleadoAsignadoQuery);
	const empleadoAsignadoId = empleadoAsignado.docs[0].data().id;

	let estadoConsulta = {
		nombre: 'En proceso',
		descripcion: 'La consulta se encuentra en proceso',
		tipoConsulta: tipoConsultaId,
		sectorOmic: sectorOmicId,
		empleadoAsignado: empleadoAsignadoId,
	};

	for (let obj of data) {
		const estadoConsultaRef = await addDoc(estadoConsultaColRef, {
			estadoConsulta,
			createdAt: new Date(),
		});
		const estadoConsultaId = estadoConsultaRef.id;
		await updateDoc(doc(estadoConsultaColRef, estadoConsultaId), {
			id: estadoConsultaId,
		});
		let arrayEstadosConsultas = [estadoConsultaId];
		const docRef = await addDoc(consultasRef, {
			...obj,
			ultimoEstadoConsulta: estadoConsultaId,
			estadosConsultas: arrayEstadosConsultas,
			createdAt: new Date(),
		});
		const id = docRef.id;
		await updateDoc(doc(consultasRef, id), { id });

		await updateDoc(doc(estadoConsultaColRef, estadoConsultaId), {
			consulta: id,
		});
	}
}
