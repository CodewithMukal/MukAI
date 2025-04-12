// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRBCip1PPJLfE1OCz0I3SuKOaa_lohYic",
  authDomain: "mukai-8cbd9.firebaseapp.com",
  projectId: "mukai-8cbd9",
  storageBucket: "mukai-8cbd9.firebasestorage.app",
  messagingSenderId: "1093034804781",
  appId: "1:1093034804781:web:27d82dff77198a3585daa4",
  measurementId: "G-0MKQGRXLT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);