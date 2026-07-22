import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// ======================================
// CREATE ORDER
// ======================================

export async function createOrder({

  buyerId,

  buyerName,

  sellerId,

  sellerName,

  requestId,

  responseId,

  title,

  category,

  amount,

}) {

  const orderRef = await addDoc(

    collection(db, "orders"),

    {

      buyerId,

      buyerName,

      sellerId,

      sellerName,

      requestId,

      responseId,

      title,

      category,

      amount,

      orderStatus: "active",

      paymentStatus: "pending",

      deliveryStatus: "waiting",

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),

    }

  );

  return orderRef.id;

}



// ======================================
// BUYER ORDERS
// ======================================

export async function getBuyerOrders(buyerId) {

  const q = query(

    collection(db, "orders"),

    where("buyerId", "==", buyerId),

    orderBy("createdAt", "desc")

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data(),

  }));

}



// ======================================
// SELLER ORDERS
// ======================================

export async function getSellerOrders(sellerId) {

  const q = query(

    collection(db, "orders"),

    where("sellerId", "==", sellerId),

    orderBy("createdAt", "desc")

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data(),

  }));

}



// ======================================
// UPDATE ORDER STATUS
// ======================================

export async function updateOrderStatus(

  orderId,

  status

) {

  await updateDoc(

    doc(db, "orders", orderId),

    {

      orderStatus: status,

      updatedAt: serverTimestamp(),

    }

  );

}



// ======================================
// UPDATE DELIVERY STATUS
// ======================================

export async function updateDeliveryStatus(

  orderId,

  status

) {

  await updateDoc(

    doc(db, "orders", orderId),

    {

      deliveryStatus: status,

      updatedAt: serverTimestamp(),

    }

  );

}



// ======================================
// UPDATE PAYMENT STATUS
// ======================================

export async function updatePaymentStatus(

  orderId,

  status

) {

  await updateDoc(

    doc(db, "orders", orderId),

    {

      paymentStatus: status,

      updatedAt: serverTimestamp(),

    }

  );

}