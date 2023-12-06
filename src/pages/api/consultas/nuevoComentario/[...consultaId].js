import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import {
	collection,
	getDocs,
	doc,
	addDoc,
	getDoc,
	updateDoc,
	query,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	put,
	getDownloadURL,
} from 'firebase/storage';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';
import multer from 'multer';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_empresas)
		.setMethod(HTTPMethod.POST, {
			handle: onPOST,
		})
		.handle();
}

async function onPOST(req, res) {
	try {
		const filesArray = [];
		const processForm = async () => {
			await new Promise(async (resolve, reject) => {
				const upload = multer().array('archivos', 5);
				await upload(req, res, (err) => {
					if (err) {
						console.error(err);
						return res.status(500).json({ error: err.message });
						reject(err);
					} else {
						resolve();
					}
				});
			});
			// Accede a los archivos cargados a través de req.files, que será un array.
			const archivos = req.files;
			const { estado, comentarios, dni, responsable, tipo } = req.body;

			// Verifica si se cargaron archivos.
			// if (!archivos || archivos.length === 0) {
			// 	res.status(400).json({ error: 'No se han seleccionado archivos.' });
			// 	return;
			// }

			const consultaId = req.query.consultaId;
			const idConsulta = consultaId.join('');
			let collectionType = '';

			switch (tipo) {
				case 'Consorcio edificio':
					collectionType = 'SolicitudConsorcioEdificio';
					break;
				case 'Consulta general':
					collectionType = 'NuevaConsulta';
					break;
				case 'Solicitud mediación':
					collectionType = 'SolicitudMediacion';
					break;
				// case 'Cancelada':
				// 	textColor = 'text-red-500';
				// 	break;
			}

			// const tipoConsultaQuery = query(
			// 	tipoConsultaRef,
			// 	where('id', '==', idConsulta)
			// );
			const docRef = doc(db, collectionType, idConsulta);
			const docSnap = await getDoc(docRef);
			let consulta = docSnap.data();

			console.log(consulta)

			const rutaAlmacenamiento = `ArchivosComentarios/${idConsulta}/`;
			const storage = getStorage();

			// Itera sobre los archivos y realiza operaciones con cada uno.
			if (archivos.length > 0) {
				for (const file of archivos) {
					const fileName = file.originalname;
					const fileBuffer = file.buffer; // Búfer del archivo

					const metadata = {
						contentType: file.mimetype,
					};

					// Construye la referencia de almacenamiento con la ruta personalizada
					const fileRef = ref(storage, `${rutaAlmacenamiento}${fileName}`);

					// Sube el archivo a Firebase Storage
					let uploadFile = await uploadBytes(fileRef, fileBuffer, metadata);
					await getDownloadURL(uploadFile.ref).then((downloadURL) => {
						console.log('File available at', downloadURL);
						filesArray.push({ fileName, downloadURL });
					});

					console.log(`Archivo ${fileName} cargado en ${rutaAlmacenamiento}`);
				}
			}

			let estados = consulta.estados;

			let nuevoEstado = {
				comentarios: comentarios,
				estado: estado,
				responsable: responsable,
				archivos: filesArray,
				createdAt: new Date(),
			};
			let nuevosEstados = estados.concat(nuevoEstado);
			console.log(nuevosEstados);
			await updateDoc(doc(db, collectionType, idConsulta), {
				estados: nuevosEstados,
			});

			return res.status(200).json({ consulta });
		};

		await processForm();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al procesar' });
	}
}


export const config = {
	api: {
		bodyParser: false,
	},
};
