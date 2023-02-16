import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnDb94Suaf1kwO_YC9RnAt17tWAnpwyg0",
  authDomain: "phonebook-93005.firebaseapp.com",
  projectId: "phonebook-93005",
  storageBucket: "phonebook-93005.appspot.com",
  messagingSenderId: "531817853691",
  appId: "1:531817853691:web:2fa6fe1265507a7c55365e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
