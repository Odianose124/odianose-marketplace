import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { createSellerAccount } from "../services/sellerService";


function BusinessInformation() {

  const navigate = useNavigate();

  const location = useLocation();

  const { currentUser } = useAuth();


  const businessType =
    location.state?.businessType || "products";


  const [formData, setFormData] = useState({

    businessName: "",
    description: "",
    category: "",
    state: "",
    lga: "",
    address: "",

  });


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  }



  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!currentUser) {

      setError("Please login first.");

      return;

    }


    try {

      setLoading(true);


      await createSellerAccount({

        uid: currentUser.uid,

        email: currentUser.email,

        businessType,

        ...formData,

      });


      alert(
        "🎉 Seller account created successfully!"
      );


      navigate("/seller-dashboard");


    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <>

      <Navbar />


      <main className="min-h-screen bg-gray-100 py-12">


        <div className="max-w-3xl mx-auto px-6">


          <div className="bg-white rounded-3xl shadow-xl p-10">


            <div className="flex items-center gap-4 mb-8">


              <div className="bg-green-100 text-green-700 p-4 rounded-xl">

                <Store size={35}/>

              </div>


              <div>

                <h1 className="text-3xl font-bold">

                  Business Information

                </h1>


                <p className="text-gray-500">

                  Complete your seller profile

                </p>

              </div>


            </div>



            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >



              <input

                name="businessName"

                placeholder="Business Name"

                value={formData.businessName}

                onChange={handleChange}

                required

                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

              />



              <textarea

                name="description"

                placeholder="Describe your business"

                value={formData.description}

                onChange={handleChange}

                required

                rows="4"

                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

              />



              <input

                name="category"

                placeholder="Business Category"

                value={formData.category}

                onChange={handleChange}

                required

                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

              />



              <div className="grid md:grid-cols-2 gap-5">


                <input

                  name="state"

                  placeholder="State"

                  value={formData.state}

                  onChange={handleChange}

                  required

                  className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

                />


                <input

                  name="lga"

                  placeholder="LGA"

                  value={formData.lga}

                  onChange={handleChange}

                  required

                  className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

                />


              </div>



              <textarea

                name="address"

                placeholder="Business Address"

                value={formData.address}

                onChange={handleChange}

                required

                rows="3"

                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"

              />



              {error && (

                <div className="bg-red-100 text-red-700 p-3 rounded-xl">

                  {error}

                </div>

              )}



              <button

                disabled={loading}

                className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 transition disabled:opacity-50"

              >

                {loading
                  ? "Creating Seller Account..."
                  : "Complete Seller Setup"}

              </button>



            </form>


          </div>


        </div>


      </main>


    </>

  );

}


export default BusinessInformation;