// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3L2aU485ibAgSWgmQRrhmwRTfYubvRDc",
  authDomain: "larica-b3364.firebaseapp.com",
  projectId: "larica-b3364",
  storageBucket: "larica-b3364.appspot.com",
  messagingSenderId: "58329ed9b7dc294cc5fd74cf91d450055ffec4c5",
  appId: "213922994451",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação
export const auth = getAuth(app);
