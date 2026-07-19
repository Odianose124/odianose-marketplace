import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";
import { ResponseProvider } from "./context/ResponseContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <RequestProvider>

          <ResponseProvider>

            <WishlistProvider>

              <CartProvider>

                <App />

              </CartProvider>

            </WishlistProvider>

          </ResponseProvider>

        </RequestProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);