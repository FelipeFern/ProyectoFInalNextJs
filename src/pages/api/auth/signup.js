import {
	collection,
	getDocs,
	doc,
	getDoc,
	addDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '@/common/db/firebase';
import APIRouteHelper from '@/common/api/APIRouteHelper';
import { permissionName } from '@/common/types/permissions';
import { HTTPMethod } from '@/common/api/methods';
import { hash } from 'bcryptjs';

export default async function (req, res) {
	return new APIRouteHelper(req, res, permissionName.API_empresas)
		.setMethod(HTTPMethod.POST, {
			handle: onPOST,
		})
		.handle();
}

async function onPOST(req, res) {
	if (req.method === 'POST') {
		const newUser = req.body;

		const usersCollection = collection(db, 'Users');
		const usersDocs = await getDocs(usersCollection);
		const users = usersDocs.docs.map((doc) => doc.data());
		// Check if user exists
		const user = users.find((doc) => doc.email === newUser.email);
		if (user) {
			res.status(422).json({
				success: false,
				message: 'A user with the same email already exists!',
				userExists: true,
			});
			return;
		}

		newUser.password = await hashPassword(newUser.password);

		console.log(newUser)
		const docRef = await addDoc(usersCollection, {
			nombre: newUser.nombre,
			apellido: newUser.apellido,
			email: newUser.email,
			password: newUser.password,
			createdAt: new Date(),
			role: 'Ciudadano',
		});
		const id = docRef.id;
		await updateDoc(doc(usersCollection, id), { id });

		res
			.status(201)
			.json({ success: true, message: 'User signed up successfuly', id });
	} else {
		res.status(400).json({ success: false, message: 'Invalid method' });
	}
}

async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}
