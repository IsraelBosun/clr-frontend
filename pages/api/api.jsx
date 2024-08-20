// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  auAIzaSyB2JLu34VGYZf3ou22dVGXCM_wC4bRn6VwthDomain: "clranalyzer.firebaseapp.com",
  projectId: "clranalyzer",
  storageBucket: "clranalyzer.appspot.com",
  messagingSenderId: "514632434394",
  appId: "1:514632434394:web:394234294ce5b6e1251be3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };