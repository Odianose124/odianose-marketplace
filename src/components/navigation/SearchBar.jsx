import { Search } from "lucide-react";

function SearchBar() {

  return (

    <div className="bg-white border-t">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <form className="flex">

          <div className="flex flex-1 items-center bg-gray-100 rounded-l-xl px-4">

            <Search
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search products, services, artisans, sellers..."
              className="flex-1 bg-transparent px-3 py-4 outline-none"
            />

          </div>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-8 rounded-r-xl font-semibold transition"
          >

            Search

          </button>

        </form>

      </div>

    </div>

  );

}

export default SearchBar;