import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

// ==========================
// Register New User
// ==========================
export async function registerUser({
  fullName,
  email,
  phone,
  password,
}) {
  // Create Firebase Auth account
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  // Update display name
  await updateProfile(user, {
    displayName: fullName,
  });

  // Create Firestore profile
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,

    fullName,

    displayName: fullName,

    email,

    phone,

    photoURL: "",

    coverPhoto: "",

    bio: "",

    roles: {
      buyer: true,
      seller: false,
      serviceProvider: false,
      admin: false,
    },

    wallet: {
      balance: 0,
      pending: 0,
      withdrawable: 0,
    },

    verified: false,

    online: false,

    lastSeen: serverTimestamp(),

    rating: 0,

    reviewCount: 0,

    completedOrders: 0,

    reputationScore: 100,

    state: "",

    lga: "",

    address: "",

    latitude: null,

    longitude: null,

    createdAt: serverTimestamp(),
  });

  return user;
}

// ==========================
// Login
// ==========================
export async function loginUser(
  email,
  password
) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

// ==========================
// Logout
// ==========================
export async function logoutUser() {
  await signOut(auth);
}

// ==========================
// Get User Profile
// ==========================
export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return docSnap.data();
}