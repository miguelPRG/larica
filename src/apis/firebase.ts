// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3L2aU485ibAgSWgmQRrhmwRTfYubvRDc",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "larica-b3364",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "58329ed9b7dc294cc5fd74cf91d450055ffec4c5",
  appId: "SEU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação
export const auth = getAuth(app);
