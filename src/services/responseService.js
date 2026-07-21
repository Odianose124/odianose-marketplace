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

      createdAt:
        serverTimestamp(),

    }

  );


  return responseRef.id;

}







// =====================================
// Get Offers For Request
// =====================================

export async function getRequestOffers(
  requestId
) {


  const q = query(

    collection(db, "responses"),

    where(
      "requestId",
      "==",
      requestId
    ),

    orderBy(
      "createdAt",
      "desc"
    )

  );



  const snapshot =
    await getDocs(q);



  return snapshot.docs.map(
    (doc) => ({

      id: doc.id,

      ...doc.data(),

    })
  );

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



  // Update accepted response

  const responseRef = doc(

    db,

    "responses",

    responseId

  );


  await updateDoc(

    responseRef,

    {

      status:"accepted",

      updatedAt:
        serverTimestamp(),

    }

  );





  // Update request

  const requestRef = doc(

    db,

    "requests",

    requestId

  );



  await updateDoc(

    requestRef,

    {

      status:"accepted",


      selectedSeller:{

        sellerId,

        sellerName,

      },


      updatedAt:
        serverTimestamp(),

    }

  );





  // Reject other offers

  const offersQuery = query(

    collection(db,"responses"),

    where(

      "requestId",

      "==",

      requestId

    )

  );



  const offersSnapshot =
    await getDocs(
      offersQuery
    );




  const updates =
    offersSnapshot.docs.map(
      async(item)=>{


        if(item.id !== responseId){


          await updateDoc(

            doc(
              db,
              "responses",
              item.id
            ),

            {

              status:"rejected",

              updatedAt:
                serverTimestamp(),

            }

          );


        }


      }

    );



  await Promise.all(updates);



  return true;

}








// =====================================
// REJECT SELLER OFFER
// =====================================

export async function rejectOffer(
  responseId
){


  const responseRef = doc(

    db,

    "responses",

    responseId

  );



  await updateDoc(

    responseRef,

    {


      status:"rejected",


      updatedAt:
        serverTimestamp(),


    }

  );



  return true;

}