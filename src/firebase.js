// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfhDYOGAZGDAARzEy1lVtSwgtnWh1rAYI",
  authDomain: "nglog-72cc6.firebaseapp.com",
  projectId: "nglog-72cc6",
  databaseUrl : "https://nglog-72cc6-default-rtdb.firebaseio.com/",
  storageBucket: "nglog-72cc6.appspot.com",
  messagingSenderId: "956582154652",
  appId: "1:956582154652:web:8ed049301076ce9d67b859",
  measurementId: "G-WZ5ZR47N5B"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);