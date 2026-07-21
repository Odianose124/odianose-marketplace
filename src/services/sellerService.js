import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";



/*
=========================================
GET SELLER PROFILE
=========================================
*/

export async function getSellerProfile(uid) {

  const sellerRef = doc(
    db,
    "sellers",
    uid
  );


  const sellerSnap = await getDoc(
    sellerRef
  );


  if (!sellerSnap.exists()) {

    return null;

  }


  return sellerSnap.data();

}





/*
=========================================
CREATE SELLER PROFILE
(Manual/Admin/Future Use)
=========================================
*/

export async function createSellerProfile(userProfile) {


  const sellerRef = doc(
    db,
    "sellers",
    userProfile.uid
  );


  await setDoc(
    sellerRef,
    {

      uid: userProfile.uid,

      fullName: userProfile.fullName,

      email: userProfile.email,

      phone: userProfile.phone,

      photoURL:
        userProfile.photoURL || "",


      businessName: "",

      businessDescription: "",

      category: "",


      verified: false,


      rating: 0,

      reviewCount: 0,


      totalSales: 0,

      totalProducts: 0,

      totalOrders: 0,

      completedJobs: 0,


      responseRate: 100,


      wallet: {

        balance: 0,

        pending: 0,

        withdrawable: 0,

        totalEarned: 0,

      },


      createdAt:
        serverTimestamp(),

    }
  );


  return true;

}





/*
=========================================
CREATE SELLER ACCOUNT
(Become Seller Onboarding)
=========================================
*/

export async function createSellerAccount({

  uid,

  email,

  businessType,

  businessName,

  description,

  category,

  state,

  lga,

  address,

}) {



  /*
  ==============================
  Create Seller Collection
  ==============================
  */


  const sellerRef = doc(
    db,
    "sellers",
    uid
  );


  await setDoc(
    sellerRef,
    {


      uid,


      email,


      businessType,


      businessName,


      description,


      category,



      location: {

        state,

        lga,

        address,

        latitude: null,

        longitude: null,

      },



      verification: {

        verified: false,

        status: "pending",

      },



      rating: 0,


      reviewCount: 0,

      responseRate: 100,



      statistics: {


        totalSales: 0,

        totalOrders: 0,

        totalProducts: 0,

        completedJobs: 0,


      },



      wallet: {


        balance: 0,

        pending: 0,

        withdrawable: 0,

        totalEarned: 0,


      },



      active: true,



      createdAt:
        serverTimestamp(),


    }

  );






  /*
  ==============================
  Update User Account
  ==============================
  */


  const userRef = doc(
    db,
    "users",
    uid
  );



  await updateDoc(
    userRef,
    {



      roles: {


        buyer: true,


        seller: true,


        serviceProvider:
          businessType === "services" ||
          businessType === "both",


        deliveryPartner: false,


        admin: false,


      },




      capabilities: {


        canBuy: true,


        canSell: true,


        canOfferServices:
          businessType === "services" ||
          businessType === "both",


        canFulfillRequests: true,


        canDeliver: false,


      },





      sellerProfile: {


        active: true,


        businessName,


        category,


        rating: 0,


        reviewCount: 0,


        completedSales: 0,


        completedJobs: 0,


      },





      profileCompleted: true,


      onboardingStep: 5,



      updatedAt:
        serverTimestamp(),


    }

  );



  return true;

}