import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import AppCard from "../../components/Ui/AppCard";
import AppButton from "../../components/Ui/AppButton";
import StepHeader from "../../components/onboarding/StepHeader";

function PersonalInfo({ nextStep, previousStep }) {
  const { currentUser } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  loadProfile();
}, []);

const loadProfile = async () => {
  try {
    const snap = await getDoc(
      doc(db, "users", currentUser.uid)
    );

    if (!snap.exists()) return;

    const data = snap.data();

    setDisplayName(data.displayName || "");

    setUsername(data.username || "");

    setBio(data.bio || "");

    setBusinessName(data.businessName || "");

  } catch (error) {
    console.error(error);
  }
};

  const handleContinue = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName,
        username,
        bio,
        businessName,
        onboardingStep: 3,
      });

      nextStep();

    } catch (error) {
      console.error(error);
      alert("Unable to save profile.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

      <AppCard>

        <StepHeader
          step={3}
          totalSteps={7}
          title="Tell Us About Yourself"
          subtitle="Let's personalize your account"
        />

        <div className="space-y-5">

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Display Name"
            value={displayName}
            onChange={(e)=>setDisplayName(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-4"
            rows={4}
            placeholder="Tell people about yourself..."
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Business Name (Optional)"
            value={businessName}
            onChange={(e)=>setBusinessName(e.target.value)}
          />

        </div>

        <div className="mt-8 space-y-4">

          <AppButton
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </AppButton>

          <button
            onClick={previousStep}
            className="w-full text-gray-500"
          >
            ← Back
          </button>

        </div>

      </AppCard>

    </div>
  );
}

export default PersonalInfo;