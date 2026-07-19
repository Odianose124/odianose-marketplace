import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// =========================
// Create Request
// =========================
export async function createRequest(requestData) {
  const requestRef = await addDoc(
    collection(db, "requests"),
    {
      ...requestData,

      status: "open",

      responders: 0,

      selectedSeller: null,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    }
  );

  return requestRef.id;
}

// =========================
// Update Request
// =========================
export async function updateRequest(
  requestId,
  updates
) {
  await updateDoc(
    doc(db, "requests", requestId),
    {
      ...updates,
      updatedAt: serverTimestamp(),
    }
  );
}

// =========================
// Get Single Request
// =========================
export async function getRequest(requestId) {
  const snapshot = await getDoc(
    doc(db, "requests", requestId)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// =========================
// Get My Requests
// =========================
export async function getMyRequests(uid) {
  const q = query(
    collection(db, "requests"),
    where("buyerId", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// =========================
// Close Request
// =========================
export async function closeRequest(
  requestId
) {
  await updateDoc(
    doc(db, "requests", requestId),
    {
      status: "closed",
      updatedAt: serverTimestamp(),
    }
  );
}