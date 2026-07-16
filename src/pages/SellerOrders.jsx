import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Navbar from "../components/Navbar";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(collection(db, "orders"));

      const sellerId = auth.currentUser.uid;

      const sellerOrders = [];

      snapshot.forEach((doc) => {
        const order = {
          id: doc.id,
          ...doc.data(),
        };

        const myItems = order.items.filter(
          (item) => item.sellerId === sellerId
        );

        if (myItems.length > 0) {
          sellerOrders.push({
            ...order,
            items: myItems,
          });
        }
      });

      setOrders(sellerOrders);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Seller Orders
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Customers haven't ordered your products yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-8"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-xl font-bold">
                      {order.customer.fullName}
                    </h2>

                    <p className="text-gray-500">
                      {order.customer.email}
                    </p>

                    <p className="text-gray-500">
                      {order.customer.phone}
                    </p>

                    <p className="text-gray-500">
                      {order.customer.address}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    {order.status}
                  </span>

                </div>

                <hr className="my-6" />

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between py-4 border-b"
                  >

                    <div>

                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-green-700">
                      ₦
                      {(item.price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                ))}

                <div className="text-right mt-6">

                  <p className="font-bold text-2xl text-green-700">
                    Total Paid: ₦
                    {order.total.toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>
    </>
  );
}

export default SellerOrders;