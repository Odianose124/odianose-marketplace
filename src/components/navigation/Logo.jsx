import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex flex-col leading-none"
    >
      <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
        ODIANOSE
      </h1>

      <span className="text-xs text-gray-500 font-medium">
        The Nigeria Marketplace
      </span>
    </Link>
  );
}

export default Logo;