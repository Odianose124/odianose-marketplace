import { Link } from "react-router-dom";

function EmptyRequests() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

      <div className="text-6xl mb-6">
        📭
      </div>

      <h2 className="text-3xl font-bold text-gray-800">
        No Smart Requests Yet
      </h2>

      <p className="text-gray-500 mt-4 max-w-md mx-auto">
        Create your first Smart Request and let nearby verified sellers
        compete to give you the best offer.
      </p>

      <Link
        to="/create-request"
        className="inline-block mt-8 bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 transition"
      >
        🎯 Create Smart Request
      </Link>

    </div>
  );
}

export default EmptyRequests;