import {isEmpty} from 'class-validator';
import {db} from '../db/firebase';
import {collection, setDoc, query} from 'firebase/firestore';

/**
 * Handles authorization for Firebase adapter
 */
export default function FirebaseAuthHandler() {
  async function saveUserRole(user) {
    const newUser = await converUserToRemoteUser(user);

    const usersRef = collection(db, 'users');
    await setDoc(usersRef, newUser, {merge: true});
  }

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

      let user = await setDoc(usersRef, data).then((docRef) =>
        console.log(docRef)
      );

      const userWRole = await this.assingRole(user, 'base');

      return userWRole;
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

      await setDoc(usersRef, updatedUser, {merge: true}).then((docRef) =>
        console.log(docRef)
      );

      return updatedUser;
    },

    async assingRole(user, roleId) {
      const currentRoles = user.roles;

      if (hasRole(user, roleId)) {
        return user;
      }

      const rolesRef = collection(db, 'roles');
      const role = query(rolesRef, where('id', '==', roleId));

      if (!role) return user;

      const newRoles = [...currentRoles, role];

      const userWithRoles = user;
      userWithRoles.roles = newRoles;

      await saveInRemote(userWithRoles);

      return userWithRoles;
    },
  };
}
