import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// =====================================
// Submit Seller Offer
// =====================================

export async function submitSellerOffer({

  requestId,

  sellerId,

  sellerName,

  sellerEmail,

  offerPrice,

  message,

}) {

  const responseRef = await addDoc(

    collection(db, "responses"),

    {

      requestId,

      sellerId,

      sellerName,

      sellerEmail,

      offerPrice: Number(offerPrice),

      message,

      status: "pending",

      createdAt: serverTimestamp(),

    }

  );

  return responseRef.id;

}



// =====================================
// Get Offers For Request
// =====================================

export async function getRequestOffers(requestId) {

  const q = query(

    collection(db, "responses"),

    where("requestId", "==", requestId),

    orderBy("createdAt", "desc")

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data(),

  }));

}



// =====================================
// ACCEPT SELLER OFFER
// =====================================

export async function acceptOffer({

  responseId,

  requestId,

  sellerId,

  sellerName,

}) {

  // ------------------------------------
  // Get Request Details
  // ------------------------------------

  const requestRef = doc(db, "requests", requestId);

  const requestSnap = await getDoc(requestRef);

  if (!requestSnap.exists()) {

    throw new Error("Request not found.");

  }

  const request = requestSnap.data();



  // ------------------------------------
  // Accept Selected Response
  // ------------------------------------

  const responseRef = doc(

    db,

    "responses",

    responseId

  );

  await updateDoc(responseRef, {

    status: "accepted",

    updatedAt: serverTimestamp(),

  });



  // ------------------------------------
  // Update Request
  // ------------------------------------

  await updateDoc(requestRef, {

    status: "accepted",

    selectedSeller: {

      sellerId,

      sellerName,

    },

    updatedAt: serverTimestamp(),

  });



  // ------------------------------------
  // Reject Every Other Offer
  // ------------------------------------

  const offersQuery = query(

    collection(db, "responses"),

    where("requestId", "==", requestId)

  );

  const offersSnapshot = await getDocs(offersQuery);

  const updates = offersSnapshot.docs.map(async (item) => {

    if (item.id !== responseId) {

      await updateDoc(

        doc(db, "responses", item.id),

        {

          status: "rejected",

          updatedAt: serverTimestamp(),

        }

      );

    }

  });

  await Promise.all(updates);



  // ------------------------------------
  // Create Order
  // ------------------------------------

  await addDoc(

    collection(db, "orders"),

    {

      buyerId: request.buyerId,

      buyerName: request.buyerName,

      sellerId,

      sellerName,

      requestId,

      responseId,

      title: request.title,

      description: request.description,

      category: request.category,

      type: request.type,

      amount: request.budget,

      radius: request.radius,

      orderStatus: "active",

      paymentStatus: "pending",

      deliveryStatus: "waiting",

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),

    }

  );



  return true;

}



// =====================================
// REJECT SELLER OFFER
// =====================================

export async function rejectOffer(responseId) {

  const responseRef = doc(

    db,

    "responses",

    responseId

  );

  await updateDoc(

    responseRef,

    {

      status: "rejected",

      updatedAt: serverTimestamp(),

    }

  );

  return true;

}