import { Link } from "react-router-dom";

import { useRequests } from "../../context/RequestContext";

import RequestCard from "../../components/requests/RequestCard";
import EmptyRequests from "../../components/requests/EmptyRequests";

function MyRequests() {
  const { myRequests, loadingRequests } = useRequests();

  if (loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-green-700">
          Loading Requests...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            My Smart Requests
          </h1>

          <Link
            to="/create-request"
            className="bg-green-700 text-white px-5 py-3 rounded-xl hover:bg-green-800 transition"
          >
            + New Smart Request
          </Link>

        </div>

        {myRequests.length === 0 ? (

          <EmptyRequests />

        ) : (

          <div className="space-y-6">

            {myRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyRequests;