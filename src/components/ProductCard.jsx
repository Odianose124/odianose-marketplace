import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Eye,
  Star,
  MapPin,
  CheckCircle,
  Package,
  Heart,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({
  id,
  name,
  price,
  oldPrice,
  seller,
  sellerId,
  rating,
  reviews,
  location,
  verified,
  image,
  measurement,
  quantityAvailable,
  category,
  subCategory,
  onlineStatus,
}) {

  const { addToCart } = useCart();
  const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} = useWishlist();

const inWishlist = isInWishlist(id);

const handleWishlist = () => {

  if (inWishlist) {

    removeFromWishlist(id);

  } else {

    addToWishlist({

      id,

      name,

      price,

      image,

      seller,

      location,

      category,

    });

  }

};

  const getStockStatus = () => {

    if (quantityAvailable <= 0) {

      return {
        text: "Out of Stock",
        color: "bg-red-100 text-red-700",
      };

    }

    if (quantityAvailable <= 5) {

      return {
        text: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
      };

    }

    return {
      text: "In Stock",
      color: "bg-green-100 text-green-700",
    };

  };

  const stock = getStockStatus();

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : 0;
        return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      {/* Product Image */}

      <div className="relative">

        <Link to={`/marketplace/product/${id}`}>
        <button
  onClick={handleWishlist}
  className="
    absolute
    top-4
    left-4
    bg-white
    p-2
    rounded-full
    shadow-lg
    hover:scale-110
    transition
    z-10
  "
>

  <Heart

    size={20}

    fill={inWishlist ? "currentColor" : "none"}

    className={
      inWishlist
        ? "text-red-600"
        : "text-gray-500"
    }

  />

</button>

          <img
            src={image}
            alt={name}
            className="w-full h-60 object-cover"
          />

        </Link>

        {discount > 0 && (

          <div className="absolute top-4 left-16 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">

            -{discount}%

          </div>

        )}

        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${stock.color}`}
        >

          {stock.text}

        </div>

      </div>

      <div className="p-5">

        {/* Category */}

        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">

          {category}

        </span>

        {/* Product Name */}

        <Link to={`/marketplace/product/${id}`}>
        

          <h2 className="text-xl font-bold mt-3 hover:text-green-700 transition">

            {name}

          </h2>

        </Link>

        {subCategory && (

          <p className="text-gray-500 mt-1">

            {subCategory}

          </p>

        )}

        {/* Rating */}

        <div className="flex items-center gap-2 mt-3">

          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-500"
          />

          <span className="text-sm">

            {rating} ({reviews} reviews)

          </span>

        </div>

        {/* Price */}

        <div className="mt-4">

          <div className="flex items-center gap-3">

            <span className="text-3xl font-bold text-green-700">

              ₦{price?.toLocaleString()}

            </span>

            {oldPrice > price && (

              <span className="text-gray-400 line-through">

                ₦{oldPrice?.toLocaleString()}

              </span>

            )}

          </div>

          <p className="text-sm text-gray-600 mt-2">

            Per <strong>{measurement}</strong>

          </p>

        </div>

        {/* Product Details */}

        <div className="mt-5 bg-gray-50 rounded-2xl p-4 space-y-3">

          <div className="flex justify-between">

            <span className="text-gray-500">

              Measurement

            </span>

            <span className="font-semibold">

              {measurement}

            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">

              <Package size={16} />

              <span className="text-gray-500">

                Available

              </span>

            </div>

            <span className="font-semibold">

              {quantityAvailable}

            </span>

          </div>

        </div>

        {/* Seller */}

        <div className="mt-5 border-t pt-4">

          <h3 className="font-semibold">

            {seller}

          </h3>

          <div className="flex items-center gap-2 mt-2 text-gray-500">

            <MapPin size={15} />

            {location}

          </div>

          {verified && (

            <div className="flex items-center gap-2 text-green-700 mt-2">

              <CheckCircle size={16} />

              Verified Seller

            </div>

          )}

          {onlineStatus && (

            <div className="flex items-center gap-2 text-green-600 mt-2">

              <span className="w-2 h-2 rounded-full bg-green-600"></span>

              Online Now

            </div>

          )}

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          <button
            onClick={() =>
              addToCart({
                id,
                name,
                price,
                seller,
                sellerId,
                image,
                quantityAvailable,
                measurement,
              })
            }
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
          >

            <ShoppingCart size={18} />

            Cart

          </button>

          <Link
            to={`/marketplace/product/${id}`}
          >

            <button className="w-full flex items-center justify-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white py-3 rounded-xl font-semibold transition">

              <Eye size={18} />

              View

            </button>

          </Link>

        </div>

      </div>

    </div>
  );

}

export default ProductCard;