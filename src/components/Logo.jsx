import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="block">

      <h1 className="text-5xl font-black text-green-700 leading-none">
        ODIANOSE
      </h1>

      <p className="text-sm text-gray-700 font-medium mt-1">
        Nigeria's Marketplace for Products & Services
      </p>

      <p className="text-sm text-green-600 mt-1">
        Connect • Hire • Buy • Sell
      </p>

    </Link>
  );
}

export default Logo;