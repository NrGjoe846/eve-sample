// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnZFIflJ-xJ7eVownwkUy6C2wyuX8MfsE",
  authDomain: "prime-auth-42331.firebaseapp.com",
  projectId: "prime-auth-42331",
  storageBucket: "prime-auth-42331.firebasestorage.app",
  messagingSenderId: "662458488503",
  appId: "1:662458488503:web:9bda3ef9bff0ad2dbfdf32",
  measurementId: "G-20WBJ8Y0PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  googleProvider,
  githubProvider,
  signInWithPopup,
  sendPasswordResetEmail
};
