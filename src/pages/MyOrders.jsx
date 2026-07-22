import { useEffect } from "react";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function MyOrders() {

  const { currentUser } = useAuth();

  const {
    buyerOrders,
    loadingBuyerOrders,
    loadBuyerOrders,
  } = useOrders();

  useEffect(() => {

    if (currentUser) {

      loadBuyerOrders(currentUser.uid);

    }

  }, [currentUser]);



  return (

    <>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">

          My Orders

        </h1>



        {loadingBuyerOrders ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">

              Loading Orders...

            </h2>

          </div>

        ) : buyerOrders.length === 0 ? (

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

            {buyerOrders.map((order) => (

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

                      Seller: {order.sellerName}

                    </p>

                  </div>



                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                    {order.orderStatus}

                  </span>

                </div>



                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <p className="text-gray-500 text-sm">

                      Product / Service

                    </p>

                    <h3 className="font-bold">

                      {order.title}

                    </h3>

                  </div>



                  <div>

                    <p className="text-gray-500 text-sm">

                      Category

                    </p>

                    <h3 className="font-bold">

                      {order.category}

                    </h3>

                  </div>



                  <div>

                    <p className="text-gray-500 text-sm">

                      Payment Status

                    </p>

                    <h3 className="font-bold">

                      {order.paymentStatus}

                    </h3>

                  </div>



                  <div>

                    <p className="text-gray-500 text-sm">

                      Delivery Status

                    </p>

                    <h3 className="font-bold">

                      {order.deliveryStatus}

                    </h3>

                  </div>

                </div>



                <div className="flex justify-between mt-8 items-center">

                  <div>

                    <p className="text-gray-500 text-sm">

                      Total Amount

                    </p>

                    <h2 className="text-3xl font-bold text-green-700">

                      ₦{Number(order.amount || 0).toLocaleString()}

                    </h2>

                  </div>



                  <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

                    {order.orderStatus}

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