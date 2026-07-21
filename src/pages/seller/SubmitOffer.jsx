import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { submitSellerOffer } from "../../services/responseService";


function SubmitOffer() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser, userProfile } = useAuth();


  const [offerPrice, setOfferPrice] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(e){

    e.preventDefault();


    if(!currentUser){

      alert(
        "Please login first"
      );

      return;

    }



    try{


      setLoading(true);



      await submitSellerOffer({

        requestId:id,


        sellerId:
          currentUser.uid,


        sellerName:
          userProfile?.displayName ||
          currentUser.displayName ||
          "Seller",


        sellerEmail:
          currentUser.email,


        offerPrice,


        message,


      });




      alert(
        "Offer submitted successfully!"
      );



      navigate(
        "/seller-dashboard"
      );



    }catch(error){


      console.error(
        "Submit Offer Error:",
        error
      );


      alert(
        "Unable to submit offer"
      );


    }finally{


      setLoading(false);


    }


  }





return (

<main className="min-h-screen bg-gray-100 py-10 px-6">


<div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">


<h1 className="text-3xl font-bold text-green-700">

Submit Offer

</h1>


<p className="text-gray-500 mt-2 mb-8">

Send your quotation to the buyer.

</p>





<form
onSubmit={handleSubmit}
className="space-y-5"
>




<input

type="number"

placeholder="Offer Price (₦)"

value={offerPrice}

onChange={(e)=>
setOfferPrice(e.target.value)
}

required

className="w-full border rounded-xl p-4"

/>





<textarea

rows="5"

placeholder="Tell the buyer why they should choose you..."

value={message}

onChange={(e)=>
setMessage(e.target.value)
}

required

className="w-full border rounded-xl p-4"

/>






<button

disabled={loading}

className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 transition"

>


{
loading
?
"Submitting..."
:
"Submit Offer"
}


</button>




</form>



</div>


</main>


);


}


export default SubmitOffer;