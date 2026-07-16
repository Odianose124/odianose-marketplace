function ServiceCard({ icon, name }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">

      <div className="text-5xl text-center">
        {icon}
      </div>

      <h3 className="text-center mt-4 font-bold text-lg">
        {name}
      </h3>

    </div>
  );
}

export default ServiceCard;
