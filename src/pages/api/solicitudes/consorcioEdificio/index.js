import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import {
	collection,
	getDocs,
	doc,
	addDoc,
	updateDoc,
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
		const firastoreCollection = collection(db, 'SolicitudConsorcioEdificio');

		const firebaseDocs = await getDocs(firastoreCollection);
		const data = firebaseDocs.docs.map((doc) => doc.data());

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ error });
	}
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
						res.status(500).json({ error: 'Error al procesar el formulario' });
						reject(err);
					} else {
						resolve();
					}
				});
			});
			// Accede a los archivos cargados a través de req.files, que será un array.
			const archivos = req.files;
			const {
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

			// Verifica si se cargaron archivos.
			if (!archivos || archivos.length === 0) {
				res.status(400).json({ error: 'No se han seleccionado archivos.' });
				return;
			}

			const firebaseCollection = collection(db, 'SolicitudConsorcioEdificio');
			const docRef = await addDoc(firebaseCollection, {
				...req.body,
				createdAt: new Date(),
				tipo:'Consorcio edificio'
			});
			const id = docRef.id;

			const rutaAlmacenamiento = `ArchivosNuevoConsorcio/${dni}/${id}/`;
			const storage = getStorage();

			
			// Itera sobre los archivos y realiza operaciones con cada uno.
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
					filesArray.push({fileName, downloadURL});
				});

				console.log(`Archivo ${fileName} cargado en ${rutaAlmacenamiento}`);
			}

			await updateDoc(doc(firebaseCollection, id), { id });
			await updateDoc(doc(firebaseCollection, id), { files: filesArray });

			console.log(`New Solicitud de Consorcio de Edificio created with ID: ${id}`);

			res.status(200).json({ id: id });
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

