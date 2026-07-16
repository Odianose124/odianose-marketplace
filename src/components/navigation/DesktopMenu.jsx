import { NavLink } from "react-router-dom";

function DesktopMenu() {
  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-green-700"
        : "text-gray-700 hover:text-green-700"
    }`;

  return (
    <div className="hidden lg:flex items-center gap-8">

      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>

      <NavLink to="/services" className={navLinkClass}>
        Services
      </NavLink>

      <NavLink to="/marketplace" className={navLinkClass}>
        Marketplace
      </NavLink>

      <NavLink to="/become-seller" className={navLinkClass}>
        Become Seller
      </NavLink>

      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>

      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>

    </div>
  );
}

export default DesktopMenu;