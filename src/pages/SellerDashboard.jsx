import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function SellerDashboard() {
  const { currentUser } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const sellerProducts = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (product) =>
              product.sellerId === currentUser.uid
          );

        setProducts(sellerProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="bg-green-700 text-white rounded-3xl p-8 shadow-lg">

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-green-100 text-lg">
              {currentUser?.displayName}
            </p>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-gray-500">
                Products
              </h2>

              <p className="text-4xl font-bold text-green-700 mt-2">
                {products.length}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-gray-500">
                Orders
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                0
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-gray-500">
                Revenue
              </h2>

              <p className="text-3xl font-bold text-orange-500 mt-2">
                ₦0
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-gray-500">
                Rating
              </h2>

              <p className="text-4xl font-bold text-yellow-500 mt-2">
                ⭐ 5.0
              </p>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-md mt-10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

              <Link
                to="/add-product"
                className="bg-green-700 text-white rounded-2xl p-6 hover:bg-green-800 transition"
              >
                <h3 className="text-xl font-bold">
                  ➕ Add Product
                </h3>
              </Link>

              <Link
                to="/my-products"
                className="bg-blue-600 text-white rounded-2xl p-6 hover:bg-blue-700 transition"
              >
                <h3 className="text-xl font-bold">
                  📦 My Products
                </h3>
              </Link>

              <Link
                to="/seller-orders"
                className="bg-orange-500 text-white rounded-2xl p-6 hover:bg-orange-600 transition"
              >
                <h3 className="text-xl font-bold">
                  🛒 Orders
                </h3>
              </Link>

              <Link
                to="/account"
                className="bg-purple-600 text-white rounded-2xl p-6 hover:bg-purple-700 transition"
              >
                <h3 className="text-xl font-bold">
                  👤 Account
                </h3>
              </Link>

            </div>

          </div>

          {/* Recent Products */}

          <div className="bg-white rounded-3xl shadow-md mt-10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Recent Products
            </h2>

            {loading ? (

              <p>Loading...</p>

            ) : products.length === 0 ? (

              <div className="text-center py-10">

                <p className="text-gray-500">
                  You haven't uploaded any product yet.
                </p>

                <Link
                  to="/add-product"
                  className="inline-block mt-5 bg-green-700 text-white px-6 py-3 rounded-xl"
                >
                  Upload First Product
                </Link>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {products.slice(0, 6).map((product) => (

                  <div
                    key={product.id}
                    className="border rounded-2xl overflow-hidden"
                  >

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/400x300"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-5">

                      <h3 className="font-bold text-xl">
                        {product.name}
                      </h3>

                      <p className="text-green-700 font-bold mt-2">
                        ₦
                        {product.price?.toLocaleString()}
                      </p>

                      <p className="text-gray-500 mt-2">
                        {product.category}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </>
  );
}

export default SellerDashboard;