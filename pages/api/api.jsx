// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2JLu34VGYZf3ou22dVGXCM_wC4bRn6Vw",
  auAIzaSyB2JLu34VGYZf3ou22dVGXCM_wC4bRn6VwthDomain: "clranalyzer.firebaseapp.com",
  projectId: "clranalyzer",
  storageBucket: "clranalyzer.appspot.com",
  messagingSenderId: "514632434394",
  appId: "1:514632434394:web:394234294ce5b6e1251be3"
};

let db, auth, storage;


// Initialize Firebase
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  // Skip initialization
  console.log("Firebase already initialized, skipping re-initialization.");
}

export { db, auth, storage };