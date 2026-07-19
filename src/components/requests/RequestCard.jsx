import { Link } from "react-router-dom";
import RequestStatusBadge from "./RequestStatusBadge";

function RequestCard({ request }) {
  return (
    <Link
      to={`/request/${request.id}`}
      className="block bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-6"
    >
      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {request.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {request.category}
          </p>

        </div>

        <RequestStatusBadge
          status={request.status}
        />

      </div>

      <div className="mt-6">

        <p className="text-gray-500">
          Budget
        </p>

        <h3 className="text-3xl font-bold text-green-700">
          ₦{request.budget?.toLocaleString()}
        </h3>

      </div>

      <p className="mt-6 text-gray-600 line-clamp-2">
        {request.description}
      </p>

    </Link>
  );
}

export default RequestCard;