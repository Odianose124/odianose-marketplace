import { FaImage } from "react-icons/fa";

function ImageUploader({ onSelect }) {
  function handleChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    onSelect(file);

    e.target.value = "";
  }

  return (
    <label className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
      <FaImage className="text-green-700 text-xl" />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </label>
  );
}

export default ImageUploader;