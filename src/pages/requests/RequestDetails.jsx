import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useRequests } from "../../context/RequestContext";

import RequestStatusBadge from "../../components/requests/RequestStatusBadge";
import EmptyOffers from "../../components/requests/EmptyOffers";
import OfferCard from "../../components/requests/OfferCard";

function RequestDetails() {
  const { id } = useParams();

  const {
    selectedRequest,
    loadingRequest,
    loadRequest,
  } = useRequests();

  useEffect(() => {
    loadRequest(id);
  }, [id]);

  // Temporary until we connect Firestore offers
  const offers = [];

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

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-green-700">
              {selectedRequest.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {selectedRequest.category}
            </p>

          </div>

          <RequestStatusBadge
            status={selectedRequest.status}
          />

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div>

            <p className="text-gray-500">
              Budget
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              ₦{selectedRequest.budget?.toLocaleString()}
            </h2>

          </div>

          <div>

            <p className="text-gray-500">
              Search Radius
            </p>

            <h2 className="text-xl font-semibold mt-2">
              {selectedRequest.radius} km
            </h2>

          </div>

        </div>

        <div className="mt-10">

          <p className="text-gray-500 mb-3">
            Description
          </p>

          <p className="leading-8 text-gray-700">
            {selectedRequest.description}
          </p>

        </div>

      </div>

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

          {offers.length === 0 ? (

            <EmptyOffers />

          ) : (

            <div className="space-y-6">

              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                />
              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}

export default RequestDetails;