import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useOrders } from "../../context/OrderContext";
import { useChat } from "../../context/ChatContext";

import {
  startOrder,
  completeOrder,
} from "../../services/orderService";

function OrderDetails() {

  const { id } = useParams();

  const {
    selectedOrder,
    loadingOrder,
    loadOrder,
  } = useOrders();

  const [loading, setLoading] =
    useState(false);

    const navigate = useNavigate();

const { startChat } = useChat();

  useEffect(() => {

    if (id) {

      loadOrder(id);

    }

  }, [id]);



  async function handleStartOrder() {

    try {

      setLoading(true);

      await startOrder(id);

      await loadOrder(id);

      alert("Order started successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to start order.");

    } finally {

      setLoading(false);

    }

  }



  async function handleCompleteOrder() {

    try {

      setLoading(true);

      await completeOrder(id);

      await loadOrder(id);

      alert("Order completed successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to complete order.");

    } finally {

      setLoading(false);

    }

  }

  async function handleChatBuyer() {

  try {

    const chat = await startChat({

      orderId: selectedOrder.id,

      requestId: selectedOrder.requestId,

      buyerId: selectedOrder.buyerId,

      buyerName: selectedOrder.buyerName,

      sellerId: selectedOrder.sellerId,

      sellerName: selectedOrder.sellerName,

    });

    navigate(`/chat/${chat.id}`);

  } catch (error) {

    console.error("Chat Error:", error);

    alert("Unable to start chat.");

  }

}



  if (loadingOrder || !selectedOrder) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <h2 className="text-2xl font-bold text-green-700">

            Loading Order...

          </h2>

        </div>

      </>

    );

  }
  return (

  <>

    <Navbar />

    <main className="max-w-6xl mx-auto px-6 py-10">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-700">

          Order Details

        </h1>

        <div className="grid md:grid-cols-2 gap-10 mt-10">

          {/* Buyer Information */}

          <div>

            <h2 className="font-bold text-xl mb-5">

              Buyer Information

            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedOrder.buyerName}
            </p>

            <p>
              <strong>Title:</strong>{" "}
              {selectedOrder.title}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {selectedOrder.category}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedOrder.type}
            </p>

          </div>

          {/* Order Information */}

          <div>

            <h2 className="font-bold text-xl mb-5">

              Order Information

            </h2>

            <p>

              <strong>Amount:</strong>{" "}

              ₦
              {Number(
                selectedOrder.amount || 0
              ).toLocaleString()}

            </p>

            <p>

              <strong>Order Status:</strong>{" "}

              {selectedOrder.orderStatus}

            </p>

            <p>

              <strong>Payment:</strong>{" "}

              {selectedOrder.paymentStatus}

            </p>

            <p>

              <strong>Delivery:</strong>{" "}

              {selectedOrder.deliveryStatus}

            </p>

            <p>

              <strong>Created:</strong>{" "}

              {selectedOrder.createdAt?.toDate?.().toLocaleString() ||
                "N/A"}

            </p>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="font-bold text-xl mb-4">

            Description

          </h2>

          <p className="text-gray-600 leading-8">

            {selectedOrder.description ||
              "No description available."}

          </p>

        </div>
                <div className="grid md:grid-cols-3 gap-5 mt-10">

          <button
            onClick={handleStartOrder}
            disabled={
              loading ||
              selectedOrder.orderStatus === "in-progress" ||
              selectedOrder.orderStatus === "completed"
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl transition"
          >

            {loading
              ? "Starting..."
              : "Start Order"}

          </button>



          <button
            onClick={handleCompleteOrder}
            disabled={
              loading ||
              selectedOrder.orderStatus === "completed"
            }
            className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl transition"
          >

            {loading
              ? "Completing..."
              : "Complete Order"}

          </button>



          <button
  onClick={handleChatBuyer}
  className="border border-green-700 text-green-700 py-4 rounded-xl hover:bg-green-50 transition"
>

  Chat Buyer

</button>

        </div>

      </div>

    </main>

  </>

);

}

export default OrderDetails;