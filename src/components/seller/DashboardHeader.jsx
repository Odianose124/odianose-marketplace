import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
  const { currentUser } = useAuth();

  const firstName =
    currentUser?.displayName?.split(" ")[0] || "Seller";

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6 flex flex-col md:flex-row justify-between items-center gap-5">

      <div>
        <p className="text-gray-500 text-sm">
          Welcome Back 👋
        </p>

        <h1 className="text-3xl font-bold text-green-700">
          {firstName}
        </h1>

        <p className="text-gray-500 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-green-100 transition">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        <button className="p-3 rounded-xl bg-gray-100 hover:bg-green-100 transition">
          <Search size={22} />
        </button>

        <img
          src={
            currentUser?.photoURL ||
            "https://ui-avatars.com/api/?name=Seller"
          }
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border-2 border-green-600"
        />

      </div>

    </div>
  );
}

export default DashboardHeader;