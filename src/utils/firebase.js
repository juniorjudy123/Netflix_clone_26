// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpgzwRrLvhdM_9GnXx746g2khBrfAaqSA",
    authDomain: "netflix-ai-64fe7.firebaseapp.com",
    projectId: "netflix-ai-64fe7",
    storageBucket: "netflix-ai-64fe7.firebasestorage.app",
    messagingSenderId: "752070350720",
    appId: "1:752070350720:web:6b4d43d4560876cca49365",
    measurementId: "G-XYXCGEHP04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();