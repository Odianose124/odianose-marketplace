import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createRequest } from "../../services/requestService";

function CreateRequest() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  const [formData, setFormData] = useState({
    type: "product",
    title: "",
    category: "",
    budget: "",
    description: "",
    radius: 15,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const requestId = await createRequest({
        buyerId: currentUser.uid,

        buyerName:
          userProfile?.fullName ||
          currentUser.displayName,

        title: formData.title,

        category: formData.category,

        budget: Number(formData.budget),

        description: formData.description,

        type: formData.type,

        radius: Number(formData.radius),

        latitude: userProfile?.latitude || null,

        longitude: userProfile?.longitude || null,
      });

      alert("Request created successfully!");

      navigate(`/request/${requestId}`);

    } catch (error) {
      console.error(error);

      alert("Unable to create request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Create Request
        </h1>

        <p className="text-gray-500 mb-8">
          Tell nearby sellers or service providers exactly what you need.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          >
            <option value="product">Product Request</option>
            <option value="service">Service Request</option>
          </select>

          <input
            name="title"
            placeholder="What do you need?"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="budget"
            type="number"
            placeholder="Budget (₦)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <textarea
            name="description"
            placeholder="Describe exactly what you need..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-xl p-4"
          />

          <select
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={15}>15 km</option>
            <option value={20}>20 km</option>
            <option value={30}>30 km</option>
            <option value={50}>50 km</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800"
          >
            {loading ? "Creating..." : "Submit Request"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateRequest;