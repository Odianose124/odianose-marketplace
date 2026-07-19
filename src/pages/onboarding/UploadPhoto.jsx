import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../services/cloudinary";


import AppCard from "../../components/ui/AppCard";
import AppButton from "../../components/ui/AppButton";
import StepHeader from "../../components/onboarding/StepHeader";

function UploadPhoto({ nextStep, previousStep }) {
  const [preview, setPreview] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const [loading, setLoading] = useState(false);

const { currentUser } = useAuth();

  const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedFile(file);

  setPreview(URL.createObjectURL(file));
};

const handleContinue = async () => {
  if (!selectedFile) {
    nextStep();
    return;
  }

  try {
    setLoading(true);

    const imageUrl = await uploadImage(selectedFile);

    await updateDoc(
      doc(db, "users", currentUser.uid),
      {
        photoURL: imageUrl,
      }
    );

    nextStep();

  } catch (error) {
    console.error(error);
    alert("Unable to upload photo.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

      <AppCard>

        <StepHeader
          step={2}
          totalSteps={7}
          title="Add Your Photo"
          subtitle="Help people recognize you"
        />

        <div className="flex justify-center my-10">

          <label
            htmlFor="photo"
            className="cursor-pointer"
          >

            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-green-600 shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center text-6xl border-4 border-dashed border-green-600">

                📷

              </div>
            )}

          </label>

        </div>

        <input
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />

        <p className="text-center text-gray-500 mb-8">

          Tap the circle to upload a photo

        </p>

        <div className="space-y-4">

          <AppButton
  onClick={handleContinue}
  disabled={loading}
>
  {loading ? "Uploading..." : "Continue"}
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

export default UploadPhoto;