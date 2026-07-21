import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";



// =================================
// GET NEARBY MATCHING REQUESTS
// =================================

export async function getNearbyRequests(
  category = null,
  type = null
) {

  try {


    const filters = [

      where(
        "status",
        "==",
        "open"
      )

    ];



    // Filter category if provided

    if(category){

      filters.push(
        where(
          "category",
          "==",
          category
        )
      );

    }




    // Filter request type
    // product or service

    if(type){

      filters.push(
        where(
          "type",
          "==",
          type
        )
      );

    }




    const q = query(

      collection(
        db,
        "requests"
      ),

      ...filters,

      orderBy(
        "createdAt",
        "desc"
      )

    );





    const snapshot =
      await getDocs(q);





    return snapshot.docs.map(
      (doc)=>({

        id: doc.id,

        ...doc.data(),

      })
    );



  } catch(error){


    console.error(
      "Get Nearby Requests Error:",
      error
    );


    throw error;


  }


}






// =================================
// GET SINGLE REQUEST
// =================================

export async function getRequestById(
  requestId
){

  try {


    const q = query(

      collection(
        db,
        "requests"
      ),

      where(
        "__name__",
        "==",
        requestId
      )

    );



    const snapshot =
      await getDocs(q);




    if(snapshot.empty){

      return null;

    }



    const doc =
      snapshot.docs[0];



    return {

      id:doc.id,

      ...doc.data(),

    };



  } catch(error){


    console.error(
      "Get Request Error:",
      error
    );


    throw error;


  }

}






// =================================
// GET OPEN PRODUCT REQUESTS
// =================================

export async function getProductRequests(){

  return getNearbyRequests(
    null,
    "product"
  );

}






// =================================
// GET OPEN SERVICE REQUESTS
// =================================

export async function getServiceRequests(){

  return getNearbyRequests(
    null,
    "service"
  );

}