// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCS9U05v5U3VtWak-55Eg7wVgb-kCuEoG0",
  authDomain: "form-focus-88a98.firebaseapp.com",
  projectId: "form-focus-88a98",
  storageBucket: "form-focus-88a98.firebasestorage.app",
  messagingSenderId: "1078215862874",
  appId: "1:1078215862874:web:002436743c542fc20b4663",
  measurementId: "G-352HHM8K2H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };