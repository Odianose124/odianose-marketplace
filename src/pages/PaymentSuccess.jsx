import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import Navbar from "../components/Navbar";

function PaymentSuccess() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">

          <CheckCircle
            className="mx-auto text-green-600"
            size={90}
          />

          <h1 className="text-4xl font-bold mt-6">
            Payment Successful
          </h1>

          <p className="text-gray-600 mt-4">
            Thank you for shopping with ODIANOSE.
            Your order has been received successfully.
          </p>

          <Link to="/marketplace">
            <button className="mt-8 bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800">
              Continue Shopping
            </button>
          </Link>

        </div>
      </main>
    </>
  );
}

export default PaymentSuccess;