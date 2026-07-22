import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getSellerOrders,
  getBuyerOrders,
  getOrder,
} from "../services/orderService";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {

  const [buyerOrders, setBuyerOrders] = useState([]);

  const [sellerOrders, setSellerOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loadingBuyerOrders, setLoadingBuyerOrders] = useState(false);

  const [loadingSellerOrders, setLoadingSellerOrders] = useState(false);

  const [loadingOrder, setLoadingOrder] = useState(false);



  // =====================================
  // Load Seller Orders
  // =====================================

  async function loadSellerOrders(sellerId) {

    try {

      setLoadingSellerOrders(true);

      const data = await getSellerOrders(sellerId);

      setSellerOrders(data);

    } catch (error) {

      console.error("Seller Order Context Error:", error);

    } finally {

      setLoadingSellerOrders(false);

    }

  }



  // =====================================
  // Load Buyer Orders
  // =====================================

  async function loadBuyerOrders(buyerId) {

    try {

      setLoadingBuyerOrders(true);

      const data = await getBuyerOrders(buyerId);

      setBuyerOrders(data);

    } catch (error) {

      console.error("Buyer Order Context Error:", error);

    } finally {

      setLoadingBuyerOrders(false);

    }

  }



  // =====================================
  // Load Single Order
  // =====================================

  async function loadOrder(orderId) {

    try {

      setLoadingOrder(true);

      const order = await getOrder(orderId);

      setSelectedOrder(order);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingOrder(false);

    }

  }



  return (

    <OrderContext.Provider

      value={{

        buyerOrders,

        sellerOrders,

        selectedOrder,

        loadingBuyerOrders,

        loadingSellerOrders,

        loadingOrder,

        loadBuyerOrders,

        loadSellerOrders,

        loadOrder,

      }}

    >

      {children}

    </OrderContext.Provider>

  );

}

export function useOrders() {

  return useContext(OrderContext);

}