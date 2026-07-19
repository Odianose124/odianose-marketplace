import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

const interestsList = [
  "Real Estate",
  "Phones & Electronics",
  "Computers",
  "Vehicles",
  "Fashion",
  "Beauty",
  "Food & Groceries",
  "Home & Furniture",
  "Home Services",
  "Education",
  "Sports & Fitness",
  "Baby & Kids",
  "Pets",
  "Gaming",
];

function Interests({ nextStep, previousStep }) {
  const { currentUser } = useAuth();

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "users", currentUser.uid), {
        interests: selectedInterests,
        onboardingStep: 6,
      });

      nextStep();

    } catch (error) {
      console.error(error);
      alert("Unable to save interests.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-green-700">
          Select Your Interests
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Choose the categories you're most interested in.
          This helps us personalize your experience.
        </p>

        <div className="grid grid-cols-2 gap-4">

          {interestsList.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`border rounded-xl p-4 text-left transition ${
                selectedInterests.includes(interest)
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white hover:border-green-700"
              }`}
            >
              {interest}
            </button>
          ))}

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

export default Interests;