import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

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

const getCurrentUserId = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth.uid);
    });
  });
};

// --- DATABASE FUNCTIONS ---
const createUserCollectionAndDocuments = async (user) => {
  if (!user) return;

  try {
    const { email } = user;
    const createdAt = new Date();

    const userDocRef = await setDoc(doc(db, "users", user.uid), {
      email,
      createdAt,
    });
    console.log("user created", userDocRef);
  } catch (error) {
    console.log(error);
  }
};

const getUserSnapshot = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    console.log("Document data:", userSnapshot.data());
  } else {
    console.log("No such document!");
  }
};

const getUserSessions = async (userId) => {
  const sessionsSnapshot = await getDocs(
    collection(db, "users", userId, "sessions")
  );
  return sessionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const createUserSession = async (userId, session) => {
  await addDoc(collection(db, "users", userId, "sessions"), session)
    .then((docRef) => console.log("session added", docRef))
    .catch((error) => console.log("add session failed", error));
};

// --- EXPOSED FUNCTIONS ---
const registerUserWithEmailAndPassword = async (email, password) => {
  const user = await createAuthUserWithEmailAndPassword(email, password);
  await createUserCollectionAndDocuments(user);
  return user;
};

const getUserDocumentFromAuth = async () => {
  const userId = await getCurrentUserId();
  return getUserSnapshot(userId);
};

const getUserSessionsFromAuth = async () => {
  const userId = await getCurrentUserId();
  const sessionsArray = await getUserSessions(userId);
  return sessionsArray;
};

const addUserSessionFromAuth = async (session) => {
  const userId = await getCurrentUserId();
  await createUserSession(userId, session);
};

export {
  addUserSessionFromAuth,
  getUserDocumentFromAuth,
  getUserSessionsFromAuth,
  registerUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutAuthUser,
};
