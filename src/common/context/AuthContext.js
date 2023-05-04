import React, {useContext, useState, useEffect, useRef} from 'react';
import {auth, db} from '../db/firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import Login from '../../components/Login/Login.js';

const authContext = React.createContext();

export function useAuth() {
	return useContext(authContext);
}

export function AuthProvider({children}) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const userInfo = useRef(null);

	function signup(userDetails) {
		console.log('entre');
		const {nombre, apellido, sectorOmic, email, password} = userDetails;

		return (
			createUserWithEmailAndPassword(auth, email, password)
				.then((res) => {
					console.log('Vemos que sale');
					console.log(res.user.uid);
					setDoc(doc(db, 'users', res.user.uid), {
						nombre: nombre,
						apellido: apellido,
						sectorOmic: sectorOmic,
						roles: ['empleadoOmic'],
						todos: [],
					});
				})
				//we need to catch the whole sign up process if it fails too.
				.catch((error) => {
					console.log('Something went wrong with sign up: ', error);
				})
		);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(userRef);
				if (docSnap.exists()) {
					userInfo.current = docSnap.data();
				}
			}
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		userInfo,
		signup,
		login,
		logout,
		error,
	};

	return (
		<authContext.Provider value={value}>
			{!loading && children}
			{/* {loading ? <Login /> : childen} */}
		</authContext.Provider>
	);

	// Faltarian las funciones para resetear el password y actualizar el email.
}
