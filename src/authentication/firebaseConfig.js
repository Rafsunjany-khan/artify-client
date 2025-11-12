import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMsB5ps1ikIGXt6ZFGsd0xB0WHrFyLVgA",
  authDomain: "artify-1b296.firebaseapp.com",
  projectId: "artify-1b296",
  storageBucket: "artify-1b296.firebasestorage.app",
  messagingSenderId: "1035674294253",
  appId: "1:1035674294253:web:8996c092c11e280a5ff9e4",
  measurementId: "G-VYR8S8LSN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
