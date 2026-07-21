import { useState } from "react";
import { Store, Wrench, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function BecomeSeller() {
  const navigate = useNavigate();

  const [businessType, setBusinessType] = useState("");

  const selectCard =
    "border-2 rounded-3xl p-8 cursor-pointer transition hover:shadow-xl";

  const active =
    "border-green-700 bg-green-50";

  const inactive =
    "border-gray-200 bg-white";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h1 className="text-4xl font-bold text-center text-green-700">
              Become a Seller
            </h1>

            <p className="text-center text-gray-500 mt-4">
              Choose how you want to use ODIANOSE Marketplace.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

              {/* Products */}

              <div
                onClick={() => setBusinessType("products")}
                className={`${selectCard} ${
                  businessType === "products"
                    ? active
                    : inactive
                }`}
              >
                <Store
                  className="text-green-700"
                  size={50}
                />

                <h2 className="text-2xl font-bold mt-6">
                  Sell Products
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Sell electronics, fashion,
                  furniture, groceries,
                  gadgets and more.
                </p>

              </div>

              {/* Services */}

              <div
                onClick={() => setBusinessType("services")}
                className={`${selectCard} ${
                  businessType === "services"
                    ? active
                    : inactive
                }`}
              >
                <Wrench
                  className="text-green-700"
                  size={50}
                />

                <h2 className="text-2xl font-bold mt-6">
                  Offer Services
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Electrician, mechanic,
                  photographer, barber,
                  plumber and hundreds more.
                </p>

              </div>

              {/* Both */}

              <div
                onClick={() => setBusinessType("both")}
                className={`${selectCard} ${
                  businessType === "both"
                    ? active
                    : inactive
                }`}
              >
                <PackageCheck
                  className="text-green-700"
                  size={50}
                />

                <h2 className="text-2xl font-bold mt-6">
                  Both
                </h2>

                <p className="text-gray-500 mt-3 leading-7">
                  Sell products while offering
                  professional services.
                </p>

              </div>

            </div>

            <div className="flex justify-end mt-12">

              <button
                disabled={!businessType}
                onClick={() =>
                  navigate("/seller/business-info", {
                    state: {
                      businessType,
                    },
                  })
                }
                className="bg-green-700 text-white px-10 py-4 rounded-xl hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Continue
              </button>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}

export default BecomeSeller;