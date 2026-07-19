import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

function MarketplaceCapabilities({
  nextStep,
  previousStep,
}) {
  const { currentUser } = useAuth();

  const [capabilities, setCapabilities] = useState({
    buyer: true,
    seller: false,
    serviceProvider: false,
    responder: false,
    deliveryRider: false,
  });

  const [loading, setLoading] = useState(false);

  const toggleCapability = (key) => {
    setCapabilities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "users", currentUser.uid), {
        capabilities,
        onboardingStep: 5,
      });

      nextStep();

    } catch (error) {
      console.error(error);
      alert("Unable to save capabilities.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-green-700">
          Marketplace Capabilities
        </h1>

        <p className="text-gray-500 mb-6">
          Choose everything you want to do on ODIANOSE.
          You can change these later.
        </p>

        <div className="space-y-4">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={capabilities.buyer}
              onChange={() => toggleCapability("buyer")}
            />
            Buy Products
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={capabilities.seller}
              onChange={() => toggleCapability("seller")}
            />
            Sell Products
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={capabilities.serviceProvider}
              onChange={() =>
                toggleCapability("serviceProvider")
              }
            />
            Offer Services
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={capabilities.responder}
              onChange={() =>
                toggleCapability("responder")
              }
            />
            Respond to Buyer Requests
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={capabilities.deliveryRider}
              onChange={() =>
                toggleCapability("deliveryRider")
              }
            />
            Become a Delivery Rider
          </label>

        </div>

        <div className="mt-8 space-y-3">

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl"
          >
            {loading ? "Saving..." : "Continue"}
          </button>

          <button
            onClick={previousStep}
            className="w-full text-gray-500"
          >
            ← Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default MarketplaceCapabilities;