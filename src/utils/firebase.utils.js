import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoEbZGlse_HSUsOFTIHS-aAWEGOFZNwXU",
  authDomain: "betabox-e008c.firebaseapp.com",
  projectId: "betabox-e008c",
  storageBucket: "betabox-e008c.appspot.com",
  messagingSenderId: "818536938850",
  appId: "1:818536938850:web:e48ba285c3e89ff371803b",
  measurementId: "G-M3CQ30WFY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// --- AUTHENTICATION FUNCTIONS ---
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch(console.log);
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch(console.log);
};

const signOutAuthUser = async () => signOut(auth);

// --- DATABASE FUNCTIONS ---
const createUserDocumentFromAuth = async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    await setDoc(userDocRef, {
      email,
      createdAt,
    }).catch((error) => {
      console.log("error creating new user", error);
    });
  }

  return userSnapshot;
};

// --- EXPOSED FUNCTIONS ---
const registerUserWithEmailAndPassword = async (email, password) => {
  const user = await createAuthUserWithEmailAndPassword(email, password);
  // await createUserDocumentFromAuth(user);
  return user;
};

export {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  registerUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutAuthUser,
};
