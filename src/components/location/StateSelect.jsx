import states from "../../data/states";

function StateSelect({
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        State
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-600 outline-none"
      >
        <option value="">
          Select your State
        </option>

        {states.map((state) => (
          <option
            key={state}
            value={state}
          >
            {state}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StateSelect;