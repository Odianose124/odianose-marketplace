import { useState } from "react";

import Welcome from "./Welcome";
import UploadPhoto from "./UploadPhoto";
import PersonalInfo from "./PersonalInfo";
import LocationStep from "./LocationStep";
import MarketplaceCapabilities from "./MarketplaceCapabilities";
import Interests from "./Interests";
import FinishSetup from "./FinishSetup";

function CompleteProfile() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Welcome nextStep={nextStep} />;

      case 2:
        return (
          <UploadPhoto
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 3:
        return (
          <PersonalInfo
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 4:
  return (
    <LocationStep
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );

      case 5:
        return (
          <MarketplaceCapabilities
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 6:
        return (
          <Interests
            nextStep={nextStep}
            previousStep={previousStep}
          />
        );

      case 7:
        return (
          <FinishSetup
            previousStep={previousStep}
          />
        );

      default:
        return <Welcome nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
}

export default CompleteProfile;