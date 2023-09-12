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
} from 'firebase/storage';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';
import formidable, { formidableErrors } from 'formidable';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

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

// async function onPOST(req, res) {
// 	try {
// 		const form = formidable({});

// 		form.parse(req, async (err, fields, files) => {
// 			let {
// 				nombre,
// 				apellido,
// 				dni,
// 				cuil,
// 				telefonoCelular,
// 				telefonoFijo,
// 				domicilioCalle,
// 				domicilioNumero,
// 				domicilioPiso,
// 				email,
// 				localidad,
// 				empresa,
// 				tipoConsulta,
// 			} = fields;

// 			console.log(fields);
// 			if (err) {
// 				console.log(err);
// 				res.status(500).json({ error: 'Error al procesar el formulario' });
// 				return;
// 			}

// 			const rutaAlmacenamiento = `${localidad}/${dni}/${empresa}`;
// 			const storage = getStorage();

// 			for (const key in files) {
// 				if (Object.hasOwnProperty.call(files, key)) {
// 					const file = files[key];
// 					const fileName = file.name; // Nombre original del archivo

// 					// Construye la referencia de almacenamiento con la ruta personalizada
// 					const fileRef = ref(storage, `${rutaAlmacenamiento}${fileName}`);

// 					// Sube el archivo a Firebase Storage
// 					await uploadBytes(fileRef, file.path);

// 					console.log(`Archivo ${fileName} cargado en ${rutaAlmacenamiento}`);
// 				}
// 			}

// 			// for (let file of files) {
// 			// 	console.log(file);
// 			// }

// 			// Hay que guardar los archivos en la BD

// 			// console.log('Campos:', fields);
// 			// console.log('Archivos:', files);
// 			// Envía la respuesta una vez que hayas terminado de procesar.
// 			res.status(200).json({ mensaje: 'Procesamiento completado' });
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error al procesar' });
// 	}
// }

async function onPOST(req, res) {
	try {
		console.log('Entre');

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
				res.status(400).json({ error: 'No se han proporcionado archivos.' });
				return;
			}

			const rutaAlmacenamiento = `${localidad}/${dni}/${empresa}/`;
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
				await uploadBytes(fileRef, fileBuffer, metadata);

				console.log(`Archivo ${fileName} cargado en ${rutaAlmacenamiento}`);
			}

			res.status(200).json({ mensaje: 'Procesamiento completado' });
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
