import { useState } from "react";
import { Link } from "react-router-dom";
import MarketplaceHero from "../components/Marketplace/MarketplaceHero";
import MarketplaceSearch from "../components/Marketplace/MarketplaceSearch";
import CategoryGrid from "../components/Marketplace/CategoryGrid";
import ProductGrid from "../components/Marketplace/ProductGrid";

function Marketplace() {

  const [searchTerm, setSearchTerm] = useState("");

  return (

    <main className="max-w-7xl mx-auto px-6 py-10">

      <MarketplaceHero />

      <MarketplaceSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryGrid />

      <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-10 my-10 text-white shadow-xl">

  <h2 className="text-4xl font-bold">
    Looking for Something Specific?
  </h2>

  <p className="mt-4 text-green-100 max-w-2xl">
    Can't find what you need? Create a request and receive offers from verified
    sellers and service providers near you. Compare prices, negotiate, and choose
    the best offer—all in one place.
  </p>

  <div className="flex flex-wrap gap-4 mt-8">

    <Link
      to="/create-request"
      className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
    >
      📢 Create Request
    </Link>

    <button
      className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-700 transition"
    >
      🛍 Browse Products
    </button>

  </div>

</div>

      <ProductGrid
        searchTerm={searchTerm}
      />

    </main>

  );

}

export default Marketplace;