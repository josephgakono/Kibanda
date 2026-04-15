// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAH6iRo-N2MWpH9cPaDPdOxTBTnRv2Me4",
  authDomain: "kibanda-b7136.firebaseapp.com",
  projectId: "kibanda-b7136",
  storageBucket: "kibanda-b7136.firebasestorage.app",
  messagingSenderId: "692613480817",
  appId: "1:692613480817:web:d2bfc29617c914702936d0",
  measurementId: "G-F34B151YDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth};