import {
  FaStar,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";

import { useState } from "react";

import {
  acceptOffer,
  rejectOffer,
} from "../../services/responseService";


function OfferCard({ offer }) {

  const [loading, setLoading] = useState(false);

  const [rejectLoading, setRejectLoading] = useState(false);



  async function handleAccept() {

    try {

      setLoading(true);


      await acceptOffer({

        responseId: offer.id,

        requestId: offer.requestId,

        sellerId: offer.sellerId,

        sellerName: offer.sellerName,

      });



      alert(
        "Offer accepted successfully!"
      );


      window.location.reload();


    } catch(error) {


      console.error(
        "Accept Offer Error:",
        error
      );


      alert(
        "Unable to accept offer."
      );


    } finally {


      setLoading(false);


    }

  }





  async function handleReject() {


    try {


      setRejectLoading(true);


      await rejectOffer(
        offer.id
      );



      alert(
        "Offer rejected."
      );


      window.location.reload();



    } catch(error){


      console.error(
        "Reject Offer Error:",
        error
      );


      alert(
        "Unable to reject offer."
      );


    } finally {


      setRejectLoading(false);


    }

  }





  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">


      {/* Seller Information */}

      <div className="flex justify-between items-start">


        <div className="flex gap-4">


          <img

            src={
              offer.sellerPhoto ||
              `https://ui-avatars.com/api/?name=${offer.sellerName || "Seller"}`
            }

            alt={
              offer.sellerName || "Seller"
            }

            className="w-16 h-16 rounded-full object-cover border"

          />



          <div>


            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">


              {offer.sellerName || "Seller"}


              <FaCheckCircle className="text-green-600 text-lg"/>


            </h2>



            <div className="flex items-center gap-2 mt-2">


              <FaStar className="text-yellow-500"/>


              <span className="font-semibold">

                {offer.rating || "5.0"}

              </span>



              <span className="text-gray-500">

                ({offer.reviewCount || 0} Reviews)

              </span>



            </div>


          </div>


        </div>





        {/* Offer Price */}

        <div className="text-right">


          <h2 className="text-3xl font-bold text-green-700">

            ₦
            {
              Number(
                offer.offerPrice ||
                offer.amount ||
                offer.price ||
                0
              ).toLocaleString()
            }


          </h2>



          <p className="text-gray-500 mt-2">


            {
              offer.estimatedTime ||
              offer.deliveryTime ||
              "Delivery time not provided"
            }


          </p>


        </div>



      </div>







      {/* Message */}

      <div className="mt-6">


        <p className="text-sm text-gray-500 mb-2">

          Seller Message

        </p>



        <p className="text-gray-700 leading-7">

          {
            offer.message ||
            "No message provided."
          }

        </p>


      </div>








      {/* Actions */}

      <div className="grid md:grid-cols-3 gap-4 mt-8">



        <button

          onClick={handleAccept}

          disabled={loading}

          className="bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50"

        >

          {
            loading
            ? "Accepting..."
            : "Accept Offer"
          }


        </button>





        <button

          onClick={handleReject}

          disabled={rejectLoading}

          className="border border-red-500 text-red-600 py-3 rounded-xl hover:bg-red-50 transition disabled:opacity-50"

        >

          {
            rejectLoading
            ? "Rejecting..."
            : "Reject Offer"
          }


        </button>






        <button

          className="flex items-center justify-center gap-2 border border-green-700 text-green-700 py-3 rounded-xl hover:bg-green-50 transition"

        >

          <FaComments/>

          Chat Seller


        </button>



      </div>



    </div>

  );

}


export default OfferCard;