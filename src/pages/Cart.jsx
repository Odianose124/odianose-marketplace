import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add products from the marketplace.
            </p>

            <Link
              to="/marketplace"
              className="inline-block mt-8 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-green-700 font-bold mt-2">
                      ₦{item.price.toLocaleString()}
                    </p>

                    <p className="text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="font-semibold mt-2">
                      Subtotal: ₦
                      {(item.price * item.quantity).toLocaleString()}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {item.seller}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="font-bold text-xl">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-3xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-2xl font-bold text-green-700">
                <span>Total</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout">
                <button className="mt-8 w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Cart;