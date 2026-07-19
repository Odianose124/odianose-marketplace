import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ==========================
// Submit Seller Offer
// ==========================

export async function submitOffer(data) {
  const docRef = await addDoc(
    collection(db, "offers"),
    {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
}

// ==========================
// Get Offers For Request
// ==========================

export async function getOffers(requestId) {
  const q = query(
    collection(db, "offers"),
    where("requestId", "==", requestId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}