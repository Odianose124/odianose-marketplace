import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

import { getNearbyRequests } from "../../services/sellerRequestService";


function NearbyRequests() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadRequests(){

      try {

        const data = await getNearbyRequests();

        setRequests(data);


      } catch(error){

        console.error(
          "Nearby Requests Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadRequests();


  }, []);





  if(loading){

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold text-green-700">

          Loading Requests...

        </h2>

      </div>

    );

  }





  return (

    <main className="min-h-screen bg-gray-100 py-10 px-6">


      <div className="max-w-6xl mx-auto">


        <div className="bg-white rounded-3xl shadow-lg p-8">


          <h1 className="text-3xl font-bold text-green-700">

            Nearby Buyer Requests

          </h1>


          <p className="text-gray-500 mt-2">

            Requests from buyers looking for products or services.

          </p>





          <div className="mt-8 space-y-5">


            {
              requests.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                  No available requests yet.

                </div>


              ) : (


                requests.map((request)=>(


                  <div

                    key={request.id}

                    className="border rounded-2xl p-6 hover:shadow-md transition"

                  >


                    <div className="flex flex-col md:flex-row justify-between gap-5">


                      <div>


                        <h2 className="text-2xl font-bold">

                          {request.title}

                        </h2>


                        <p className="text-gray-500 mt-2">

                          {request.category}

                        </p>



                        <div className="flex gap-5 mt-4 text-gray-500 text-sm">


                          <span className="flex items-center gap-2">

                            <MapPin size={16}/>

                            {request.radius} km

                          </span>



                          <span className="flex items-center gap-2">

                            <Clock size={16}/>

                            Open

                          </span>


                        </div>


                      </div>





                      <div className="text-right">


                        <h3 className="text-2xl font-bold text-green-700">

                          ₦{request.budget?.toLocaleString()}

                        </h3>



                        <Link

                          to={`/request/${request.id}`}

                          className="inline-block mt-4 bg-green-700 text-white px-5 py-3 rounded-xl"

                        >

                          View Request

                        </Link>


                      </div>



                    </div>


                  </div>


                ))


              )

            }


          </div>


        </div>


      </div>


    </main>

  );

}



export default NearbyRequests;