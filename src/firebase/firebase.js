import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAjc_wUYPVOsmAG9ZOAAcdhg-2liqh7PYE",
  authDomain: "odianose-cb612.firebaseapp.com",
  projectId: "odianose-cb612",
  storageBucket: "odianose-cb612.firebasestorage.app",
  messagingSenderId: "649010952768",
  appId: "1:649010952768:web:c4c1aaabbc7ef5f8743da5",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);


export default app;