import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // Email/password registration
  const register = async (email, password, displayName) => {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
      // Force update user state
      setUser({ ...userCredential.user, displayName });
    }
    return userCredential;
  };

  // Update display name for current user
  const setDisplayName = async (displayName) => {
    const { updateProfile } = await import('firebase/auth');
    if (auth.currentUser && displayName) {
      await updateProfile(auth.currentUser, { displayName });
      setUser({ ...auth.currentUser, displayName });
    }
  };

  // Email/password login
  const login = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign-in
  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout, setDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
