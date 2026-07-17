import {
  User,
  ShoppingBag,
  Heart,
  Package,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen py-10">

        <div className="max-w-6xl mx-auto px-6">

          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-8">
            My Account
          </h1>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-green-700 text-white flex items-center justify-center">

              <User size={45} />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {currentUser?.displayName || "User"}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Mail size={18} />
                <span>{currentUser?.email}</span>
              </div>

              <p className="mt-3 text-green-700 font-semibold">
                ✔ Logged In
              </p>

            </div>

          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

              <ShoppingBag
                className="text-green-700 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                My Orders
              </h3>

              <p className="text-gray-500 mt-2">
                View all your purchases.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

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

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

              <Package
                className="text-blue-600 mb-4"
                size={34}
              />

              <h3 className="text-xl font-bold">
                My Products
              </h3>

              <p className="text-gray-500 mt-2">
                Products you're selling.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

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