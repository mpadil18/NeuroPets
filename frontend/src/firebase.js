import { initializeApp } from 'firebase/app';
/* tell firebase to have access to firestore service */
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8l0LYbvvZczdessb11nAce9rFRDiZIGM",
  authDomain: "neuropets-9c731.firebaseapp.com",
  projectId: "neuropets-9c731",
  storageBucket: "neuropets-9c731.appspot.com",
  messagingSenderId: "610747636675",
  appId: "1:610747636675:web:ee9065011b0776f6443b76",
  measurementId: "G-2J48ZD9GF7"
};

const app = initializeApp(firebaseConfig);

/* Exporting gives us access to the database elsewhere in our app */
export const db = getFirestore(app);