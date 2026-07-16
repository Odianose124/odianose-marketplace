import { useState } from "react";

import MarketplaceHero from "../Components/Marketplace/MarketplaceHero";
import MarketplaceSearch from "../Components/Marketplace/MarketplaceSearch";
import CategoryGrid from "../Components/Marketplace/CategoryGrid";
import ProductGrid from "../Components/Marketplace/ProductGrid";

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