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

  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [loadingOrders, setLoadingOrders] =
    useState(false);

  const [loadingOrder, setLoadingOrder] =
    useState(false);



  // =====================================
  // Load Seller Orders
  // =====================================

  async function loadSellerOrders(sellerId) {

    try {

      setLoadingOrders(true);

      const data =
        await getSellerOrders(sellerId);

      setOrders(data);

    } catch (error) {

      console.error(
        "Order Context Error:",
        error
      );

    } finally {

      setLoadingOrders(false);

    }

  }



  // =====================================
  // Load Buyer Orders
  // =====================================

  async function loadBuyerOrders(buyerId) {

    try {

      setLoadingOrders(true);

      const data =
        await getBuyerOrders(buyerId);

      setOrders(data);

    } catch (error) {

      console.error(
        "Order Context Error:",
        error
      );

    } finally {

      setLoadingOrders(false);

    }

  }



  // =====================================
  // Load Single Order
  // =====================================

  async function loadOrder(orderId) {

    try {

      setLoadingOrder(true);

      const order =
        await getOrder(orderId);

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

        orders,

        selectedOrder,

        loadingOrders,

        loadingOrder,

        loadSellerOrders,

        loadBuyerOrders,

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