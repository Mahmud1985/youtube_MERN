import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqi5_vWxqIzvb4QPUcKId4F_fwdEx1giY",
    authDomain: "clone-fa95b.firebaseapp.com",
    projectId: "clone-fa95b",
    storageBucket: "clone-fa95b.appspot.com",
    messagingSenderId: "42394870049",
    appId: "1:42394870049:web:37b1f7a380715e4f801e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;