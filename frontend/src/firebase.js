import firebase from "/firebase/app";
import "firebase/firestore";

import React, {useEffect, useState} from "react";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8l0LYbvvZczdessb11nAce9rFRDiZIGM",
    authDomain: "neuropets-9c731.firebaseapp.com",
    projectId: "neuropets-9c731",
    storageBucket: "neuropets-9c731.appspot.com",
    messagingSenderId: "610747636675",
    appId: "1:610747636675:web:ee9065011b0776f6443b76",
    measurementId: "G-2J48ZD9GF7"
  };

  firebase.intializeApp(firebaseConfig);

  export default firebase; 