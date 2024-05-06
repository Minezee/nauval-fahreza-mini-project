import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsKQH4Tv0JDQowD0CYZleOir854dnvT_I",
  authDomain: "talterra.firebaseapp.com",
  projectId: "talterra",
  storageBucket: "talterra.appspot.com",
  messagingSenderId: "1023526709345",
  appId: "1:1023526709345:web:06cba279deac2b0ae0e220",
  measurementId: "G-55GKK7490Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbr = getDatabase(app);
export const storage = getStorage(app)