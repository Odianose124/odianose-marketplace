function ProviderCard({
  name,
  profession,
  location,
  rating,
  price,
  status,
  image,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Provider Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        {/* Name & Verified */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{name}</h2>

          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>

        {/* Profession */}
        <p className="text-gray-700 mt-3">
          🔧 {profession}
        </p>

        {/* Location */}
        <p className="text-gray-600 mt-2">
          📍 {location}
        </p>

        {/* Rating */}
        <p className="text-yellow-500 mt-2 font-semibold">
          ⭐ {rating} / 5
        </p>

        {/* Price */}
        <p className="mt-2 text-green-700 font-bold">
          Starting from {price}
        </p>

        {/* Availability */}
        <p className="mt-2">
          <span
            className={`font-semibold ${
              status === "Available"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            ● {status}
          </span>
        </p>

        {/* Button */}
        <button className="w-full mt-6 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition">
          Hire Now
        </button>

      </div>
    </div>
  );
}

export default ProviderCard;