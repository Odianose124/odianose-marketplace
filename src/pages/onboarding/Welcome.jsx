import AppButton from "../../components/Ui/AppButton";
import AppCard from "../../components/Ui/AppCard";
import StepHeader from "../../components/onboarding/StepHeader";

function Welcome({ nextStep }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

      <AppCard>

        <StepHeader
          step={1}
          totalSteps={7}
          title="Welcome to ODIANOSE 👋"
          subtitle="Nigeria's Smart Marketplace"
        />

        <div className="flex justify-center my-10">

          <div className="w-36 h-36 rounded-full bg-green-100 flex items-center justify-center text-6xl">

            🛍️

          </div>

        </div>

        <p className="text-center text-gray-600 leading-7 mb-10">

          Buy products.

          <br />

          Sell products.

          <br />

          Hire trusted professionals.

          <br />

          Find customers near you.

          <br /><br />

          Let's personalize your account.

        </p>

        <AppButton onClick={nextStep}>

          Get Started →

        </AppButton>

      </AppCard>

    </div>
  );
}

export default Welcome;