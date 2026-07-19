import ProgressBar from "../ui/ProgressBar";

function StepHeader({
  step,
  totalSteps,
  title,
  subtitle,
}) {
  return (
    <div className="mb-8">

      <ProgressBar
        step={step}
        totalSteps={totalSteps}
      />

      <h1 className="text-3xl font-bold text-green-700 mt-8">

        {title}

      </h1>

      <p className="text-gray-500 mt-2">

        {subtitle}

      </p>

    </div>
  );
}

export default StepHeader;