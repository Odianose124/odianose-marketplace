import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function SellerOrders() {

  const { currentUser } = useAuth();

  const {

    sellerOrders,

    loadingSellerOrders,

    loadSellerOrders,

  } = useOrders();



  useEffect(() => {

    if (currentUser) {

      loadSellerOrders(currentUser.uid);

    }

  }, [currentUser]);



  return (

    <>

      <Navbar />



      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">

          Seller Orders

        </h1>



        {loadingSellerOrders ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">

              Loading Orders...

            </h2>

          </div>

        ) : sellerOrders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">

              No Orders Yet

            </h2>

            <p className="text-gray-500 mt-3">

              You haven't received any Smart Request orders yet.

            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {sellerOrders.map((order) => (

              <div

                key={order.id}

                className="bg-white rounded-2xl shadow-lg p-8"

              >

                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {order.title}

                    </h2>



                    <p className="text-gray-500 mt-2">

                      Buyer: {order.buyerName}

                    </p>



                    <p className="text-gray-500">

                      Category: {order.category}

                    </p>



                    <p className="text-gray-500">

                      Seller: {order.sellerName}

                    </p>

                  </div>



                  <div className="text-right">

                    <h2 className="text-3xl font-bold text-green-700">

                      ₦{Number(order.amount || 0).toLocaleString()}

                    </h2>



                    <span className="inline-block mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                      {order.orderStatus}

                    </span>

                  </div>

                </div>



                <hr className="my-6" />



                <div className="grid md:grid-cols-3 gap-6">

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



                  <div className="flex justify-end items-end">

                    <Link

                      to={`/seller/orders/${order.id}`}

                      className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"

                    >

                      View Order

                    </Link>

                  </div>

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