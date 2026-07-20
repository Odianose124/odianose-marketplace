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


  // Update Firebase display name
  await updateProfile(user, {
    displayName: fullName,
  });


  // Create Firestore user profile
  await setDoc(
    doc(db, "users", user.uid),
    {

      uid: user.uid,


      // Basic Information
      fullName,

      displayName: fullName,

      email,

      phone,


      // Profile
      photoURL: "",

      coverPhoto: "",

      bio: "",



      // User Roles
      roles: {

        buyer: true,

        seller: false,

        serviceProvider: false,

        deliveryPartner: false,

        admin: false,

      },



      // User Abilities
      capabilities: {

        canBuy: true,

        canSell: false,

        canOfferServices: false,

        canFulfillRequests: false,

        canDeliver: false,

      },



      // Wallet System
      wallet: {

        balance: 0,

        pending: 0,

        withdrawable: 0,

        escrow: 0,

        totalEarned: 0,

        totalSpent: 0,

      },



      // Seller Information
      sellerProfile: {

        active: false,

        verified: false,

        rating: 0,

        reviewCount: 0,

        completedJobs: 0,

        completedSales: 0,

        responseRate: 0,

      },



      // Buyer Information
      buyerProfile: {

        totalOrders: 0,

        totalRequests: 0,

        completedPurchases: 0,

      },



      // Trust System
      verified: false,

      rating: 0,

      reviewCount: 0,

      reputationScore: 100,



      // Activity
      online: false,

      lastSeen: serverTimestamp(),



      // Order Statistics
      completedOrders: 0,



      // Location
      state: "",

      lga: "",

      address: "",

      latitude: null,

      longitude: null,



      // Onboarding
      profileCompleted: false,

      onboardingStep: 1,



      // Notifications
      notificationSettings: {

        push: true,

        email: true,

        sms: false,

      },



      // Account Creation
      createdAt: serverTimestamp(),

    }
  );


  return user;

}



// ==========================
// Login User
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
// Logout User
// ==========================
export async function logoutUser() {

  await signOut(auth);

}



// ==========================
// Get User Profile
// ==========================
export async function getUserProfile(uid) {

  const userRef = doc(
    db,
    "users",
    uid
  );


  const userSnap = await getDoc(userRef);



  if (!userSnap.exists()) {

    return null;

  }


  return userSnap.data();

}