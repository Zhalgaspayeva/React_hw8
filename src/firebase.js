// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Fiha52Czpu4X1kPy0cE-vG5GdxIVouY",
  authDomain: "react-hw-7.firebaseapp.com",
  projectId: "react-hw-7",
  storageBucket: "react-hw-7.firebasestorage.app",
  messagingSenderId: "629194503160",
  appId: "1:629194503160:web:10de49e8400a375cdd9c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);