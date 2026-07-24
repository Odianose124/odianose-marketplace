import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useRequests } from "../../context/RequestContext";
import { useResponses } from "../../context/ResponseContext";

import RequestStatusBadge from "../../components/requests/RequestStatusBadge";
import EmptyOffers from "../../components/requests/EmptyOffers";
import OfferCard from "../../components/requests/OfferCard";
import { useAuth } from "../../context/AuthContext";


function RequestDetails() {

  const { id } = useParams();

  const { currentUser, userProfile } = useAuth();


  const {
    selectedRequest,
    loadingRequest,
    loadRequest,
  } = useRequests();



  const {
    offers,
    loadingOffers,
    loadOffers,
  } = useResponses();





  useEffect(() => {


    if (id) {

      loadRequest(id);

      loadOffers(id);

    }


  }, [id]);







  if (loadingRequest) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-semibold text-green-700">
          Loading Request...
        </h2>

      </div>

    );

  }







  if (!selectedRequest) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-semibold text-red-600">
          Request Not Found
        </h2>

      </div>

    );

  }



const isSeller = userProfile?.roles?.seller;

const isRequestOwner =
  currentUser?.uid === selectedRequest?.buyerId;




  return (

    <main className="min-h-screen bg-gray-100 py-10">


      <div className="max-w-5xl mx-auto px-6">





        {/* REQUEST INFORMATION */}


        <div className="bg-white rounded-3xl shadow-lg p-8">


          <div className="flex justify-between items-start">


            <div>

              <h1 className="text-4xl font-bold text-green-700">

                {selectedRequest.title}

              </h1>


              <p className="text-gray-500 mt-2">

                Category: {selectedRequest.category}

              </p>


            </div>



            <RequestStatusBadge
              status={selectedRequest.status}
            />


          </div>







          <div className="grid md:grid-cols-3 gap-6 mt-10">


            <div>

              <p className="text-gray-500">
                Budget
              </p>


              <h2 className="text-3xl font-bold text-green-700">

                ₦{selectedRequest.budget?.toLocaleString()}

              </h2>

            </div>




            <div>

              <p className="text-gray-500">
                Radius
              </p>


              <h2 className="text-xl font-semibold mt-2">

                {selectedRequest.radius} km

              </h2>


            </div>





            <div>

              <p className="text-gray-500">
                Request Type
              </p>


              <h2 className="text-xl font-semibold mt-2">

                {selectedRequest.type}

              </h2>


            </div>



          </div>







          <div className="mt-10">


            <p className="text-gray-500 mb-3">
              Description
            </p>


            <p className="text-gray-700 leading-8">

              {selectedRequest.description}

            </p>


          </div>








          {/* SELLER ACTION */}

{isSeller && !isRequestOwner && (
  <div className="mt-10 border-t pt-8">

    <Link
      to={`/seller/offer/${selectedRequest.id}`}
      className="inline-flex bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"
    >
      Submit Offer
    </Link>

  </div>
)}



        </div>








        {/* OFFERS SECTION */}



        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">


          <div className="flex justify-between items-center">


            <h2 className="text-3xl font-bold text-green-700">

              Seller Offers

            </h2>



            <span className="text-gray-500">

              {offers.length} Offers

            </span>


          </div>








          <div className="mt-8">


            {loadingOffers ? (


              <div className="text-center py-12">

                <h2 className="text-xl font-semibold text-green-700">

                  Loading Offers...

                </h2>


              </div>




            ) : offers.length === 0 ? (



              <EmptyOffers />




            ) : (



              <div className="space-y-6">


                {offers.map((offer)=>(

                  <OfferCard

                    key={offer.id}

                    offer={offer}

                  />

                ))}


              </div>


            )}



          </div>



        </div>






      </div>


    </main>

  );

}


export default RequestDetails;