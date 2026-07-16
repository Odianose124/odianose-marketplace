function SearchBar() {
  return (
    <div className="flex justify-center mt-8">
      <input
        type="text"
        placeholder="Search for a service..."
        className="w-96 p-4 border rounded-l-lg outline-none"
      />

      <button className="bg-green-700 text-white px-8 rounded-r-lg hover:bg-green-800">
        Search
      </button>
    </div>
  );
}

export default SearchBar;