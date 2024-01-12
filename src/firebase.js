import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBgb6YhLQcstONRlvUU7jri1jXb7n4DBxc",
    authDomain: "chat-app-db73d.firebaseapp.com",
    projectId: "chat-app-db73d",
    storageBucket: "chat-app-db73d.appspot.com",
    messagingSenderId: "1078619404210",
    appId: "1:1078619404210:web:b80f6e93e67d1e1c4d96ab"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
