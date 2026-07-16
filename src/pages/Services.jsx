function Services() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold text-center text-green-700">
        Our Services
      </h1>

      <p className="text-center text-gray-600 mt-4 text-lg">
        Find trusted professionals across Nigeria.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          ⚡
          <h3 className="font-bold mt-4">Electrician</h3>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🚗
          <h3 className="font-bold mt-4">Mechanic</h3>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🚰
          <h3 className="font-bold mt-4">Plumber</h3>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🧹
          <h3 className="font-bold mt-4">Cleaner</h3>
        </div>

      </div>
    </div>
  );
}

export default Services;