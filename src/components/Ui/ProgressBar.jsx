function ProgressBar({ step, totalSteps }) {
  const width = (step / totalSteps) * 100;

  return (
    <div className="w-full">

      <div className="flex justify-between mb-2 text-sm text-gray-500">

        <span>
  Step {step}
</span>

<span>
  {step} of {totalSteps}
</span>

      </div>

      <div className="bg-gray-200 rounded-full h-3">

        <div
          className="bg-green-700 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${width}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;