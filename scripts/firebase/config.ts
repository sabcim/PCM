// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkcpUP0crssFVYZN1yINZttAsR-tyw-MA",
  authDomain: "p-c-m-33328.firebaseapp.com",
  projectId: "p-c-m-33328",
  storageBucket: "p-c-m-33328.appspot.com",
  messagingSenderId: "118300897419",
  appId: "1:118300897419:web:32fa935a39fbc2faa5e48e",
  measurementId: "G-2JHXM066YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)
