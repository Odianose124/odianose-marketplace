import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

function FinishSetup({ previousStep }) {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "users", currentUser.uid), {
        profileCompleted: true,
        onboardingCompleted: true,
        onboardingStep: 7,
      });

      alert("🎉 Welcome to ODIANOSE!");

      navigate("/");

    } catch (error) {
      console.error(error);

      alert("Unable to finish setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">

        <div className="text-7xl mb-6">
          🎉
        </div>

        <h1 className="text-4xl font-bold text-green-700">
          You're All Set!
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Your ODIANOSE account is now ready.
          <br />
          You can start buying, selling,
          offering services and responding to nearby requests.
        </p>

        <div className="mt-10 space-y-3">

          <button
            onClick={handleFinish}
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 transition"
          >
            {loading
              ? "Finishing..."
              : "Go to ODIANOSE"}
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

export default FinishSetup;