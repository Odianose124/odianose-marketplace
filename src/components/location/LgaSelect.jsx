import lgas from "../../data/lgas";

function LgaSelect({
  state,
  value,
  onChange,
}) {
  const stateLgas = lgas[state] || [];

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        Local Government Area (LGA)
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!state}
        className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-600 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {state
            ? "Select your LGA"
            : "Select a State first"}
        </option>

        {stateLgas.map((lga) => (
          <option
            key={lga}
            value={lga}
          >
            {lga}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LgaSelect;