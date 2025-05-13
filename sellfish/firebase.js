// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // initializeAuth YOK!

const firebaseConfig = {
  apiKey: "AIzaSyDMyZhpw3rpLuW9oc1lprtE0CN2_FUijXM",
  authDomain: "sellfish-86ba1.firebaseapp.com",
  projectId: "sellfish-86ba1",
  storageBucket: "sellfish-86ba1.appspot.com",
  messagingSenderId: "97969764456",
  appId: "1:97969764456:web:0b0d8a524e4b76e84a63dd",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app); // initializeAuth DEĞİL

export { auth };
