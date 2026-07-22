import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-yHn9GADt5TRBKJ8VO8H_KqXJHEWEOC8",
  authDomain: "gramin-connect-ca088.firebaseapp.com",
  projectId: "gramin-connect-ca088",
  storageBucket: "gramin-connect-ca088.firebasestorage.app",
  messagingSenderId: "594731467075",
  appId: "1:594731467075:web:032c1521bdb316ea802ff6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);