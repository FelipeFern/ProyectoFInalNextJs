import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth, db } from '../db/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Login from '@/components/Login/Login';

const authContext = React.createContext();

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = useRef(null);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
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
