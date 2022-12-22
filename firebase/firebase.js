import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB7HW9GSxE0V6vYp_0dwTtc1hKw1AHT4HM",
  authDomain: "medium-clone-a09af.firebaseapp.com",
  projectId: "medium-clone-a09af",
  storageBucket: "medium-clone-a09af.appspot.com",
  messagingSenderId: "581777473072",
  appId: "1:581777473072:web:90b13de643cecf2db9b7f5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export function signInWithGoogle(password) {
  return signInWithPopup(auth, password);
}
export function singout() {
  return signOut(auth);
}
