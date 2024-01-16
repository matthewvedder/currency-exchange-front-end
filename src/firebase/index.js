import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "parallax-challenge.firebaseapp.com",
  projectId: "parallax-challenge",
  storageBucket: "parallax-challenge.appspot.com",
  messagingSenderId: "815658266329",
  appId: "1:815658266329:web:08a9a6d277e0a4068198c8",
  measurementId: "G-EL8CCYNLH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;