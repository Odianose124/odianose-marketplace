function EmptyOffers() {
  return (
    <div className="text-center py-14">

      <div className="text-6xl mb-5">
        📬
      </div>

      <h2 className="text-2xl font-bold text-gray-700">
        No Offers Yet
      </h2>

      <p className="text-gray-500 mt-3 max-w-md mx-auto">
        Your Smart Request has been sent to nearby verified sellers.
        As soon as someone responds, their offer will appear here.
      </p>

    </div>
  );
}

export default EmptyOffers;