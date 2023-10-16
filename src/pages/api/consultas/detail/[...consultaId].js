import { HTTPMethod } from '../../../../common/api/methods';
import { permissionName } from '../../../../common/types/permissions';
import { collection, getDocs, getDoc } from 'firebase/firestore';
import APIRouteHelper from '../../../../common/api/APIRouteHelper';
import { db } from '../../../../common/db/firebase';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_empresas)
		.setMethod(HTTPMethod.GET, {
			handle: onGET,
		})
		.handle();
}

async function onGET(req, res) {
	try {
		const consultaId = req.query.consultaId;
		const id = consultaId.join('');

		const consultasGeneralesCollection = collection(db, 'NuevaConsulta');
		const consultasGeneralesDocs = await getDocs(consultasGeneralesCollection);
		const consultasGenerales = consultasGeneralesDocs.docs.map((doc) => doc.data());

		const mediacionesCollection = collection(db, 'SolicitudMediacion');
		const mediacionesDocs = await getDocs(mediacionesCollection);
		const mediaciones = mediacionesDocs.docs.map((doc) => doc.data());

		const consorciosCollection = collection(db, 'SolicitudConsorcioEdificio');
		const consorciosDocs = await getDocs(consorciosCollection);
		const consorcios = consorciosDocs.docs.map((doc) => doc.data());

		const consultas = consultasGenerales.concat(mediaciones, consorcios);
		console.log(consultas)

		const consulta = consultas.find((doc) => doc.id === id);
		if (consulta) {
			return res.status(200).json({ consulta });
		} else {
			console.log('Objeto no encontrado');
			res.status(400).json('Consulta no encontrada');
			return;
		}

	} catch (error) {
		res.status(400).json({ error });
	}
}
