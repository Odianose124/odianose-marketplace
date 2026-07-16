import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  Store,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function ProfileDropdown({ open }) {

  const { logout } = useAuth();

  if (!open) return null;

  return (

    <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

      <Link
        to="/account"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <User size={20} />
        My Profile
      </Link>

      <Link
        to="/orders"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <Package size={20} />
        My Orders
      </Link>

      <Link
        to="/wishlist"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <Heart size={20} />
        Wishlist
      </Link>

      <Link
        to="/my-products"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <Store size={20} />
        My Products
      </Link>

      <Link
        to="/messages"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <MessageCircle size={20} />
        Messages
      </Link>

      <Link
        to="/settings"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
      >
        <Settings size={20} />
        Settings
      </Link>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>

  );

}

export default ProfileDropdown;