import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDk3ZbOXuw3PEfJzdt8AI2ueJq5yksfekE",
  authDomain: "dhan-siomai-pos-fe1e5.firebaseapp.com",
  projectId: "dhan-siomai-pos-fe1e5",
  storageBucket: "dhan-siomai-pos-fe1e5.firebasestorage.app",
  messagingSenderId: "305932123173",
  appId: "1:305932123173:web:f27894a2d5e6e6ab8253cc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
