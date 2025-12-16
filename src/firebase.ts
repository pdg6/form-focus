// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU80A4Kt8kiFbRta9kjh60l7rY-7lesK0",
  authDomain: "testtest-1eb5f.firebaseapp.com",
  projectId: "testtest-1eb5f",
  storageBucket: "testtest-1eb5f.firebasestorage.app",
  messagingSenderId: "230874683298",
  appId: "1:230874683298:web:2ab832c736dce4c4c484fb",
  measurementId: "G-1ZNQGH19WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);
