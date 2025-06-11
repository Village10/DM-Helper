import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDznXtLv8nRBOSIR6f7zapBtLcznEwYFQQ",
    authDomain: "dmhelper5e.firebaseapp.com",
    projectId: "dmhelper5e",
    storageBucket: "dmhelper5e.firebasestorage.app",
    messagingSenderId: "470156282399",
    appId: "1:470156282399:web:c1b55022686bf8e955232a",
    measurementId: "G-1CS83X3L84"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export let user = null;

onAuthStateChanged(auth, (userAuth) => {
    user = userAuth;
    console.log("User state changed:", user);
});
