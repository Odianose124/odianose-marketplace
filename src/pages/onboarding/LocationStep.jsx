import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import StateSelect from "../../components/location/StateSelect";
import LgaSelect from "../../components/location/LgaSelect";
import DetectLocationButton from "../../components/location/DetectLocationButton";

function LocationStep({ nextStep, previousStep }) {
  const { currentUser } = useAuth();

  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [address, setAddress] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleLocationDetected = (location) => {
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "users", currentUser.uid), {
        state,
        lga,
        address,
        latitude,
        longitude,
        onboardingStep: 4,
      });

      nextStep();

    } catch (error) {
      console.error(error);
      alert("Unable to save location.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-green-700">
          Your Location
        </h1>

        <p className="text-gray-500 mb-6">
          This helps buyers and sellers around you find each other faster.
        </p>

        <div className="space-y-5">

          <DetectLocationButton
            onLocationDetected={handleLocationDetected}
          />

          <StateSelect
            value={state}
            onChange={(value) => {
              setState(value);
              setLga("");
            }}
          />

          <LgaSelect
            state={state}
            value={lga}
            onChange={setLga}
          />

          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          />

          {latitude && longitude && (
            <div className="bg-green-50 p-4 rounded-xl">

              <p className="font-semibold text-green-700">
                📍 Location Detected
              </p>

              <p className="text-sm">
                Latitude: {latitude}
              </p>

              <p className="text-sm">
                Longitude: {longitude}
              </p>

            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-green-700 text-white rounded-xl py-4"
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

export default LocationStep;