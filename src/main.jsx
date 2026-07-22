import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { SellerProvider } from "./context/SellerContext";
import { RequestProvider } from "./context/RequestContext";
import { ResponseProvider } from "./context/ResponseContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <SellerProvider>

          <CartProvider>

            <WishlistProvider>

              <RequestProvider>

                <ResponseProvider>

                  <OrderProvider>

                    <App />

                  </OrderProvider>

                </ResponseProvider>

              </RequestProvider>

            </WishlistProvider>

          </CartProvider>

        </SellerProvider>

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);