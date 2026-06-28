// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLS_Cvc7qbtDwzqXOKjeq5R9PVAe6uY4I",
  authDomain: "production-tracking-syst-66ea9.firebaseapp.com",
  projectId: "production-tracking-syst-66ea9",
  storageBucket: "production-tracking-syst-66ea9.firebasestorage.app",
  messagingSenderId: "5961609120",
  appId: "1:5961609120:web:e326904620e52bde9ffec5"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);

// تشغيل قاعدة البيانات
const db = getFirestore(app);

// تصدير قاعدة البيانات
export { db };
