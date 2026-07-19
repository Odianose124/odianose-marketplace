import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ==========================
// Create Offer
// ==========================
export async function createOffer(offerData) {
  const offerRef = await addDoc(
    collection(db, "offers"),
    {
      ...offerData,

      status: "pending",

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    }
  );

  return offerRef.id;
}

// ==========================
// Get Offers For One Request
// ==========================
export async function getOffers(requestId) {
  const q = query(
    collection(db, "offers"),
    where("requestId", "==", requestId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ==========================
// Accept Offer
// ==========================
export async function acceptOffer(offerId) {
  await updateDoc(
    doc(db, "offers", offerId),
    {
      status: "accepted",
      updatedAt: serverTimestamp(),
    }
  );
}

// ==========================
// Reject Offer
// ==========================
export async function rejectOffer(offerId) {
  await updateDoc(
    doc(db, "offers", offerId),
    {
      status: "rejected",
      updatedAt: serverTimestamp(),
    }
  );
}