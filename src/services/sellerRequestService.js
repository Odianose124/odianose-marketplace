import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// =========================
// Get Nearby Buyer Requests
// =========================

export async function getNearbyRequests(category = null) {
  let q;

  if (category) {
    q = query(
      collection(db, "requests"),
      where("status", "==", "open"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(
      collection(db, "requests"),
      where("status", "==", "open"),
      orderBy("createdAt", "desc")
    );
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}