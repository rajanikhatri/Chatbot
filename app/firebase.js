// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// google auth
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWHZgJCNjebBL_WrZJ7ptAtN5XqytrSiM",
    authDomain: "chat-bot-88f14.firebaseapp.com",
    projectId: "chat-bot-88f14",
    storageBucket: "chat-bot-88f14.appspot.com",
    messagingSenderId: "152667588748",
    appId: "1:152667588748:web:6a4afae1c474b15f5b13a9",
    measurementId: "G-1JYQ5JYRHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
// google auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { firestore, auth, provider, signInWithPopup, signOut, signInWithRedirect };