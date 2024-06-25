// Import the functions and SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF2TlAmK4JI6kHbVmUHiDs_GEELS8c-RY",
  authDomain: "wolfstats-cfb9f.firebaseapp.com",
  databaseURL: "https://wolfstats-cfb9f-default-rtdb.firebaseio.com",
  projectId: "wolfstats-cfb9f",
  storageBucket: "wolfstats-cfb9f.appspot.com",
  messagingSenderId: "333749644258",
  appId: "1:333749644258:web:00c21275f171c7a70427bb",
  measurementId: "G-7LFEMYREYS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firestore
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };




