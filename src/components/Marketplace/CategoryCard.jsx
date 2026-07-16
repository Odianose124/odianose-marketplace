function CategoryCard({ icon, name }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-6 flex flex-col items-center justify-center text-center">

      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        {name}
      </h3>

    </div>
  );
}

export default CategoryCard;