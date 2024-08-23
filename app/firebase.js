// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// google auth
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "process.env.APIKEY",
    authDomain: "process.env.AUTHDOMAIN",
    projectId: "pantrytracker01",
    storageBucket: "pantrytracker01.appspot.com",
    messagingSenderId: "87648405047",
    appId: "1:87648405047:web:bbd4c96d7542419bc361b2",
    measurementId: "G-DSZ5Y2E3NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
// google auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { firestore, auth, provider, signInWithPopup, signOut, signInWithRedirect };