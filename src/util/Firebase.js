import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCPpNs0m6R8CBpSNig6yHXx-z5MjICi70E",
    authDomain: "dndhelper5e.firebaseapp.com",
    projectId: "dndhelper5e",
    storageBucket: "dndhelper5e.firebasestorage.app",
    messagingSenderId: "443983293394",
    appId: "1:443983293394:web:d9641a406e16c53a09b60b",
    measurementId: "G-HFR4YTPC0D"
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
