import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";
import { db } from "../firebase/firebase";
import { uploadImage } from "../services/cloudinary";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setName(data.name || "");
          setPrice(data.price || "");
          setCategory(data.category || "");
          setDescription(data.description || "");
          setImage(data.image || "");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      let imageUrl = image;

      // Upload a new image only if one was selected
      if (newImage) {
        imageUrl = await uploadImage(newImage);
      }

      await updateDoc(doc(db, "products", id), {
        name,
        price: Number(price),
        category,
        description,
        image: imageUrl,
      });

      alert("Product updated successfully!");

      navigate("/my-products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <textarea
            rows="6"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <div>
            <p className="font-semibold mb-2">
              Current Image
            </p>

            <img
              src={image}
              alt={name}
              className="w-52 rounded-xl border mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full border rounded-xl p-4"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Product"}
          </button>

        </form>

      </main>
    </>
  );
}

export default EditProduct;