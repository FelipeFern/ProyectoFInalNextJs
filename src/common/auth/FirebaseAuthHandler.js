import { isEmpty } from 'class-validator';
import { getRepository } from 'fireorm';
import { UserAuth } from '../fireorm/fireorm-models.type';
import { db } from '../db/firebase';
import { collection, setDoc } from 'firebase/firestore';

/**
 * Handles authorization for Firebase adapter
 */
export default function FirebaseAuthHandler() {
  return {
    /**
     * Create new user and save it on the DB.
     */
    async createUser(data) {
      data.created = new Date();
      data.updated = new Date();

      if (isEmpty(data.name)) {
        data.name = data.email;
      }

      const usersRef = collection(db, 'users');

      await setDoc(usersRef, data).then((docRef) => console.log(docRef));

      return remoteUser;
    },

    async getUserById(id) {
      const usersRef = collection(db, 'users');
      const user = query(usersRef, where('id', '==', id));
      if (!user) {
        return null;
      }

      return user;
    },

    async getUserByEmail(email) {
      const usersRef = collection(db, 'users');
      const user = query(usersRef, where('email', '==', email));
      if (!user) {
        return null;
      }

      return user;
    },

    async updateUser(partialUser) {
      const usersRef = collection(db, 'users');
      const currentUser = query(usersRef, where('id', '==', partialUser.id));

      const updatedUser = {
        ...currentUser,
        ...partialUser,
      };

      await setDoc(usersRef, updatedUser, { merge: true }).then((docRef) =>
        console.log(docRef)
      );

      return updatedUser;
    },
  };
}
