import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

import { getNearbyRequests } from "../../services/sellerRequestService";

function NearbyRequestsPreview() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await getNearbyRequests();

      setRequests(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Buyer Requests
          </h2>

          <p className="text-gray-500 mt-1">
            Latest requests from buyers
          </p>

        </div>

        <Link
          to="/seller/nearby-requests"
          className="text-green-700 font-semibold flex items-center gap-2"
        >
          View All
          <ArrowRight size={18} />
        </Link>

      </div>

      {loading ? (

        <div className="text-center py-10 text-gray-500">
          Loading nearby requests...
        </div>

      ) : requests.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No buyer requests available yet.
        </div>

      ) : (

        <div className="space-y-5">

          {requests.slice(0, 5).map((request) => (

            <div
              key={request.id}
              className="border rounded-2xl p-5 hover:border-green-600 hover:shadow-md transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

                <div>

                  <h3 className="text-xl font-semibold">
                    {request.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {request.category}
                  </p>

                  <div className="flex gap-5 mt-4 text-sm text-gray-500">

                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {request.radius} km Radius
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      Open Request
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <h2 className="text-2xl font-bold text-green-700">
                    ₦{request.budget?.toLocaleString()}
                  </h2>

                  <Link
                    to={`/request/${request.id}`}
                    className="inline-block mt-4 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl transition"
                  >
                    View Request
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default NearbyRequestsPreview;