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
import { createOrder } from "./orderService";
import { createChat } from "./chatService";



// =====================================
// SUBMIT SELLER OFFER
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

      updatedAt: serverTimestamp(),

    }

  );

  return responseRef.id;

}



// =====================================
// GET OFFERS FOR REQUEST
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

}) {


  // GET REQUEST

  const requestRef = doc(
    db,
    "requests",
    requestId
  );


  const requestSnap =
    await getDoc(requestRef);



  if (!requestSnap.exists()) {

    throw new Error(
      "Request not found."
    );

  }


  const request =
    requestSnap.data();





  // PREVENT DUPLICATE ACCEPT

  if(request.status === "accepted"){

    throw new Error(
      "This request has already been accepted."
    );

  }






  // GET RESPONSE

  const responseRef = doc(
    db,
    "responses",
    responseId
  );


  const responseSnap =
    await getDoc(responseRef);



  if(!responseSnap.exists()){

    throw new Error(
      "Offer not found."
    );

  }


  const response =
    responseSnap.data();







  // UPDATE REQUEST


  await updateDoc(

    requestRef,

    {

      status:"accepted",

      selectedSeller:{


        sellerId:
        response.sellerId,


        sellerName:
        response.sellerName,


      },


      updatedAt:
      serverTimestamp(),

    }

  );







  // UPDATE ACCEPTED OFFER


  await updateDoc(

    responseRef,

    {

      status:"accepted",

      updatedAt:
      serverTimestamp(),

    }

  );








  // REJECT OTHER OFFERS


  const offersQuery = query(

    collection(db,"responses"),

    where(
      "requestId",
      "==",
      requestId
    )

  );



  const offersSnapshot =
  await getDocs(offersQuery);




  await Promise.all(

    offersSnapshot.docs.map(

      async(offerDoc)=>{


        if(offerDoc.id !== responseId){


          await updateDoc(

            doc(
              db,
              "responses",
              offerDoc.id
            ),

            {

              status:"rejected",

              updatedAt:
              serverTimestamp(),

            }

          );


        }


      }

    )

  );








  // CREATE ORDER


  const orderId =
  await createOrder({

    buyerId:
    request.buyerId,


    buyerName:
    request.buyerName,


    sellerId:
    response.sellerId,


    sellerName:
    response.sellerName,


    requestId,


    responseId,


    title:
    request.title,


    category:
    request.category,


    amount:
    response.offerPrice,


  });









  // CREATE CHAT AFTER ORDER

const chat =
await createChat({

  orderId,

  requestId,

  buyerId:
  request.buyerId,

  buyerName:
  request.buyerName,

  sellerId:
  response.sellerId,

  sellerName:
  response.sellerName,

});


// SAVE CHAT ID TO ORDER

await updateDoc(

  doc(db, "orders", orderId),

  {

    chatId: chat.id,

    updatedAt: serverTimestamp(),

  }

);








  // SAVE CHAT ID TO RESPONSE

  await updateDoc(

    responseRef,

    {

      chatId:
      chat.id,

      updatedAt:
      serverTimestamp(),

    }

  );








  return chat.id;


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

  const responseSnap = await getDoc(
    responseRef
  );

  if (!responseSnap.exists()) {

    throw new Error(
      "Offer not found."
    );

  }

  const response = responseSnap.data();

  // Prevent rejecting an already accepted offer
  if (response.status === "accepted") {

    throw new Error(
      "Accepted offers cannot be rejected."
    );

  }

  await updateDoc(
    responseRef,
    {

      status: "rejected",

      updatedAt: serverTimestamp(),

    }
  );

  return true;

}