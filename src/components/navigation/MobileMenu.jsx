import { NavLink, Link } from "react-router-dom";
import {
  X,
  User,
  ShoppingCart,
  Store,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function MobileMenu({ closeMenu }) {

  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();

  

  const navClass = ({ isActive }) =>
    `block py-3 text-lg ${
      isActive
        ? "text-green-700 font-semibold"
        : "text-gray-700"
    }`;

  return (

    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

      <div className="bg-white w-80 h-full shadow-xl p-6 overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold text-green-700">
            Menu
          </h2>

          <button onClick={closeMenu}>
            <X size={28} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="space-y-2">

          <NavLink
            to="/"
            className={navClass}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={navClass}
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/marketplace"
            className={navClass}
            onClick={closeMenu}
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/become-seller"
            className={navClass}
            onClick={closeMenu}
          >
            Become Seller
          </NavLink>

          <NavLink
            to="/about"
            className={navClass}
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navClass}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

        </nav>

        <hr className="my-6" />

        {/* Cart */}

        <Link
          to="/cart"
          onClick={closeMenu}
          className="flex items-center justify-between py-3"
        >

          <div className="flex items-center gap-3">

            <ShoppingCart size={22} />

            Cart

          </div>

          {cartCount > 0 && (

            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">

              {cartCount}

            </span>

          )}

        </Link>

        <hr className="my-6" />

        {currentUser ? (

          <div className="space-y-3">

            <Link
              to="/account"
              onClick={closeMenu}
              className="flex items-center gap-3"
            >

              <User size={20} />

              Account

            </Link>

            <Link
              to="/my-products"
              onClick={closeMenu}
              className="flex items-center gap-3"
            >

              <Store size={20} />

              My Products

            </Link>

            <button
              onClick={() => {

                logout();

                closeMenu();

              }}
              className="flex items-center gap-3 text-red-600"
            >

              <LogOut size={20} />

              Logout

            </button>

          </div>

        ) : (

          <div className="space-y-4">

            <Link
              to="/login"
              onClick={closeMenu}
              className="block text-green-700 font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="block bg-green-700 text-white text-center py-3 rounded-xl"
            >
              Register
            </Link>

          </div>

        )}

      </div>

    </div>

  );

}

export default MobileMenu;