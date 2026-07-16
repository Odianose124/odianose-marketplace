import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useCart } from "../context/CartContext";
import { payWithPaystack } from "../services/paystack";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    if (
      !customer.fullName ||
      !customer.email ||
      !customer.phone ||
      !customer.state ||
      !customer.city ||
      !customer.address
    ) {
      alert("Please fill all delivery information.");
      return;
    }

    payWithPaystack({
      email: customer.email,
      amount: grandTotal,

      onSuccess: async (response) => {
        try {
          // Save one order for every product purchased
          for (const item of cartItems) {
            await addDoc(collection(db, "orders"), {
              buyerId: auth.currentUser.uid,

              buyerName: customer.fullName,
              buyerEmail: customer.email,
              buyerPhone: customer.phone,

              state: customer.state,
              city: customer.city,
              address: customer.address,

              productId: item.id,
              productName: item.name,
              productImage: item.image,

              seller: item.seller,
              sellerId: item.sellerId || "",

              price: item.price,
              quantity: item.quantity,
              total: item.price * item.quantity,

              paymentReference: response.reference,
              paymentStatus: "Paid",

              createdAt: serverTimestamp(),
            });
          }

          clearCart();

          alert("Payment Successful!");

          navigate("/payment-success");
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      },

      onClose: () => {
        alert("Payment Cancelled");
      },
    });
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              Delivery Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={customer.fullName}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={customer.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={customer.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={customer.state}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={customer.city}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={customer.address}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p>
                    ₦
                    {(item.price * item.quantity).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>

            <hr className="my-5" />

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between font-bold text-2xl text-green-700">
                <span>Total</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>

            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-8 bg-green-700 text-white py-4 rounded-xl hover:bg-green-800"
            >
              Continue to Payment
            </button>

          </div>

        </div>

      </main>
    </>
  );
}

export default Checkout;