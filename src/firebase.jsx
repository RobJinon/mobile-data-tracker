// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFw-WkQYe0Kx7OEmpSmHCbLyFeOTLxrIk",
  authDomain: "test-8bddd.firebaseapp.com",
  projectId: "test-8bddd",
  storageBucket: "test-8bddd.appspot.com",
  messagingSenderId: "1018973456181",
  appId: "1:1018973456181:web:89485fb77650102dc2ae7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { auth, googleProvider };