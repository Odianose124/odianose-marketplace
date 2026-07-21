import {
  User,
  ShoppingBag,
  Heart,
  Package,
  Settings,
  LogOut,
  Mail,
  Store,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Account() {
  const navigate = useNavigate();

  const {
    currentUser,
    userProfile,
    logout,
  } = useAuth();

  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen py-10">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-8">
            My Account
          </h1>

          {/* Profile */}

          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-green-700 text-white flex items-center justify-center">

              <User size={45} />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {userProfile?.fullName ||
                  currentUser?.displayName ||
                  "User"}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-gray-600">

                <Mail size={18} />

                <span>
                  {currentUser?.email}
                </span>

              </div>

              <p className="mt-3 text-green-700 font-semibold">
                ✔ Logged In
              </p>

            </div>

          </div>

          {/* Dashboard */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Orders */}

            <div
              onClick={() => navigate("/my-orders")}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >

              <ShoppingBag
                className="text-green-700 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                My Orders
              </h3>

              <p className="text-gray-500 mt-2">
                View your purchases.
              </p>

            </div>

            {/* Wishlist */}

            <div
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >

              <Heart
                className="text-red-500 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                Wishlist
              </h3>

              <p className="text-gray-500 mt-2">
                Saved products.
              </p>

            </div>

            {/* Requests */}

            <div
              onClick={() => navigate("/my-requests")}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >

              <ClipboardList
                className="text-blue-600 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                My Requests
              </h3>

              <p className="text-gray-500 mt-2">
                Track service requests.
              </p>

            </div>

            {/* Settings */}

            <div
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >

              <Settings
                className="text-gray-700 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                Settings
              </h3>

              <p className="text-gray-500 mt-2">
                Manage your account.
              </p>

            </div>

          </div>

          {/* Seller Section */}

          <div className="mt-12">

            {!userProfile?.roles?.seller ? (

              <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    Become a Seller
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Start selling products and offering services on ODIANOSE.
                  </p>

                </div>

                <button
                  onClick={() => navigate("/become-seller")}
                  className="bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 transition flex items-center gap-3"
                >

                  <Store size={22} />

                  Become Seller

                </button>

              </div>

            ) : (

              <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    Seller Dashboard
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Manage your products, services and earnings.
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate("/seller-dashboard")
                  }
                  className="bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 transition flex items-center gap-3"
                >

                  <LayoutDashboard size={22} />

                  Open Dashboard

                </button>

              </div>

            )}

          </div>

          {/* Logout */}

          <div className="mt-10">

            <button
              onClick={logout}
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl transition"
            >

              <LogOut size={22} />

              Logout

            </button>

          </div>

        </div>

      </main>
    </>
  );
}

export default Account;