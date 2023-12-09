import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRJmp4Dyt2C3VkBJBIEFPNaeU-Nbf8erg",
  authDomain: "simple-firebase-41d39.firebaseapp.com",
  projectId: "simple-firebase-41d39",
  storageBucket: "simple-firebase-41d39.appspot.com",
  messagingSenderId: "648795059305",
  appId: "1:648795059305:web:50b8fc1a52454b402f9ef8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
