// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBoO70mGvzNpkuU6YBiCQRnxBXPb4QDWmM",
  authDomain: "kinyablog-blogspace.firebaseapp.com",
  databaseURL: "https://kinyablog-blogspace-default-rtdb.firebaseio.com",
  projectId: "kinyablog-blogspace",
  storageBucket: "kinyablog-blogspace.firebasestorage.app",
  messagingSenderId: "1081258363789",
  appId: "1:1081258363789:web:a24771a8e2508484274bc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged };