import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";

import { uploadImage } from "../services/cloudinary";

import {
  sellerCategories,
  measurements,
} from "../data/marketData";

function AddProduct() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [measurement, setMeasurement] = useState("");

  const [quantityAvailable, setQuantityAvailable] =
    useState("");

  const [price, setPrice] = useState("");

  const [oldPrice, setOldPrice] = useState("");

  const [state, setState] = useState("");

  const [lga, setLga] = useState("");

  const [market, setMarket] = useState("");

  const [deliveryAvailable, setDeliveryAvailable] =
    useState(true);

  const [negotiable, setNegotiable] =
    useState(false);

  const [imageFile, setImageFile] =
    useState(null);

  const [previewImage, setPreviewImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const selectedCategory =
    sellerCategories.find(
      (item) => item.name === category
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreviewImage(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please choose a product image.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl =
        await uploadImage(imageFile);

      await addDoc(
        collection(db, "products"),
        {
          productName,

          description,

          category,

          subCategory,

          measurement,

          quantityAvailable: Number(
            quantityAvailable
          ),

          price: Number(price),

          oldPrice: Number(oldPrice),

          image: imageUrl,

          images: [imageUrl],

          sellerId: currentUser.uid,

          sellerName:
            currentUser.displayName,

          sellerEmail:
            currentUser.email,

          sellerPhone: "",

          state,

          lga,

          market,

          location: `${market}, ${lga}, ${state}`,

          verified: false,

          onlineStatus: true,

          featured: false,

          deliveryAvailable,

          negotiable,

          rating: 5,

          reviews: 0,

          createdAt:
            serverTimestamp(),
        }
      );

      alert(
        "✅ Product uploaded successfully!"
      );

      navigate("/my-products");
    } catch (error) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
    return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10 px-5">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Add New Product
          </h1>

          <p className="text-gray-500 mb-8">
            Upload your product to ODIANOSE Marketplace
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Image */}

            <div>

              <label className="font-semibold block mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-xl p-3"
              />

              {previewImage && (

                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 h-52 w-full object-cover rounded-xl"
                />

              )}

            </div>

            {/* Product Name */}

            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            />

            {/* Description */}

            <textarea
              rows="5"
              placeholder="Product Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            />

            {/* Category */}

            <select
              value={category}
              onChange={(e)=>{

                setCategory(e.target.value);

                setSubCategory("");

              }}
              className="w-full border rounded-xl p-4"
              required
            >

              <option value="">
                Select Category
              </option>

              {

                sellerCategories.map((item)=>(

                  <option
                    key={item.name}
                    value={item.name}
                  >

                    {item.name}

                  </option>

                ))

              }

            </select>

            {/* Sub Category */}

            <select
              value={subCategory}
              onChange={(e)=>setSubCategory(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            >

              <option value="">
                Select Product Type
              </option>

              {

                selectedCategory?.subCategories.map((item)=>(

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                ))

              }

            </select>

            {/* Measurement */}

            <select
              value={measurement}
              onChange={(e)=>setMeasurement(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            >

              <option value="">
                Choose Measurement
              </option>

              {

                [

                  ...measurements.localMarket,

                  ...measurements.weight,

                  ...measurements.bulk,

                  ...measurements.quantity

                ].map((item)=>(

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                ))

              }

            </select>

            {/* Quantity */}

            <input
              type="number"
              placeholder="Quantity Available"
              value={quantityAvailable}
              onChange={(e)=>setQuantityAvailable(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            />

            {/* Price */}

            <input
              type="number"
              placeholder="Selling Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="w-full border rounded-xl p-4"
              required
            />

            {/* Old Price */}

            <input
              type="number"
              placeholder="Old Price (Optional)"
              value={oldPrice}
              onChange={(e)=>setOldPrice(e.target.value)}
              className="w-full border rounded-xl p-4"
            />

            {/* Location */}

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e)=>setState(e.target.value)}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="LGA"
                value={lga}
                onChange={(e)=>setLga(e.target.value)}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Market"
                value={market}
                onChange={(e)=>setMarket(e.target.value)}
                className="border rounded-xl p-4"
              />

            </div>

            {/* Delivery */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={deliveryAvailable}
                onChange={(e)=>setDeliveryAvailable(e.target.checked)}
              />

              <span>
                Delivery Available
              </span>

            </div>

            {/* Negotiable */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e)=>setNegotiable(e.target.checked)}
              />

              <span>
                Negotiable Price
              </span>

            </div>

            {/* Button */}

            <button
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-semibold transition"
            >

              {

                loading

                ?

                "Uploading Product..."

                :

                "Upload Product"

              }

            </button>

          </form>

        </div>

      </main>

    </>
  );

}

export default AddProduct;