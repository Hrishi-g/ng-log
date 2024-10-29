// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:"",
  authDomain: "",
  projectId: "",
  databaseUrl : "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-WZ5ZR47N5B"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);