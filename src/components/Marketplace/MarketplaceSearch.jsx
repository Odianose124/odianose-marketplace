import { Search } from "lucide-react";

function MarketplaceSearch({ searchTerm, setSearchTerm }) {
  return (
    <section className="mb-10">

      <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">

        <Search
          className="text-gray-500"
          size={22}
        />

        <input
          type="text"
          placeholder="Search products, sellers, categories or location..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="flex-1 outline-none text-lg"
        />

      </div>

    </section>
  );
}

export default MarketplaceSearch;