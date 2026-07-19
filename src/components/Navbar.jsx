import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  ShoppingCart,
  LayoutDashboard,
  ClipboardList,
  Heart,
  Briefcase,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold"
      : "text-gray-700 hover:text-green-700";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* Logo */}

      <Link
        to="/"
        className="text-2xl font-bold text-green-700"
      >
        ODIANOSE
      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-6">

        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>

        <NavLink to="/marketplace" className={linkClass}>
          Marketplace
        </NavLink>

        {currentUser && (
          <>
            <NavLink
              to="/my-requests"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-green-700 font-semibold"
                  : "flex items-center gap-1 text-gray-700 hover:text-green-700"
              }
            >
              <ClipboardList size={18} />
              Requests
            </NavLink>

            <NavLink
              to="/seller-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-green-700 font-semibold"
                  : "flex items-center gap-1 text-gray-700 hover:text-green-700"
              }
            >
              <LayoutDashboard size={18} />
              Seller
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-green-700 font-semibold"
                  : "flex items-center gap-1 text-gray-700 hover:text-green-700"
              }
            >
              <Heart size={18} />
              Wishlist
            </NavLink>
          </>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1 text-green-700 font-semibold"
              : "flex items-center gap-1 text-gray-700 hover:text-green-700"
          }
        >
          <ShoppingCart size={20} />
          Cart
        </NavLink>

        {currentUser ? (
          <>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-green-700 font-semibold"
                  : "flex items-center gap-2 text-gray-700 hover:text-green-700"
              }
            >
              <User size={20} />
              Account
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="text-green-700 font-semibold"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
            >
              Register
            </NavLink>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;