import {
	collection,
	getDocs,
	doc,
	getDoc,
	addDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '@/common/db/firebase';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export const getNextAuthOptions = (req, res) => {
	const authOptions = {
		pages: {
			signIn: '/login',
		},
		secret: process.env.NEXTAUTH_SECRET,
		providers: [
			CredentialsProvider({
				name: 'OMIC-Credentials',
				credentials: {
					email: { label: 'Correo electrónico', type: 'email' },
					password: { label: 'Contraseña', type: 'password' },
					remember: { label: 'Recordarme', type: 'checkbox' },
				},
				async authorize(credentials) {
					const usersCollection = collection(db, 'Users');
					const usersDocs = await getDocs(usersCollection);
					const users = usersDocs.docs.map((doc) => doc.data());
					// Check if user exists
					const user = users.find((doc) => doc.email === credentials.email);
					if (!user) {
						return null;
					}

					const isPasswordMatch = await isPasswordValid(
						credentials.password,
						user.password
					);

					if (!isPasswordMatch) {
						return null;
					}

					const isValidPassword =
						credentials?.password &&
						credentials.password.length >= 4 &&
						credentials.password.length <= 20;

					if (!isValidPassword) {
						return null;
					}
					return user;
				},
			}),
		],
		session: {
			strategy: 'jwt',
			maxAge: 30 * 24 * 60 * 60, // 30 Days
		},
		callbacks: {
			async jwt({ token, user }) {
				if (user) {
					token.role = user.role;
					token.id = user.id;
					token.apellido = user.apellido;
					token.nombre = user.nombre;
					token.email = user.email;
				}
				return token;
			},
			session({ session, token }) {
				if (token && session.user) {
					session.user.role = token.role;
					session.user.id = token.id;
					session.user.apellido = token.apellido;
					session.user.nombre = token.nombre;
					session.user.email = token.email;
				}
				return session;
			},
		},
	};

	return authOptions;
};

export default async function auth(req, res) {
	return await NextAuth(req, res, getNextAuthOptions(req, res));
}

async function isPasswordValid(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
