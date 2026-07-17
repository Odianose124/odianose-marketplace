import { useState } from "react";

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

      <ProductGrid
        searchTerm={searchTerm}
      />

    </main>

  );

}

export default Marketplace;