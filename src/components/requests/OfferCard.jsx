import {
  FaStar,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";

function OfferCard({ offer }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <img
            src={
              offer.sellerPhoto ||
              "https://ui-avatars.com/api/?name=Seller"
            }
            alt={offer.sellerName}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">

              {offer.sellerName}

              <FaCheckCircle className="text-green-600 text-lg" />

            </h2>

            <div className="flex items-center gap-2 mt-2">

              <FaStar className="text-yellow-500" />

              <span className="font-semibold">
                {offer.rating || "5.0"}
              </span>

              <span className="text-gray-500">
                ({offer.reviewCount || 0} Reviews)
              </span>

            </div>

          </div>

        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold text-green-700">
            ₦
            {(offer.amount || offer.price)?.toLocaleString()}
          </h2>

          <p className="text-gray-500 mt-2">
            {offer.estimatedTime || offer.deliveryTime}
          </p>

        </div>

      </div>

      <div className="mt-6">

        <p className="text-sm text-gray-500 mb-2">
          Seller Message
        </p>

        <p className="text-gray-600 leading-7">
          {offer.message}
        </p>

      </div>

      <div className="flex gap-4 mt-8">

        <button className="flex-1 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition">
          Accept Offer
        </button>

        <button className="flex items-center justify-center gap-2 flex-1 border border-green-700 text-green-700 py-3 rounded-xl hover:bg-green-50 transition">

          <FaComments />

          Chat Seller

        </button>

      </div>

    </div>
  );
}

export default OfferCard;