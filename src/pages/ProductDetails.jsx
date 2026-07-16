import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useCart } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);



  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        const productRef = doc(
          db,
          "products",
          id
        );

        const productSnap =
          await getDoc(productRef);

        if (productSnap.exists()) {

          const data = {

            id: productSnap.id,

            ...productSnap.data(),

          };

          setProduct(data);

          const snapshot =
            await getDocs(
              collection(db, "products")
            );

          const related =
            snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter(
                (item) =>
                  item.category === data.category &&
                  item.id !== data.id
              )
              .slice(0, 4);

          setRelatedProducts(related);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);



  const increaseQuantity = () => {

    if (
      quantity <
      (product?.quantityAvailable || 1)
    ) {

      setQuantity(quantity + 1);

    }

  };



  const decreaseQuantity = () => {

    if (quantity > 1) {

      setQuantity(quantity - 1);

    }

  };



  const handleAddToCart = () => {

    addToCart({

      id: product.id,

      name: product.productName,

      price: product.price,

      seller: product.sellerName,

      sellerId: product.sellerId,

      image: product.image,

      location: product.location,

      verified: product.verified,

      measurement: product.measurement,

      quantity,

    });

    alert("Product added to cart!");

  };



  const handleBuyNow = () => {

    addToCart({

      id: product.id,

      name: product.productName,

      price: product.price,

      seller: product.sellerName,

      sellerId: product.sellerId,

      image: product.image,

      location: product.location,

      verified: product.verified,

      measurement: product.measurement,

      quantity,

    });

    navigate("/checkout");

  };



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Loading Product...

        </h1>

      </div>

    );

  }



  if (!product) {

    return (

      <div className="min-h-screen flex flex-col justify-center items-center">

        <h1 className="text-4xl font-bold">

          Product Not Found

        </h1>

        <Link
          to="/marketplace"
          className="mt-6 text-green-700 font-semibold hover:underline"
        >

          ← Back to Marketplace

        </Link>

      </div>

    );

  }
    return (

    <main className="max-w-7xl mx-auto px-6 py-10">

      <Link
        to="/marketplace"
        className="text-green-700 font-semibold hover:underline"
      >

        ← Back to Marketplace

      </Link>



      <div className="grid lg:grid-cols-2 gap-12 mt-8">

        {/* Product Image */}

        <div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <img
              src={
                product.image ||
                "https://placehold.co/700x700?text=No+Image"
              }
              alt={product.productName}
              className="w-full h-[600px] object-cover"
            />

          </div>

        </div>



        {/* Product Details */}

        <div>

          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

            {product.category}

          </span>



          <h1 className="text-5xl font-bold mt-5">

            {product.productName}

          </h1>



          {product.subCategory && (

            <p className="text-lg text-gray-500 mt-2">

              {product.subCategory}

            </p>

          )}



          <div className="flex items-center gap-3 mt-5">

            <span className="text-yellow-500 text-xl">

              ⭐ {product.rating || 5}

            </span>

            <span className="text-gray-500">

              ({product.reviews || 0} Reviews)

            </span>

          </div>



          <div className="mt-8">

            <div className="flex items-center gap-4">

              <span className="text-5xl font-bold text-green-700">

                ₦{product.price?.toLocaleString()}

              </span>



              {product.oldPrice > product.price && (

                <span className="text-2xl text-gray-400 line-through">

                  ₦{product.oldPrice?.toLocaleString()}

                </span>

              )}

            </div>



            <p className="mt-3 text-gray-600">

              Price per <strong>{product.measurement}</strong>

            </p>

          </div>



          {/* Product Specifications */}

          <div className="bg-gray-50 rounded-2xl p-6 mt-8 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">

                Category

              </span>

              <strong>

                {product.category}

              </strong>

            </div>



            <div className="flex justify-between">

              <span className="text-gray-600">

                Product Type

              </span>

              <strong>

                {product.subCategory}

              </strong>

            </div>



            <div className="flex justify-between">

              <span className="text-gray-600">

                Measurement

              </span>

              <strong>

                {product.measurement}

              </strong>

            </div>



            <div className="flex justify-between">

              <span className="text-gray-600">

                Available

              </span>

              <strong>

                {product.quantityAvailable} {product.measurement}

              </strong>

            </div>



            <div className="flex justify-between">

              <span className="text-gray-600">

                Seller

              </span>

              <strong>

                {product.sellerName}

              </strong>

            </div>



            <div className="flex justify-between">

              <span className="text-gray-600">

                Location

              </span>

              <strong>

                {product.location || "Nigeria"}

              </strong>

            </div>

          </div>
                    {/* Seller Status */}

          <div className="mt-6 space-y-3">

            {product.verified && (

              <div className="flex items-center gap-2 text-green-700 font-semibold">

                <span>✔</span>

                Verified Seller

              </div>

            )}

            {product.onlineStatus && (

              <div className="flex items-center gap-2 text-green-600">

                <span className="w-3 h-3 rounded-full bg-green-600"></span>

                Online Now

              </div>

            )}

          </div>



          {/* Quantity */}

          <div className="mt-10">

            <h3 className="font-semibold text-lg mb-4">

              Select Quantity

            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={decreaseQuantity}
                className="w-12 h-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-2xl"
              >

                -

              </button>

              <span className="text-2xl font-bold">

                {quantity}

              </span>

              <button
                onClick={increaseQuantity}
                className="w-12 h-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-2xl"
              >

                +

              </button>

            </div>

          </div>



          {/* Buttons */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <button

              onClick={handleAddToCart}

              className="bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold transition"

            >

              Add to Cart

            </button>



            <button

              onClick={handleBuyNow}

              className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white py-4 rounded-xl font-semibold transition"

            >

              Buy Now

            </button>

          </div>



          {/* Description */}

          <div className="mt-12">

            <h2 className="text-3xl font-bold">

              Product Description

            </h2>

            <p className="mt-5 text-gray-700 leading-8">

              {product.description ||

                "No description has been added by the seller yet."}

            </p>

          </div>



          {/* Delivery Information */}

          <div className="bg-green-50 rounded-2xl p-6 mt-10">

            <h2 className="text-2xl font-bold text-green-700">

              Delivery Information

            </h2>

            <ul className="mt-5 space-y-3 text-gray-700">

              <li>

                ✅ Nationwide delivery available

              </li>

              <li>

                ✅ Fast and secure shipping

              </li>

              <li>

                ✅ Buyer protection available

              </li>

              <li>

                ✅ Secure checkout on ODIANOSE

              </li>

            </ul>

          </div>

        </div>

      </div>
            {/* Seller Information */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-16">

        <h2 className="text-3xl font-bold mb-6">

          Seller Information

        </h2>

        <div className="flex items-center justify-between flex-wrap gap-6">

          <div>

            <h3 className="text-2xl font-bold">

              {product.sellerName}

            </h3>

            <p className="text-gray-600 mt-2">

              📍 {product.location || "Nigeria"}

            </p>

            {product.verified && (

              <p className="text-green-700 font-semibold mt-3">

                ✔ Verified Seller

              </p>

            )}

            {product.onlineStatus && (

              <div className="flex items-center gap-2 mt-3 text-green-600">

                <span className="w-3 h-3 rounded-full bg-green-600"></span>

                Online Now

              </div>

            )}

          </div>

          <button

            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition"

          >

            Contact Seller

          </button>

        </div>

      </div>



      {/* Related Products */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-8">

          Related Products

        </h2>

        {

          relatedProducts.length === 0

          ?

          (

            <div className="bg-gray-100 rounded-2xl py-16 text-center">

              <h3 className="text-xl font-semibold">

                No Related Products Found

              </h3>

            </div>

          )

          :

          (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {

                relatedProducts.map((item)=>(

                  <Link

                    key={item.id}

                    to={`/marketplace/product/${item.id}`}

                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"

                  >

                    <img

                      src={

                        item.image ||

                        "https://placehold.co/500x500?text=No+Image"

                      }

                      alt={item.productName}

                      className="w-full h-52 object-cover"

                    />

                    <div className="p-5">

                      <h3 className="font-bold text-lg">

                        {item.productName}

                      </h3>

                      <p className="text-green-700 text-xl font-bold mt-3">

                        ₦{item.price?.toLocaleString()}

                      </p>

                      <p className="text-gray-500 mt-2">

                        {item.measurement}

                      </p>

                    </div>

                  </Link>

                ))

              }

            </div>

          )

        }

      </section>

    </main>

  );

}

export default ProductDetails;