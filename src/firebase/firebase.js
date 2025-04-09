// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyChDNHnaldeSlih9aYa7UhXlleNxGNKAXQ",
  authDomain: "siscodb-23511.firebaseapp.com",
  projectId: "siscodb-23511",
  storageBucket: "siscodb-23511.firebasestorage.app",
  messagingSenderId: "69122893978",
  appId: "1:69122893978:web:ceb64c6453eef00a329723",
  measurementId: "G-1PZLR0T0RH"
};

// 🔧 Firebase 초기화
const app = initializeApp(firebaseConfig);

// ✅ Firestore 인스턴스 export
const db = getFirestore(app);

export { db };
