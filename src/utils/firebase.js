// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAH73jhQWA5xPBW2LDA1fDst18chAScok",
  authDomain: "netflixgpt-d8753.firebaseapp.com",
  projectId: "netflixgpt-d8753",
  storageBucket: "netflixgpt-d8753.appspot.com",
  messagingSenderId: "1001491117280",
  appId: "1:1001491117280:web:395a696fb28bee44bb8c85",
  measurementId: "G-6TJJMD618R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
