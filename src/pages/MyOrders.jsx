import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Navbar from "../components/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));

        const myOrders = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (order) => order.userId === auth.currentUser?.uid
          );

        setOrders(myOrders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Your purchases will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center mb-6">

                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <p className="text-gray-500">
                      {order.customer.fullName}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    {order.status}
                  </span>

                </div>

                <div className="space-y-4">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b pb-3"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
                        ₦{(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}

                </div>

                <div className="flex justify-between mt-6 text-xl font-bold text-green-700">
                  <span>Total</span>

                  <span>
                    ₦{order.total.toLocaleString()}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </>
  );
}

export default MyOrders;